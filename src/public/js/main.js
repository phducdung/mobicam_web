try {
  const chatApp = new ChatApp__({
    payload: {
      ui: {
        right: "10px",
        bottom: "10px",
      },
    },
  });
  chatApp.create();
} catch (error) {
  console.log(error);
}

//

const button = $("button");
button.attr("aria-label", "button");
//carousel certificert
try {
  $(".owl-carousel").owlCarousel({
    margin: 0,
    responsiveClass: true,
    dots: true,
    slideTransition: "linear",
    autoplay: false,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    // autoplay: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      767: {
        items: 3,
        nav: true,
      },
    },
  });
} catch (error) {
    console.log(error);
}

// handle open menu reponsive
$(".btn_bar").click(function () {
  console.log("click");
  $(".btn_bar").toggleClass("fa-xmark");
  $(".btn_bar").toggleClass("fa-bars");
  $(".menu-responsive").slideToggle(200);
});
//handle stop video when close modal
$("#modalVideo").on("hidden.bs.modal", function () {
  var video = document.getElementById("video_reasion");
  if (video) {
    video.pause(); // Tạm dừng video
    video.currentTime = 0; // Đặt lại thời gian phát video về 0
  }
});

//check with screen and handle when click cat tab
const checkIsMobileAndTabletWidth = () => {
  const screenWidth = window.innerWidth;
  if ((screenWidth < 900 && screenWidth > 739) || screenWidth < 768) {
    return true;
  }
  return false;
};
//handle click navigation menu
const handleClickMenu = (event) => {
  const menus = document.querySelectorAll(
    ".wrapper header .header_navigation ul a"
  );
  const curentMenu = event.currentTarget;
  menus.forEach((menu) => {
    menu.classList.remove("active");
  });
  curentMenu.classList.add("active");

  const href = event.currentTarget.getAttribute("href");
  const id = href.split("#")[1];
  const targetElement = document.getElementById(id);

  if (targetElement) {
    event.preventDefault();
    const section = document.getElementById(id);

    if (section) {
      // Cuộn tới phần tử đích một cách mượt mà
      window.scrollTo({
        top: section.offsetTop, // Nếu bạn muốn thêm offset, bạn có thể chỉnh sửa giá trị này
        behavior: "smooth",
      });
    }
  }
};

