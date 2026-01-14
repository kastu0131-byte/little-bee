// 1. 初始化 Swiper 轮播图
var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    effect: "fade",
    fadeEffect: { crossFade: true },
});


// 2. 翻译字典 (这就是你的 lang.json)
const translations = {
    // 中文内容
    zh: {
        logo: "LITTLE BEE",
        nav_home: "首页",
        nav_cars: "车型展示",
        hero_title_1: "关西机场 · 旗舰接送",
        hero_sub_1: "丰田 Granace 航空座椅 · 尊享出行体验",
        hero_title_2: "极致奢华内饰",
        hero_sub_2: "让您的旅程彻底放松",
        section_title: "旗舰车型",
        car_desc: "专为高端商务及家庭出行打造。配备 4 个独立航空按摩座椅，提供极致的隐私与舒适感。",
        feature_1: "关西机场 (KIX) 接机",
        feature_2: "全中文 司导服务",
        feature_3: "6-9座 灵活空间",
        btn_book: "立即预约"
    },
    // 日文内容
    jp: {
        logo: "LITTLE BEE",
        nav_home: "ホーム",
        nav_cars: "車種紹介",
        hero_title_1: "関西空港 · 高級送迎",
        hero_sub_1: "トヨタ Granace · 至高の移動体験",
        hero_title_2: "究極のラグジュアリー",
        hero_sub_2: "旅の疲れを癒やすファーストクラス空間",
        section_title: "フラッグシップモデル",
        car_desc: "ビジネスVIPや家族旅行に最適。4つの独立したマッサージ機能付き航空シートで、究極のプライバシーと快適さを提供します。",
        feature_1: "関西空港 (KIX) 送迎",
        feature_2: "中国語対応ドライバー",
        feature_3: "6-9名様 ゆったり空間",
        btn_book: "今すぐ予約"
    }
};

// 3. 切换语言函数
function changeLang(lang) {
    // 找到所有带有 data-i18n 属性的标签
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        // 如果字典里有这个 key，就替换文字
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // (可选) 可以在这里把用户的选择存到浏览器缓存
    // localStorage.setItem('userLang', lang);
}

// 4. (可选) 页面加载时检查是否需要默认日文
// const savedLang = localStorage.getItem('userLang') || 'zh';
// changeLang(savedLang);