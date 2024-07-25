const qa_wrapper = document.querySelector(".qa-wrapper");
const modal_add_qa = document.querySelector(".modal-add-qa .modal-body");

const btn_save_qa = document.querySelector(".save-qa-btn");
const btn_delete_qa = document.querySelector(".delete-qa-btn");
const btn_update_qa = document.querySelector(".update-qa-btn");
const btn_add_qa = document.querySelector(".add-qa-btn");
let otp_qa_vi_modal;
let otp_qa_en_modal;
let name_qa_vi_modal;
let name_qa_en_modal;
let dataQA = [];
let listCateQA = [];
btn_save_qa.addEventListener("click", function () {
  modal_add_qa.innerHTML = `
              <div class="qa-wrapper-modal">
              <nav>
                <div
                  class="nav nav-tabs d-flex align-items-center"
                  id="nav-tab"
                  role="tablist"
                >
                  <button
                    class="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Việt Ngữ
                  </button>
                  <button
                    class="nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Anh Ngữ
                  </button>

                </div>
              </nav>
              <div class="tab-content" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div class="abc mb-3 mt-3">
                    <label for="qa-name-vi"> danh mục: </label>
                  ${
                    listCateQA.length > 0
                      ? `<select class="form-select" id="opt-cat-vi-modal">
                      ${listCateQA
                        .map((item, index) => {
                          return `<option
                        ${index == 0 ? "selected" : ""}
                          value="${item.id}">${item.name_vi}</option>`;
                        })
                        .join("")}
                    </select>`
                      : ""
                  }

                  </div>
                  <div class="abc mb-3">
                    <label for="qa-name-vi"> Câu hỏi: </label>
                    <input
                      type="text"
                      name="qa-name-vi-modal"
                      id="qa-name-vi-modal"
                      class="form-control"
                    />
                  </div>
                  <div class="abc">
                    <label for="qa-content-vi"> Câu trả lời: </label>
                    <textarea
                      name="qa-content-vi-modal"
                      id="qa-content-vi-modal"
                    ></textarea>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <div class="abc mb-3 mt-3">
                    <label for="qa-name-en"> Danh mục: </label>
                  
            ${`<select class="form-select" id="opt-cat-en-modal">

    
                      ${
                        //call api get all list :/admin/dashboard/page/q&a
                        listCateQA
                          .map((item, index) => {
                            return `<option
                             ${index == 0 ? "selected" : ""}
                            value="${item.id}">${item.name_en}</option>`;
                          })
                          .join("")
                      }
                    </select>`}

                        
                  </div>
                  <div class="abc mb-3">
                    <label for="qa-question-en"> Câu hỏi: </label>
                    <input
                      type="text"
                      name="qa-question-en"
                      id="qa-name-en-modal"
                      class="form-control"
                    />
                  </div>
                  <div class="abc">
                    <label for="qa-content-en"> Câu trả lời: </label>
                    <textarea
                      name="qa-content-en-modal"
                      id="qa-content-en-modal"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

    `;
  otp_qa_vi_modal = document.getElementById("opt-cat-vi-modal");
  otp_qa_en_modal = document.getElementById("opt-cat-en-modal");
  name_qa_vi_modal = document.getElementById("qa-name-vi-modal");
  name_qa_en_modal = document.getElementById("qa-name-en-modal");

  otp_qa_vi_modal.addEventListener("change", function () {
    const idCat = this.value;
    console.log("idCat", idCat);
    otp_qa_en_modal.value = idCat;
  });

  otp_qa_en_modal.addEventListener("change", function () {
    const idCat = this.value;
    otp_qa_vi_modal.value = idCat;
  });
  setTimeout(() => {
    CKEDITOR.replace("qa-content-en-modal");
    CKEDITOR.replace("qa-content-vi-modal");
  }, 100);
});

const name_qa_vi = document.getElementById("qa-name-vi");
const name_qa_en = document.getElementById("qa-name-en");

const qa_item = document.querySelectorAll(".qa-item");

const opt_qa_vi = document.getElementById("select-qa-vi");
const opt_qa_en = document.getElementById("select-qa-en");

