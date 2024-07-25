//=================GIAO DIỆN ADMIN=====================

//CRUD Policy
function selectPolicy(policyId) {
  document
    .querySelectorAll(".policy-item")
    .forEach((item) => item.classList.remove("selected"));
  const policyItem = document.getElementById(policyId);
  policyItem.classList.add("selected");
  fetch(`/api/policy/${policyId}`)
    .then((response) => response.json())
    .then((policyItem) => {
      document.getElementById("policy-name-vi").value = policyItem.name_vi;
      document.getElementById("policy-name-en").value = policyItem.name_en;
      CKEDITOR.instances["policy-content-vi"].setData(policyItem.content_vi);
      CKEDITOR.instances["policy-content-en"].setData(policyItem.content_en);
    });
}
function addPolicy() {
  const name_vi = document.getElementById('modal-policy-name-vi').value
  const name_en = document.getElementById('modal-policy-name-en').value
  const content_vi = CKEDITOR.instances['modal-policy-content-vi'].getData()
  const content_en = CKEDITOR.instances['modal-policy-content-en'].getData()
  if (!name_vi || !name_en || !content_vi || !content_en) {
    return toastr.error('Vui lòng nhập đầy đủ thông tin');
  }
  axios.post('/api/addPolicy', {
    name_en,
    name_vi,
    content_vi,
    content_en
  })
    .then(response => {
      if (response.data) {
        toastr.success('Thêm mới thành công');
        setTimeout(() => {
          window.location.reload();
        }, 700);
      }
    })
    .catch(err => {
      console.log(err)
      toastr.error('Thêm mới thất bại, vui lòng thử lại');
    })
}
async function deletePolicy() {
  const isConfirmed = await poupConfirm(
    `Bạn chắc chắc muốn xóa ?`
  );
  if (isConfirmed) {
    const policyId = document.querySelector('.selected').getAttribute('id').trim()
    console.log('aaa', policyId)
    axios.delete(`/api/deletePolicy/${policyId}`)
      .then(response => {
        if (response.data) {
          toastr.success('Xóa thành công');
          setTimeout(() => {
            window.location.reload();
          }, 700);
        }
      })
      .catch(err => {
        console.log(err)
        toastr.error('Xóa thất bại, vui lòng thử lại');
      })
  }
}
function updatePolicy() {
  const policyId = document.querySelector('.selected').getAttribute('id')
  const name_vi = document.getElementById('policy-name-vi').value
  const name_en = document.getElementById('policy-name-en').value
  const content_vi = CKEDITOR.instances['policy-content-vi'].getData();
  const content_en = CKEDITOR.instances['policy-content-en'].getData();

  axios.put(`/api/update/${policyId}`, {
    name_en,
    name_vi,
    content_vi,
    content_en
  }).then(response => {
    if (response.data) {
      toastr.success('Cập nhật thành công');
      setTimeout(() => {
        window.location.reload();
      }, 700);
    }
  }
  ).catch(err => {
    toastr.error('Cập nhật thất bại, vui lòng thử lại');
  })
}

//API hiển thị select q&a admin
function selectQA(QAId) {
  document
    .querySelectorAll(".qa-item")
    .forEach((item) => item.classList.remove("selected"));
  const QAItem = document.getElementById(QAId);
  QAItem.classList.add("selected");
  fetch(`/api/q&a/${QAId}`)
    .then((response) => response.json())
    .then((QAItem) => {
      document.getElementById("qa-name-vi").value = QAItem.name_vi;
      document.getElementById("qa-name-en").value = QAItem.name_en;
      document.getElementById("qa-question-vi").value = QAItem.title_vi;
      document.getElementById("qa-question-en").value = QAItem.title_en;
      CKEDITOR.instances["qa-content-vi"].setData(QAItem.content_vi);
      CKEDITOR.instances["qa-content-en"].setData(QAItem.content_en);
    });
}

