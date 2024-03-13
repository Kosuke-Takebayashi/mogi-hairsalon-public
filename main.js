/**************************************
 * スライダー（FirstView）
 *************************************/
const swiper = new Swiper(".swiper", {
    loop: true, // 繰り返しをする
    autoplay: {
        delay: 4000, // 4秒ごとに切り替わる
    },
    speed: 1500,
    centeredSlides: true, //アクティブなスライドを中央に表示
    slidesPerView: 1,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: 1.37, //スライダーコンテナにスライドを3枚同時表示
            spaceBetween: 36, //スライド間の距離を36pxに
        },
    },
});

/**************************************
 * SP版グローバルナビゲーションの開閉
 *************************************/
const navButton = document.getElementById("js-nav-button");
const navList = document.getElementById("js-nav-list");
const globalNavItems = document.getElementsByClassName("js-nav-item");
const globalNavLinks = document.querySelectorAll(".js-nav-link");
const globalNavArrow = document.getElementById("js-nav-arrow");
let globalNavItemsHeight = 0;
let isOpenNav = false;

/**
 * ナビゲーションの高さを設定する関数
 **/
function setNavHeight() {
    globalNavItemsHeight = 0; // 高さを初期化
    for (let i = 0; i < globalNavItems.length; i++) {
        const height = globalNavItems[i].offsetHeight;
        globalNavItemsHeight = globalNavItemsHeight + height; // 合計の高さ
    }
}
/**
 * ナビゲーションを閉じる関数
 */
function closeNavMenu() {
    globalNavArrow.style.transform = "rotate(360deg)";
    navList.style.height = "0px";
    isOpenNav = false;
}

/**
 * ナビゲーションを開く関数
 */
function openNavMenu() {
    globalNavArrow.style.transform = "rotate(180deg)";
    navList.style.height = globalNavItemsHeight + "px";
    isOpenNav = true;
}

// リンクをクリックしたときにナビゲーションを閉じる
globalNavLinks.forEach(function (elem) {
    elem.addEventListener("click", function (event) {
        if (isOpenNav) {
            setTimeout(function () {
                closeNavMenu();
            }, 1000);
        }
    });
});

navButton.addEventListener("click", function () {
    if (!isOpenNav) {
        openNavMenu();
    } else {
        closeNavMenu();
    }
});

window.addEventListener("load", function () {
    if (window.matchMedia("(max-width: 768px)").matches) {
        setNavHeight();
    }
});

window.addEventListener("resize", function () {
    // PC版のときは高さを元に戻す
    if (window.matchMedia("(min-width: 768px)").matches) {
        if (isOpenNav) {
            globalNavArrow.style.transform = "rotate(360deg)";
        }
        navList.style.height = null;
        isOpenNav = false;
    } else {
        setNavHeight();
    }
});

/**************************************
 * モーダルウィンドウの開閉
 *************************************/
const modalButton = document.querySelectorAll(".js-modal-open");
const modalWindow = document.querySelector(".js-modal-window");
const modalCloseButton = document.querySelector(".js-modal-close");
const modalImg = document.querySelector(".js-modal-window > img");

// 画像クリックでモーダルウィンドウを表示
modalButton.forEach(function (elem) {
    elem.addEventListener("click", function () {
        const originalImgSrc = elem.querySelector("img").getAttribute("src");
        modalWindow.classList.add("open");
        modalImg.setAttribute("src", originalImgSrc);
    });
});

// 閉じるボタンクリックでモーダルウィンドウを非表示
modalCloseButton.addEventListener("click", function () {
    modalWindow.classList.remove("open");
});

// モーダルウィンドウ自身をクリックで非表示
modalWindow.addEventListener("click", function () {
    this.classList.remove("open");
});
