// 1. 谷歌翻译初始化
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'zh-CN',
        includedLanguages: 'en,ja,zh-CN',
        autoDisplay: false
    }, 'google_translate_element');
}

// 2. 自定义按钮“遥控”谷歌翻译的逻辑
function triggerGoogleTranslate(langCode) {
    const googleCombo = document.querySelector('.goog-te-combo');
    if (googleCombo) {
        googleCombo.value = langCode;
        googleCombo.dispatchEvent(new Event('change')); // 模拟用户点击了原生的选择框
    } else {
        console.error("翻译引擎尚未加载完毕");
    }
}

// 3. 原有的 Swiper 初始化 (保持不变)
if (document.querySelector(".mySwiper")) {
    var swiper = new Swiper(".mySwiper", {
        loop: true, speed: 1000, autoplay: { delay: 5000 },
        pagination: { el: ".swiper-pagination", clickable: true },
        effect: "fade"
    });
}