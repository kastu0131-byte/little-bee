// 1. 谷歌翻译引擎初始化
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'zh-CN',
        includedLanguages: 'en,ja,zh-CN',
        autoDisplay: false // 禁止自动显示原始横条
    }, 'google_translate_element');
}

// 2. 你的自定义按钮调用函数
function triggerGoogleTranslate(langCode) {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
    }
}

// 3. 原有的 Swiper 初始化 (首页需要)
if (document.querySelector(".mySwiper")) {
    var swiper = new Swiper(".mySwiper", {
        loop: true, speed: 1000, autoplay: { delay: 5000 },
        pagination: { el: ".swiper-pagination", clickable: true },
        effect: "fade"
    });
}

// 4. 强制隐藏谷歌翻译弹窗
const observer = new MutationObserver(() => {
    const popup = document.querySelector('.goog-te-balloon-frame');
    if (popup) {
        popup.style.display = 'none';
        // 可以选择断开观察者，如果弹窗只出现一次
        // observer.disconnect();
    }
});

// 监视body的子节点变化
observer.observe(document.body, { childList: true });

// 5. Booking Form Handler (Client-side Email)
document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get values
            const name = document.getElementById('bookingName').value;
            const contact = document.getElementById('bookingContact').value;
            const date = document.getElementById('bookingDate').value;
            const car = document.getElementById('bookingCar').value;
            const message = document.getElementById('bookingMessage').value;

            // Construct Email Body
            const subject = encodeURIComponent(`[Little Bee] New Booking Enquiry - ${name}`);
            const body = encodeURIComponent(
                `New Booking Enquiry

Client Name: ${name}
Contact Info: ${contact}

Requested Date: ${date}
Vehicle Model: ${car}

Additional Requirements:
${message}

---------------------------
Sent from Little Bee Website`
            );

            // Open Mail Client
            // alert('正在为您调用邮件客户端... (Opening Email Client)'); 
            // Note: In some preview environments, mailto links may be blocked.
            window.location.href = `mailto:siaokittyyu@hotmail.com?subject=${subject}&body=${body}`;

            // --- Fallback UI ---
            // Update modal content to show "Success/Manual Copy" state
            // This ensures that if the mail app DOESN'T open, the user isn't left wondering.
            const modalBody = document.querySelector('#bookingModal .modal-body');
            const originalBodyText = decodeURIComponent(body); // Decode for display

            if (modalBody) {
                modalBody.innerHTML = `
                    <div class="text-center">
                        <div class="mb-4 text-success">
                            <i class="bi bi-check-circle-fill" style="font-size: 3rem;"></i>
                        </div>
                        <h4 class="fw-bold mb-3">Booking Ready!</h4>
                        <p class="text-muted small mb-4">
                            We have attempted to open your email app.<br>
                            If it did not open, please <strong>copy the text below</strong> and email it to:<br>
                            <a href="mailto:siaokittyyu@hotmail.com" class="fw-bold text-dark">siaokittyyu@hotmail.com</a>
                        </p>
                        
                        <div class="position-relative mb-4">
                            <textarea class="form-control bg-light" rows="10" readonly id="bookingContent">${originalBodyText}</textarea>
                        </div>

                        <button onclick="navigator.clipboard.writeText(document.getElementById('bookingContent').value); this.innerText='Copied!';" class="btn btn-warning w-100 fw-bold rounded-pill">
                            <i class="bi bi-clipboard me-2"></i> Copy to Clipboard
                        </button>
                    </div>
                `;
            }

            // Optional: Close modal after small delay
            // const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
            // setTimeout(() => modal.hide(), 1000);
        });
    }
});