// 1. 初始化 Swiper
var swiper = new Swiper(".mySwiper", {
    loop: true, speed: 1000, autoplay: { delay: 5000 },
    pagination: { el: ".swiper-pagination", clickable: true },
    effect: "fade"
});

// 2. 翻译数据库
const i18nData = {
    zh: {
        logo: "LITTLE BEE",
        menu_home: "首页",
        menu_services: "服务项目",
        menu_fleet: "车型展示",
        menu_about: "关于我们",
        hero_title1: "大阪关西机场 · 尊享接送",
        hero_sub1: "丰田 Granace 航空座椅旗舰体验",
        scene_title: "尊贵出行场景",
        scene_1_t: "商务接待",
        scene_1_d: "专业举牌接机，中文司导，助力商业成功。",
        scene_2_t: "家庭旅游",
        scene_2_d: "宽阔空间适合全家老小，定制化深度关西游。",
        scene_3_t: "高尔夫专线",
        scene_3_d: "超大行李空间，准时直达关西各大球场。",
        why_us_title: "安全与合规",
        why_us_1_t: "日本绿牌营业车",
        why_us_1_d: "全车投保最高额度商业险，合法经营，拒用黑车。",
        why_us_2_t: "资深华人司导",
        why_us_2_d: "5年以上驾龄，精通日语及关西地理文化。",
        why_us_3_t: "价格透明承诺",
        why_us_3_d: "一口价包含燃油及保险，绝无现场加价。",
        area_title: "服务版图",
        area_desc: "深耕关西，覆盖大阪、京都、奈良、神户、和歌山全境",
        process_title: "预订流程",
        step_1: "1. 在线咨询",
        step_2: "2. 确认报价",
        step_3: "3. 支付预约",
        step_4: "4. 开启旅程",
        footer_about: "关于 LITTLE BEE",
        footer_desc: "立足大阪，专注关西。提供最高标准、合法合规的华人包车与接送服务。",
        footer_contact: "联系方式",
        footer_company: "会社概要",
        fleet_page_title: "旗舰车队",
        fleet_page_sub: "全线日本绿牌营业车，尊享顶奢出行体验",
        granace_desc: "丰田顶级商务MPV，拥有超越埃尔法的车内空间，配备4座超宽航空按摩座椅，是长途商旅的首选。",
        alphard_desc: "全日本最畅销的高端商旅车，以其出色的静谧性和舒适的底盘调校闻名，适合家庭出游及城市穿梭。",
        btn_book_now: "立即预约"
    },
    jp: {
        logo: "LITTLE BEE",
        menu_home: "ホーム",
        menu_services: "サービス内容",
        menu_fleet: "車両紹介",
        menu_about: "会社概要",
        hero_title1: "関西空港 · 高級送迎",
        hero_sub1: "トヨタ Granace 至高の移動体験",
        scene_title: "ご利用シーン",
        scene_1_t: "ビジネス送迎",
        scene_1_d: "空港でのお迎えからビジネスアテンドまで対応。",
        scene_2_t: "家族旅行",
        scene_2_d: "広々とした空間で、快適な関西の旅を。",
        scene_3_t: "ゴルフ送迎",
        scene_3_d: "大型荷物も対応。名門ゴルフ場への送迎。",
        why_us_title: "安全へのこだわり",
        why_us_1_t: "正規緑ナンバー車",
        why_us_1_d: "営業用自動車保険加入、法令遵守の正規運行。",
        why_us_2_t: "熟練ドライバー",
        why_us_2_d: "日本語・中国語対応可能。関西を知り尽くした案内。",
        why_us_3_t: "明朗会計",
        why_us_3_d: "燃料代・保険代込み。追加料金なしの安心設定。",
        area_title: "サービスエリア",
        area_desc: "大阪、京都、奈良、神戸、和歌山全域に対応",
        process_title: "ご予約の流れ",
        step_1: "1. お問合せ",
        step_2: "2. お見積り",
        step_3: "3. 予約確定",
        step_4: "4. お迎え",
        footer_about: "LITTLE BEEについて",
        footer_desc: "大阪に拠点を置き、関西全域で最高水準の送迎サービスを提供。",
        footer_contact: "連絡先",
        footer_company: "会社概要",
        fleet_page_title: "車両ラインナップ",
        fleet_page_sub: "全車緑ナンバー。プレミアムな移動体験を。",
        granace_desc: "トヨタの最高級送迎車。アルファードを超える広大な室内空間と4つの独立したマッサージシートを完備。",
        alphard_desc: "日本で最も愛される高級ミニバン。その静粛性と乗り心地の良さは、ビジネスや家族旅行に最適です。",
        btn_book_now: "今すぐ予約"
    }
};

function changeLang(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nData[lang][key]) el.innerText = i18nData[lang][key];
    });
}