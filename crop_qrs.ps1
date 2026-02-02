
Add-Type -AssemblyName System.Drawing

$sourcePath = "d:\Users\little-bee\images\contact_qr.png"
$destDir = "d:\Users\little-bee\images"

if (-not (Test-Path $sourcePath)) {
    Write-Error "Source file not found: $sourcePath"
    exit 1
}

$bmp = [System.Drawing.Bitmap]::FromFile($sourcePath)
$width = $bmp.Width
$height = $bmp.Height

Write-Host "Image size: $width x $height"

# 1. Horizontal Scan to find the 3 clusters (X-ranges)
$hasContentColumn = New-Object bool[] $width
for ($x = 0; $x -lt $width; $x++) {
    $hasContent = $false
    for ($y = 0; $y -lt $height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        # Threshold 0.5 for "White" content
        if ($pixel.GetBrightness() -gt 0.5) {
            $hasContent = $true
            break
        }
    }
    $hasContentColumn[$x] = $hasContent
}

# 2. Identify unconnected ranges of content
$ranges = @()
$inRange = $false
$startX = 0

for ($x = 0; $x -lt $width; $x++) {
    if ($hasContentColumn[$x]) {
        if (-not $inRange) {
            $inRange = $true
            $startX = $x
        }
    } else {
        if ($inRange) {
            $inRange = $false
            # Minimum width check to ignore noise (e.g. < 10px)
            if (($x - $startX) -gt 10) {
                $ranges += @{ Start = $startX; End = $x - 1 }
            }
        }
    }
}
# Capture last range if ending at edge
if ($inRange) {
    if (($width - $startX) -gt 10) {
        $ranges += @{ Start = $startX; End = $width - 1 }
    }
}

Write-Host "Found $($ranges.Count) QR code clusters."

$names = @("wechat.png", "whatsapp.png", "line.png")

if ($ranges.Count -lt 3) {
    Write-Warning "Only found $($ranges.Count) clusters. Detection might be loose. Proceeding with what we have."
}

# 3. Crop each range
for ($i = 0; $i -lt [Math]::Min($ranges.Count, 3); $i++) {
    $range = $ranges[$i]
    $rStart = $range.Start
    $rEnd = $range.End
    $rWidth = $rEnd - $rStart + 1
    
    Write-Host "Processing Cluster $i ($($names[$i])): X Range $rStart to $rEnd (Width: $rWidth)"

    # Now find Y bounds for this specific vertical strip
    $minY = $height
    $maxY = 0
    
    for ($x = $rStart; $x -le $rEnd; $x++) {
        for ($y = 0; $y -lt $height; $y++) {
            $pixel = $bmp.GetPixel($x, $y)
            if ($pixel.GetBrightness() -gt 0.5) {
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    $rectX = $rStart
    $rectY = $minY
    $rectW = $rWidth
    $rectH = ($maxY - $minY) + 1

    Write-Host "  Cropping Rect: X=$rectX, Y=$rectY, W=$rectW, H=$rectH"
    
    if ($rectW -gt 0 -and $rectH -gt 0) {
        $rect = New-Object System.Drawing.Rectangle $rectX, $rectY, $rectW, $rectH
        $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
        $outFile = Join-Path $destDir $names[$i]
        $cropped.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
        $cropped.Dispose()
        Write-Host "  Saved $($names[$i])"
    }
}

$bmp.Dispose()
Write-Host "Done."