btn_add_qa.addEventListener("click", async function () {
  try {
    console.log("name_qa_vi_modal", name_qa_vi_modal);
    const cateId = otp_qa_vi_modal.value ? otp_qa_vi_modal.value : 1;
    const name_vi = name_qa_vi_modal.value;
    const name_en = name_qa_en_modal.value;

    const content_vi = CKEDITOR.instances["qa-content-vi-modal"].getData();
    const content_en = CKEDITOR.instances["qa-content-en-modal"].getData();
    const result = await axios.post("/admin/api/qa", {
      cateId,
      name_vi,
      name_en,
      content_vi,
      content_en,
    });
    if (result.data) {
      toastr.success("Thêm thành công");
      RenderContent();
    }
  } catch (error) {
    console.error(error);
    toastr.error("Thêm thất bại");
  }
});

btn_update_qa.addEventListener("click", async function () {
  try {
    const idQA = opt_qa_vi.value ? opt_qa_en.value : 1;
    const content_vi = CKEDITOR.instances["qa-content-vi"].getData();
    const content_en = CKEDITOR.instances["qa-content-en"].getData();
    const result = await axios.put(`/admin/api/qa/${idQA}`, {
      content_vi,
      content_en,
    });
    if (result.data) {
      toastr.success("Cập nhật thành công");
      RenderContent();
    }
  } catch (error) {
    console.error(error);
    toastr.error("Cập nhật thất bại");
  }
});

btn_delete_qa.addEventListener("click", async function () {
  try {
    const isConfirmed = await poupConfirm(
      `bạn chắc chắc muốn xóa  câu hỏi này?","Dữ liệu của bạn sẽ được cập nhật!`
    );
    if (isConfirmed) {
      const idQA = opt_qa_vi.value;
      const result = await axios.delete(`/admin/api/qa/${idQA}`);
      if (result.data) {
        toastr.success("Xóa thành công");
        RenderContent();
      }
    }
  } catch (error) {
    console.error(error);
    toastr.error("Xóa thất bại");
  }
});

opt_qa_vi.addEventListener("change", function () {
  const idQA = opt_qa_vi.value;
  const qa = dataQA.find((item) => item.id == idQA);
  opt_qa_en.value = qa.id;
  CKEDITOR.instances["qa-content-vi"].setData(qa.content_vi);
  CKEDITOR.instances["qa-content-en"].setData(qa.content_en);
});

opt_qa_en.addEventListener("change", function () {
  const idQA = opt_qa_en.value;
  const qa = dataQA.find((item) => item.id == idQA);
  opt_qa_vi.value = qa.id;
  CKEDITOR.instances["qa-content-vi"].setData(qa.content_vi);
  CKEDITOR.instances["qa-content-en"].setData(qa.content_en);
});
qa_item.forEach((item) => {
  //remove all class select

  item.addEventListener("click", function () {
    qa_item.forEach((item) => {
      item.classList.remove("selected");
    });

    item.classList.add("selected");

    const cat = item.getAttribute("id");
    RenderContent(cat.slice(3), 0);
  });
});
const RenderContent = async (cat = 1, index = 0) => {
  const data = await axios.get(`/admin/api/qa/catqa/${cat}`);
  opt_qa_vi.innerHTML = "";
  opt_qa_en.innerHTML = "";
  console.log("cat", cat);
  const result = data.data;
  dataQA = result;

  result.forEach((item) => {
    opt_qa_vi.innerHTML += `<option value="${item.id}">${item.name_vi}</option>`;
    opt_qa_en.innerHTML += `<option value="${item.id}">${item.name_en}</option>`;
  });

  const cat_vi = document
    .getElementById(`vi_${result[index].cateId}`)
    .querySelector(".qa-name");
  const cat_en = document
    .getElementById(`en_${result[index].cateId}`)
    .querySelector(".qa-name");
  name_qa_vi.value = cat_vi.innerText;
  name_qa_en.value = cat_en.innerText;

  CKEDITOR.instances["qa-content-vi"].setData(result[index].content_vi);
  CKEDITOR.instances["qa-content-en"].setData(result[index].content_en);
};

document.addEventListener("DOMContentLoaded", async () => {
  await RenderContent();
  const dataListQA = await axios.get("/admin/api/dashboard/qaCatList");
  listCateQA = dataListQA.data;
});
