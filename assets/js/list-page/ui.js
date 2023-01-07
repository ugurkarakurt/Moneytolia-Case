export class UI {
  constructor() {
    this.timeoutID = undefined;
  }

  clearErrorsUI(modal) {
    const inputs = modal.querySelectorAll("input");
    const errors = modal.querySelectorAll(".error");

    inputs.forEach((input) => {
      input.classList.remove("input-error");
    });

    errors.forEach((error) => {
      error.classList.remove("active");
    });
  }

  toggleAsideUI(aside) {
    if (aside.classList.contains("active")) {
      aside.classList.remove("active");
    } else {
      aside.classList.add("active");
    }
  }

  setContentUI(asideLink, asideLinks, content, contentData) {
    asideLinks.forEach((link) => {
      link.classList.remove("active");
    });
    content.forEach((element) => {
      element.classList.remove("active");
    });

    asideLink.classList.add("active");

    const contentElement = document.querySelector(`.${contentData}`);
    contentElement.classList.add("active");
  }

  setCampaignsUI(datas, campaignList, campaignListMobile) {
    campaignList.innerHTML = "";
    campaignListMobile.innerHTML = "";
    datas.forEach((data, i) => {
      campaignList.innerHTML += `
                              <div class="table-row"
                                data-id="${data.id}" 
                                data-name="${data.name}" 
                                data-description="${data.description}"
                                data-date="${data.date}" 
                                data-point="${data.point}">
                                <div class="table-column">${i + 1}</div>
                                <div class="table-column">${data.name}</div>
                                <div class="table-column">${
                                  data.description
                                }</div>
                                <div class="table-column">${data.date}</div>
                                <div class="table-column">
                                 <div class="quantity-buttons">
                                   <button class="js-decrease">
                                      <img src="../../assets/img/minus.svg" alt="minus">
                                    </button>
                                      <span class="js-quantity">${
                                        data.point
                                      }</span>
                                    <button class="js-increase">
                                      <img src="../../assets/img/plus.svg" alt="plus">
                                    </button>
                                  </div>
                              </div>
                                <div class="table-column">
                                  <div class="action-buttons">
                                    <button class="js-edit">
                                      <img src="../../assets/img/edit.png" alt="minus">
                                    </button>
                                    <button class="js-delete">
                                      <img src="../../assets/img/delete.png" alt="plus">
                                    </button>
                                  </div>
                                </div>
                              </div>
                            `;
      campaignListMobile.innerHTML += `
                                      <div class="table-row"
                                        data-id="${data.id}" 
                                        data-name="${data.name}" 
                                        data-description="${data.description}"
                                        data-date="${data.date}" 
                                        data-point="${data.point}">
                                        <ul>
                                          <li><span class="key"># :</span> <span class="value"> ${i + 1}</span></li>
                                          <li><span class="key">Name :</span> <span class="value"></span> ${data.name}</li>
                                          <li><span class="key">Description :</span> <span class="value"></span> ${data.description}</li>
                                          <li><span class="key">Date :</span> <span class="value"></span> ${data.date}</li>
                                          <li><span class="key">Point :</span>
                                          <div class="quantity-buttons">
                                            <button class="js-decrease">
                                              <img src="../../assets/img/minus.svg" alt="minus">
                                            </button>
                                              <span class="js-quantity">${
                                                data.point
                                              }</span>
                                            <button class="js-increase">
                                              <img src="../../assets/img/plus.svg" alt="plus">
                                            </button>
                                           </div>
                                          </li>
                                          <li> 
                                            <div class="action-buttons">
                                              <button class="js-edit">
                                                <img src="../../assets/img/edit.png" alt="minus">
                                              </button>
                                              <button class="js-delete">
                                                <img src="../../assets/img/delete.png" alt="plus">
                                              </button>
                                            </div>
                                          </li>
                                        </ul>
                                      </div`;
    });
  }

  clearInputs(inputs) {
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  errorMessage(element, message) {
    const error = element.closest(".input-group").querySelector(".error");
    error.classList.add("active");
    element.classList.add("input-error");
    error.innerHTML = message;
  }

  alertMessageTemplate(element, className, message) {
    element.classList.remove("warning");
    element.classList.remove("success");
    element.classList.remove("info");

    element.classList.add("active");
    element.classList.add(className);
    element.innerHTML = message;

    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {
      element.classList.remove("active");
    }, 2000);

  }

  clearErrorFromInputUI(element) {
    const error = element.closest(".input-group").querySelector(".error");
    error.classList.remove("active");
    element.classList.remove("input-error");
  }
}
