//jquery
$(document).ready(function () {
  const menus = $(".menu-item");
  const currentPath = window.location.pathname.substring(1);

  // Lấy "page"
  const parts = currentPath.split("/"); // Tách chuỗi thành mảng
  const mainPageName = parts[parts.length - 2];

  // Lấy "product"
  const subPageName = parts[parts.length - 1];

  menus.each(function () {
    const menu_children = $(this).children(".sub-menu");
    const chevon = $(this).children(".icon_chevon");
    const typeMenu = $(this).attr("type");

    if (typeMenu === mainPageName) {
      menu_children.slideToggle();

      const sub_menu_item = menu_children.find(".sub-menu-item");

      sub_menu_item.each(function () {
        const type_sub_menu = $(this).attr("type");

        if (type_sub_menu === subPageName) {
          $(this).addClass("active");

          chevon.toggleClass("fa-chevron-left");
          chevon.toggleClass("fa-chevron-down");
        }
      });
    }
    if (subPageName !== "dashboard" && typeMenu == mainPageName) {
      $(this).toggleClass("active");
    }
    $(this).click(() => {

      menu_children.click(function (event) {
        event.stopPropagation();
      });

      menu_children.slideToggle();
      $(this).toggleClass("active");

      chevon.toggleClass("fa-chevron-left");
      chevon.toggleClass("fa-chevron-down");s
    });
  });

  const btn_close_sidebar = $(".dashboard .btn_close_sidebar");
  const btn_bar = $(".dashboard .btn_bar");
  const side_bar_left = $(".dashboard .side-bar-left");
  btn_close_sidebar.click(function () {
    side_bar_left.toggleClass("active");
  });

  btn_bar.click(function () {
    side_bar_left.toggleClass("active");
  });
});