//handle scroll when click to menu
document
  .querySelectorAll(".wrapper header .header_navigation ul a")
  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId_vi = this.getAttribute("href").substring(2);
      const targetId_en = this.getAttribute("href").substring(5);
      const targetElement_vi = document.getElementById(targetId_vi);
      const targetElement_en = document.getElementById(targetId_en);

      if (targetElement_vi || targetElement_en) {
        e.preventDefault();
        const offset = 0;

        const elementPosition = targetElement_vi
          ? targetElement_vi.offsetTop
          : targetElement_en.offsetTop;

        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

//check with screen and handle when click cat tab
if (checkIsMobileAndTabletWidth()) {
  const tabCats = document.getElementsByClassName("nav-item");
  const content_tab_product = document.getElementById("content_tab_product");

  if (content_tab_product) {
    content_tab_product.style.display = "none";
  }
  for (let i = 0; i < tabCats.length; i++) {
    tabCats[i].setAttribute("data-bs-toggle", "modal");
    tabCats[i].setAttribute("data-bs-target", "#modalProductTab");
  }
}

const handleClickCategoriesTabResponsive = async (event, catid, lang) => {
  if (checkIsMobileAndTabletWidth()) {
    const res = await axios.get(`/category/${catid}/${lang}`);
    const products = res.data.products;
    const content_modal_product = document.querySelector(".carousel-inner");

    let htmlContent = "";
    for (let i = 0; i < products.length; i++) {
      let active = i === 0 ? "active" : "";
      let images = products[i]?.images;

      htmlContent += `
        <div class="carousel-item ${active}">
          <div class="product-item">
            <div class="owl-carousel owl-theme nested-carousel">`; // Start of nested OwlCarousel

      for (let j = 0; j < images.length; j++) {
        htmlContent += `
          <div class="owl-carousel-img">
            <img
              style="width: 250px; margin: 0 auto;"
              src="${images[j]}"
              alt=""
              class="product-thumb"
            />
          </div>`;
      }

      htmlContent += `
            </div> <!-- End of nested OwlCarousel -->
            <h3 class="product-name text-primary text-center mt-5">${products[i].productname}</h3>
            <div class="product-desc mt-5 pt-2">
              ${products[i].productdesc}
            </div>
          </div>
        </div>`;
    }

    content_modal_product.innerHTML = htmlContent;
    $(".nested-carousel").owlCarousel({
      autoplay: false,
      margin: 10,
      nav: true,
      dots: false,
      navText: [
        "<i class='fa fa-chevron-left'></i>",
        "<i class='fa fa-chevron-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
  }
};

let defaultTabCat = document.getElementById("defaultOpenCat");
if (defaultTabCat) {
  if (!checkIsMobileAndTabletWidth()) {
    defaultTabCat.click();
  }
}

let defaultTabProduct = document.getElementsByClassName("defaultOpenProduct");
if (defaultTabProduct.length > 0) {
  for (let i = 0; i < defaultTabProduct.length; i++) {
    defaultTabProduct[i].click();
  }

  // const articleProduct = document.getElementsByClassName("article_product");
  // for (let i = 0; i < articleProduct.length; i++) {
  //   let contentMardown = articleProduct[i].innerText;
  //   const parser = new DOMParser();
  //   let articleHtml = parser.parseFromString(contentMardown, "text/html");
  //   articleProduct[i].innerHTML = articleHtml.body.innerHTML;
  // }
}

function hanndleOpenTabProduct(evt, productid, catid) {
  let i, tablinks;

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName(`cat_${catid}`);
  tabProduct = document.getElementsByClassName(`name-product_${catid}`);

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.display = "none";
  }
  for (i = 0; i < tabProduct.length; i++) {
    tabProduct[i].className = tabProduct[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  let contentActive = document.getElementById(productid);

  contentActive.style.display = "block";
  evt.currentTarget.className += " active";
}

function hanndleOpenTabCat(evt, catid, lang) {
  // Declare all variables
  let i, tabcontent, tablinks;
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("nav-item");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  let contentActive = document.getElementById(`cat_${catid}`);

  contentActive.style.display = "block";
  evt.currentTarget.className += " active";
  handleClickCategoriesTabResponsive(evt, catid, lang);
}

// handle counter up
const year_develop = document.querySelector(".year_develop .sub__number");
const customer = document.querySelector(".customer .sub__number");
const user = document.querySelector(".user .sub__number");
const viehical = document.querySelector(".viehical .sub__number");

// handle Open modal video
const modalVideo = document.getElementById("openPopup_video");
if (modalVideo) {
  modalVideo.onclick = function () {
    const sourceVideo = modalVideo.getAttribute("data-video");
    const videoReason = document.querySelector("#content_modal_video source");
    const videoElement = document.querySelector("#content_modal_video video");
    videoReason.setAttribute("src", sourceVideo);
    videoElement.load();
  };
}

function counterUp(el, to) {
  let speed = 200;
  let from = 0;
  let step = to / speed;
  const counter = setInterval(function () {
    from += step;
    if (from > to) {
      clearInterval(counter);
      el.innerText = to;
    } else {
      el.innerText = Math.ceil(from);
    }
  }, 1);
}

if (year_develop) {
  counterUp(year_develop, year_develop.innerText);
  counterUp(customer, customer.innerText);
  counterUp(user, user.innerText);
  counterUp(viehical, viehical.innerText);
}

//                                             RenderItem benifit
const right_content = document.querySelector(".right-content");
const benifitItem = document.querySelectorAll(".benifit-item");
benifitItem.forEach((item) => {
  item.addEventListener("mouseover", function () {
    let imgThumbHover = item.querySelector("img").getAttribute("src");
    let main_img_content_benifit = document.querySelector(
      ".main_img_content_benifit"
    );
    main_img_content_benifit.setAttribute("src", imgThumbHover);
  });
});
// benifitItems.forEach((item) => {
//   const benifitItem = document.createElement("div");

//   benifitItem.classList.add("benifit-item", "mb-3");
//   benifitItem.innerHTML = `
//   <img src="${item.thumb}" alt="mobicam-lợi ích của khách hàng" class="d-none">
//   <div class="benifit-icon">
//     <i class="fas ${item.icon}"></i>
//   </div>
//   <div class="information">
//     <h6 class="fw-bold">${item.title}</h6>
//     <p>
//       ${item.content}
//     </p>
//   </div>
//   `;
//   benifitItem?.addEventListener("mouseover", function () {
//     let imgThumbHover = benifitItem.querySelector("img").getAttribute("src");
//     let main_img_content_benifit = document.querySelector(
//       ".main_img_content_benifit"
//     );
//     main_img_content_benifit.setAttribute("src", imgThumbHover);
//   });
//   right_content?.appendChild(benifitItem);
// });

//                                              RenderItem  fetures
const feature_content = document.querySelector(".list-best-feture .row");
// bestFeaturesItems.forEach((feature) => {
//   const featureItem = document.createElement("div");
//   featureItem.classList.add(
//     "col-lg-3",
//     "col-md-6",
//     "col-sm-12",
//     "mb-3",
//     "d-flex",
//     "justify-content-center"
//   );
//   featureItem.innerHTML = `
//   <div class="item">
//     <div class="feture-item-img">
//       ${feature.svg}
//     </div>
//     <div class="information">
//       <p class="item_title fw-bold fs-6">${feature.title}</p>
//       <p class="item_desc">
//         ${feature.desc}
//       </p>
//     </div>
//   </div>
//   `;
//   feature_content?.appendChild(featureItem);
// });

//                                              Render certificert Items

//
const certificert_content = document.querySelector(".list-certificate");
// certificertItems.forEach((certificert) => {
// const certificertItem = document.createElement("div");
// certificertItem.classList.add("policy_content-img", "img_wp");
// certificertItem.setAttribute("type", "certificert");
// certificertItem.innerHTML = `
// <a
// class="d-block w-100 h-100"
// href="${certificert.thumb}"
// data-fancybox="gallery"
// >
// <img
// class="thumb-certificert h-100"
// src="${certificert.thumb}"
// alt=""

// />
// `;

// certificert_content?.appendChild(certificertItem);
// });
