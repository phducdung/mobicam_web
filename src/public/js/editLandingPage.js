$(async function () {
  const baseURL = "/api/landingPage";

  toastr.options = {
    closeButton: false, // Cho phép hoặc không cho phép hiển thị nút đóng
    debug: false, // Bật chế độ gỡ lỗi
    newestOnTop: false, // Thông báo mới nhất sẽ được đặt ở dưới
    progressBar: false, // Hiển thị thanh tiến trình hay không

    preventDuplicates: false, // Ngăn chặn thông báo trùng lặp
    onclick: null,
    showDuration: "300", // Thời gian hiển thị thông báo khi xuất hiện
    hideDuration: "1500", // Thời gian thông báo sẽ mất đi
    timeOut: "5000", // Thời gian tồn tại của thông báo
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  const getContentHtml = (selector) => {
    const component = $(selector);
    return component.html();
  };
  const toggleEditComponents = (isEdit) => {
    $("span, h1, h2, h3, h4, h5, h6, p, a,article").attr(
      "contenteditable",
      isEdit
    );

    $("section.category *:not(h2)").attr("contenteditable", "false");

    $("section.news  *:not(h2)").attr("contenteditable", "false");
    $("#save_edit >*").attr("contenteditable", false);
    $(".change-lang >*").attr("contenteditable", false);
  };

  const validateSizeImage = (size, height, type = "") => {
    if (size > 500 || height > 1000) {
      toastr.error(
        "Dung lượng ảnh không được vượt quá 500KB và chiều dài không quá 1000px",
        "Lỗi"
      );
      return false;
    }
    switch (type) {
      case "certificert":
        if (height < 320) {
          toastr.error(
            "Giấy chứng nhận phải có chiều dài lớn hơn  >= 320px",
            "Lỗi"
          );
          return false;
        }

      default:
        return true;
    }
  };

  const validateSizePdf = (size) => {
    if (size > 5000) {
      toastr.error("Dung lượng file không được vượt quá 5mb", "Lỗi");
      return false;
    }
    return true;
  };

  const validateVideoReason = (size) => {
    if (size > 10000) {
      toastr.error("Dung lượng video không được vượt quá 10mb", "Lỗi");
      return false;
    }
    return true;
  };

  const btn_upload_reason_video = $("#btn_upload_reason_video");
  const img_wp = $(".img_wp");
  const btn_save = $("#btn_save_edit");
  const btn_upload_file_hero = $("#btn_upload_file_hero");
  const btn_edit_product = $(".btn_edit_product");
  const btn_edit_news = $(".btn_edit_news");
  const btn_restore = $("#btn_restore");
  const inputChangeUrlLocation = $("#url_input_change_location");
  const inputChangeUrlFacebook = $("#url_input_change_facbook");
  const inputChangeUrlPhone = $("#url_input_change_phone");
  const inputChangeUrlZalo = $("#url_input_change_zalo");

  const handleChangeLink = function (type = "", curent = "") {
    const url = $(this).val();
    const parrent = $(this).parent();
    const a_link = parrent.find("a");
    if (type == "phone") {
      a_link.attr("href", `tel:${url}`);
      return;
    }

    a_link.attr("href", url);
  };

  inputChangeUrlZalo.on("input", handleChangeLink);
  inputChangeUrlFacebook.on("input", handleChangeLink);
  inputChangeUrlPhone.on("input", function () {
    const url = $(this).val();
    const parrent = $(this).parent();
    const a_link = parrent.find("a");

    a_link.attr("href", `tel:${url}`);
    return;
  });

  inputChangeUrlLocation.on("input", async function () {
    const url = $(this).val();
    const parent = $(this).parent();
    parent.attr("href", url);
  });
  img_wp.append(`<div class="change_image_area">
 
      <i class="fa-solid fa-camera fs-3"></i>
       <label class="fs-4">Tải ảnh lên</label>
 
  </div>`);

  const changeImageArea = $(".change_image_area");

  changeImageArea.click(function () {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    const parent = $(this).parent();
    const tag_preview = parent.find("a");

    const type = parent.attr("type");
    const imgChild = parent.find("img");
    input.onchange = async function () {
      const file = input.files[0];
      const fileSize = file.size;
      const fileSizeKB = fileSize / 1024;

      // Tạo một đối tượng URL tạm thời và đọc kích thước hình
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = async function () {
        const height = img.naturalHeight;

        if (!validateSizeImage(fileSizeKB, height, type)) {
          return;
        }
        const formData = new FormData();
        formData.append("file", file);
        try {
          const response = await axios.post(`${baseURL}/uploadFile`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          const { data } = response;
          const img_url = `/files/${data.fileName}`;
          imgChild.attr("src", img_url);
          tag_preview.attr("href", img_url);
          toastr.success("Cập nhật ảnh!", "Thành Công");
        } catch (error) {
          console.log("error", error);
          toastr.error("Cập nhật ảnh!", error);
        }

        // Loại bỏ URL tạm thời để tránh rò rỉ bộ nhớ
        URL.revokeObjectURL(img.src);
      };
    };
    input.click();
  });

  // Xử lý sự kiện click vào upload file hero
  btn_upload_file_hero.click(function () {
    const parent = $(this).parent();
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";
    const role = document.getElementById("user_role").innerText;
    input.onchange = async function () {
      const file = input.files[0];
      const fileSize = file.size;
      const fileSizeKB = fileSize / 1024;
      let checkValidate = false;
      if (role != "SUPERADMIN") {
        checkValidate = validateSizePdf(fileSizeKB);
        if (!checkValidate) {
          return;
        }
      }

      // Tạo FormData và thêm file PDF vào
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(`${baseURL}/uploadFile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const { data } = response;
        parent.attr("href", `/files/${data.fileName}`);
        toastr.success("Cập nhật file download!", "Thành Công");
      } catch (error) {
        console.log("error", error);
        toastr.error("Cập nhật file download thất bại!", error);
      }
    };
    input.click();
  });
  // Xử lý sự kiện click vào upload video section
  btn_upload_reason_video.click(function () {
    const parent = $(this).parent();
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";

    input.onchange = async function () {
      const file = input.files[0];
      const fileSize = file.size;
      const fileSizeKB = fileSize / 1024;
      if (!validateVideoReason(fileSizeKB)) {
        return;
      }

      // Tạo FormData và thêm file PDF vào
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(`${baseURL}/uploadFile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const { data } = response;
        modalVideo.setAttribute("data-video", `/files/${data.fileName}`);
        toastr.success("Cập nhật file download!", "Thành  công");
      } catch (error) {
        console.log("error", error);
        toastr.error("Cập nhật file download thất bại!", error);
      }
    };
    input.click();
  });

  toggleEditComponents(true);

  //xử lí sự kiện quản lí  sản phẩm
  btn_edit_product.click(function () {
    const productid = $(this).attr("data-productid");
    const url = `/admin/dashboard/page/product?id=${productid}`;

    // Tạo một phần tử <a> tạm thời
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";

    a.click();
  });

  btn_edit_news.click(function () {
    const newsid = $(this).attr("data-newsid");
    const url = `/admin/dashboard/page/news?id=${newsid}`;

    // Tạo một phần tử <a> tạm thời
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";

    a.click();
  });

  btn_restore.click(async function () {
    const isConfirmed = await poupConfirm(
      "Bạn có muốn khôi phục lại giao diện ban đầu không ?",
      "Giao diện sẽ trở lại như cũ!"
    );
    if (isConfirmed) {
      try {
        const result = await axios.post(`${baseURL}/restore`);
        toastr.success("Khôi phục giao diện!", "Thành Công");

        window.location.reload(true);
      } catch (error) {
        console.log("error", error);
        toastr.error("Sao lưu dữ liệu!", error);
      }
    }
  });

  // Xử lý sự kiện click vào nút lưu
  btn_save.on("click", async function () {
    const isConfirmed = await poupConfirm(
      "Bạn có muốn lưu thay đổi không?",
      "Dữ liệu của bạn sẽ được cập nhật!"
    );

    if (isConfirmed) {
      const lang = $(this).attr("data-lang");

      toggleEditComponents(false);

      const headerHtml = getContentHtml("header");
      const footerHtml = getContentHtml("footer");
      const heroHtml = getContentHtml("section.hero-section");
      const methodHtml = getContentHtml("section.method_section");
      const fetureHtml = getContentHtml("section.the-best-feture-section");
      const achieveHtml = getContentHtml("section.achieve-section");
      const experienceHtml = getContentHtml("section.section-experience");
      const benefitHtml = getContentHtml("section.benifit-section");
      const categoriesHtml = $("section.category h2");
      const newsHtml = $("section.news h2");
      const certificertHeading = $("section.section-certificert h2");
      const footerIcon = $("footer .footer_follow-list");
      const certificertHtml = [];

      $(".owl-item:not(.cloned)").each(function () {
        certificertHtml.push($(this).html());
      });

      try {
        await axios.post(`${baseURL}/lang/${lang}?section=header`, headerHtml, {
          headers: {
            "Content-Type": "text/plain",
          },
        });

        await axios.post(`${baseURL}/lang/${lang}?section=hero`, heroHtml, {
          headers: {
            "Content-Type": "text/plain",
          },
        });

        await axios.post(`${baseURL}/lang/${lang}?section=method`, methodHtml, {
          headers: {
            "Content-Type": "text/plain",
          },
        });

        await axios.post(`${baseURL}/lang/${lang}?section=feture`, fetureHtml, {
          headers: {
            "Content-Type": "text/plain",
          },
        });

        await axios.post(`${baseURL}/lang/${lang}?section=footer`, footerHtml, {
          headers: {
            "Content-Type": "text/plain",
          },
        });
        await axios.post(
          `${baseURL}/lang/${lang}?section=achieve`,
          achieveHtml,
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        await axios.post(
          `${baseURL}/lang/${lang}?section=experience`,
          experienceHtml,
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        await axios.post(
          `${baseURL}/lang/${lang}?section=benifit`,
          benefitHtml,
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        await axios.post(
          `${baseURL}/lang/${lang}?section=categories`,
          categoriesHtml.eq(0).prop("outerHTML"),
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        await axios.post(
          `${baseURL}/lang/${lang}?section=certificert`,
          certificertHtml.join("\n"),
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        await axios.post(
          `${baseURL}/lang/${lang}?section=certificert_heading`,
          certificertHeading.eq(0).prop("outerHTML"),
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        await axios.post(
          `${baseURL}/lang/${lang}?section=news`,
          newsHtml.eq(0).prop("outerHTML"),
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        await axios.post(
          `${baseURL}/lang/${lang}?section=footerIcon`,
          getContentHtml(footerIcon),
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        toastr.success("Cập nhật UI!", "Thành Công");
        toggleEditComponents(true);
      } catch (error) {
        console.log("error", error);
        toastr.error("Cập nhật UI!", error);
      }
    }
  });
});