//API hiển thị select cooperate admin
function selectCoop(coopId) {
  document.querySelectorAll('.coop-item').forEach(item => item.classList.remove('selected'));
  const coopItem = document.getElementById(coopId);
  coopItem.classList.add('selected');
  fetch(`/api/coop/${coopId}`)
    .then(response => response.json())
    .then(coopItem => {
      document.getElementById('coop-name-vi').value = coopItem.name_vi
      document.getElementById('coop-name-en').value = coopItem.name_en
      CKEDITOR.instances['coop-content-vi'].setData(coopItem.content_vi)
      CKEDITOR.instances['coop-content-en'].setData(coopItem.content_en)
    })
}
function addCoop() {
  const name_vi = document.getElementById('modal-coop-name-vi').value
  const name_en = document.getElementById('modal-coop-name-en').value
  const content_vi = CKEDITOR.instances['modal-coop-content-vi'].getData()
  const content_en = CKEDITOR.instances['modal-coop-content-en'].getData()
  if (!name_vi || !name_en || !content_vi || !content_en) {
    return toastr.error('Vui lòng nhập đầy đủ thông tin');
  }
  axios.post('/api/addCoop', {
    name_en,
    name_vi,
    content_vi,
    content_en
  })
    .then(response => {
      if (response.data) {
        toastr.success('Thêm mới thành công');
        setTimeout(() => {
          window.location.reload();
        }, 700)
      }
    })
    .catch(err => {
      console.log(err)
      toastr.error('Thêm mới thất bại, vui lòng thử lại');
    })
}
async function deleteCoop() {
  const isConfirmed = await poupConfirm(
    `Bạn chắc chắn muốn xóa ?`
  );
  if (isConfirmed) {
    const coopId = document.querySelector('.selected').getAttribute('id').trim()
    axios.delete(`/api/deleteCoop/${coopId}`)
      .then(response => {
        if (response.data) {
          toastr.success('Xóa thành công');
          setTimeout(() => {
            window.location.reload();
          }, 700);
        }
      })
      .catch(err => {
        console.log(err)
        toastr.error('Xóa thất bại, vui lòng thử lại');
      })
  }
}
function updateCoop() {
  const coopId = document.querySelector('.selected').getAttribute('id')
  const name_vi = document.getElementById('coop-name-vi').value
  const name_en = document.getElementById('coop-name-en').value
  const content_vi = CKEDITOR.instances['coop-content-vi'].getData();
  const content_en = CKEDITOR.instances['coop-content-en'].getData();
  axios.put(`/api/updateCoop/${coopId}`, {
    name_en,
    name_vi,
    content_vi,
    content_en
  }).then(response => {
    if (response.data) {
      toastr.success('Cập nhật thành công');
      setTimeout(() => {
        window.location.reload();
      }, 700);
    }
  }).catch(err => {
    toastr.error('Cập nhật thất bại, vui lòng thử lại');
  })
}



//=================GIAO DIỆN LANDING=====================

//Render giao diện Policy
function SelectPolicy(policyId) {
  document
    .querySelectorAll(".policy-item")
    .forEach((item) => item.classList.remove("selected"));
  const policyItem = document.getElementById(policyId);
  policyItem.classList.add("selected");
  fetch(`/api/policy/${policyId}`)
    .then((response) => response.json())
    .then((policyItem) => {
      const lang = document.getElementById("policy-lang").innerText.trim();
      const contentPolicy = document.querySelector(".content-policy-details");
      contentPolicy.innerHTML = policyItem[`content_${lang}`];
    });
}

//Render giao diện Q&A
function SelectQA(qaId) {
  // Clear previously selected item
  document.querySelector(".content-qa").innerHTML = "";
  document
    .querySelectorAll(".qa-item-tab")
    .forEach((item) => item.classList.remove("selected"));
  document.getElementById(`tab_${qaId}`).classList.add("selected");

  fetch(`/api/q&a/${qaId}`)
    .then((response) => response.json())
    .then((qaItem) => {
      const lang = document.getElementById("qa-lang").innerText.trim();
      qaItem.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "qa-item";
        const title = item[`name_${lang}`];
        const desc = item[`content_${lang}`];
        div.innerHTML = `
        <div class="qa-name">
          <span>   ${title}</span>
             <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="qa-desc">${desc}</div>
        `;

        document.querySelector(".content-qa").appendChild(div);
      });
      $(document).ready(function () {
        const q_a_detail = $(".qa-item");

        q_a_detail.click(function () {
          const arrow = $(this).find("i");
          arrow.toggleClass("fa-chevron-down");
          arrow.toggleClass("fa-chevron-up");

          $(this).find(".qa-desc").slideToggle(150);
        });
      });
    });
}

const optTap_policy = document.getElementById("optTap_policy");
optTap_policy?.addEventListener("change", function (e) {
  const policyId = e.target.value;
  this.value = policyId;
  SelectPolicy(Number(policyId));
});

const optTap_qa = document.getElementById("optTap_qa");
optTap_qa?.addEventListener("change", function (e) {
  const qaId = e.target.value;


  SelectQA(Number(qaId));
});


let id = document.getElementById('policy-id')
if (id) {
  SelectPolicy(Number(id.innerText))
  optTap_policy.value = id.innerText.trim();
}

let idqa = document.getElementById('qa-id')
if (idqa) {
  SelectQA(Number(idqa.innerText))

  optTap_qa.value = idqa.innerText.trim();
}


