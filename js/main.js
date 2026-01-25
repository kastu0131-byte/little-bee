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