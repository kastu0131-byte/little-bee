// 1. 启动轮播图
var swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 1000, // 切换速度变慢，更优雅
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    effect: "fade", // 淡入淡出效果
    fadeEffect: { crossFade: true },
});

// 2. 翻译数据库
const i18nData = {
    zh: {
        logo: "LITTLE BEE",
        menu_home: "首页",
        menu_fleet: "车型展示",
        hero_title1: "大阪关西机场 · 尊享接送",
        hero_sub1: "丰田 Granace 航空座椅旗舰体验",
        hero_title2: "极致奢华 · 商务首选",
        hero_sub2: "24小时中文管家式服务",
        fleet_title: "旗舰车队",
        car_desc: "拥有MPV界最宽敞的空间与最舒适的独立航空座椅，为您提供头等舱般的静谧与尊贵。",
        spec_1: "接机:",
        spec_2: "配置:",
        spec_3: "服务:",
        btn_book: "微信预约"
    },
    jp: {
        logo: "LITTLE BEE",
        menu_home: "ホーム",
        menu_fleet: "車両紹介",
        hero_title1: "関西空港 · 高級送迎",
        hero_sub1: "トヨタ Granace 至高の移動体験",
        hero_title2: "究極のラグジュアリー",
        hero_sub2: "24時間対応 中国語ドライバー",
        fleet_title: "車両ラインナップ",
        car_desc: "ミニバン界最大級の広さと独立したマッサージシートで、ファーストクラスのような静寂と快適さを提供します。",
        spec_1: "送迎:",
        spec_2: "座席:",
        spec_3: "担当:",
        btn_book: "LINE/WeChat予約"
    }
};

// 3. 切换语言功能
function changeLang(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nData[lang][key]) {
            el.innerText = i18nData[lang][key];
        }
    });
}