import { Request } from "../utils/request.js";
import { UI } from "./ui.js";

const ui = new UI();
const request = new Request();

// Setup module
// ------------------------------

const List = (function () {
  //
  // Variables
  //
  let editedRow;
  const asideMenu = document.querySelector(".js-aside");
  const toggleAside = document.querySelector(".js-toggle-aside");
  const asideLinks = document.querySelectorAll(".js-aside-link");
  const content = document.querySelectorAll(".js-content-data");
  const createCampaignForm = document.querySelector(".js-create-campaign-form");
  const campaignName = document.querySelector(".js-campaign-name");
  const campaignDescription = document.querySelector(
    ".js-campaign-description"
  );
  const campaignList = document.querySelector("#campaignList");
  const campaignListMobile = document.querySelector("#campaignListMobile");
  const alertMessage = document.querySelector(".js-alert-message");
  const editModal = document.querySelector(".js-modal-edit");
  const editModalContent = document.querySelector(".js-modal-edit-content");
  const editCampaignForm = document.querySelector(".js-edit-form");
  const editCampaignName = document.querySelector(".js-modal-campaign-name");
  const editCampaignDescription = document.querySelector(
    ".js-modal-campaign-description"
  );
  let _changeInterval = null;

  //
  // Event Listeners
  //

  const _eventListeners = function () {
    toggleAside.addEventListener("click", _toggleAside);
    asideLinks.forEach((link) => {
      link.addEventListener("click", _setContent);
    });
    createCampaignForm.addEventListener("submit", _createCampaign);
    campaignName.addEventListener("input", _clearErrorFromInput);
    campaignDescription.addEventListener("input", _clearErrorFromInput);
    editCampaignName.addEventListener("input", _clearErrorFromInput);
    editCampaignDescription.addEventListener("input", _clearErrorFromInput);

    document.addEventListener("click", function (e) {
      if (e.target.closest(".js-increase"))
        _increase(e.target.closest(".js-increase"));
      if (e.target.closest(".js-decrease"))
        _decrease(e.target.closest(".js-decrease"));
      if (e.target.closest(".js-delete"))
        _deleteRow(e.target.closest(".js-delete"));
      if (e.target.closest(".js-edit")) _editRow(e.target.closest(".js-edit"));

      if (
        !e.composedPath().includes(editModalContent) &&
        !e.composedPath().includes(e.target.closest(".js-edit"))
      ) {
        _closeModal();
      }

      if (
        !e.composedPath().includes(asideMenu) &&
        !e.composedPath().includes(e.target.closest(".js-toggle-aside"))
      ) {
        _closeAside();
      }
    });
    editCampaignForm.addEventListener("submit", _editCampaign);
  };

  //
  // Setup module components
  //

  const _closeAside = function () {
    asideMenu.classList.remove("active");
  };

  const _editCampaign = function (e) {
    e.preventDefault();
    const name = editCampaignName.value;
    const description = editCampaignDescription.value;

    if (!name) {
      ui.errorMessage(editCampaignName, "You cannot leave this field blank.");
    }

    if (!description) {
      ui.errorMessage(
        editCampaignDescription,
        "You cannot leave this field blank."
      );
    }

    if (editCampaignName.value && editCampaignDescription.value) {
      request
        .put(`http://localhost:3000/campaignList/${editedRow.dataset.id}`, {
          name: editCampaignName.value,
          description: editCampaignDescription.value,
          point: editedRow.dataset.point,
          date: editedRow.dataset.date,
        })
        .then(() => {
          ui.alertMessageTemplate(alertMessage, "info", `Campaign updated`);
          _closeModal();
          _setCampaigns();
        });
    }
  };

  const _closeModal = function () {
    const inputs = editCampaignForm.querySelectorAll("input");
    editModal.classList.remove("active");
    ui.clearInputs(inputs);
    ui.clearErrorsUI(editModal);
  };

  const _editRow = function (self) {
    editedRow = self.closest(".table-row");
    editModal.classList.add("active");
  };

  const _deleteRow = function (self) {
    const row = self.closest(".table-row");
    request
      .delete(`http://localhost:3000/campaignList/${row.dataset.id}`)
      .then(() => {
        _setCampaigns();
        ui.alertMessageTemplate(alertMessage, "warning", "Campaign deleted");
      });
  };

  const _increase = function (self) {
    const point = self
      .closest(".quantity-buttons")
      .querySelector(".js-quantity");
    const row = self.closest(".table-row");
    let quantity = point.innerHTML;
    let sumQuantity = Number(quantity) + 1;

    request
      .put(`http://localhost:3000/campaignList/${row.dataset.id}`, {
        name: row.dataset.name,
        description: row.dataset.description,
        point: sumQuantity,
        date: row.dataset.date,
      })
      .then(() => {
        _setCampaigns();
        ui.alertMessageTemplate(
          alertMessage,
          "success",
          `Point increased to ${sumQuantity}`
        );
      });
  };

  const _decrease = function (self) {
    const point = self
      .closest(".quantity-buttons")
      .querySelector(".js-quantity");
    const row = self.closest(".table-row");
    let quantity = point.innerHTML;
    let sumQuantity = Number(quantity) - 1;

    request
      .put(`http://localhost:3000/campaignList/${row.dataset.id}`, {
        name: row.dataset.name,
        description: row.dataset.description,
        point: sumQuantity,
        date: row.dataset.date,
      })
      .then(() => {
        _setCampaigns();
        ui.alertMessageTemplate(
          alertMessage,
          "success",
          `Point decreased to ${sumQuantity}`
        );
      });
  };

  const _setCampaigns = function () {
    request.get("http://localhost:3000/campaignList").then((datas) => {
      if (!datas.length) {
        ui.alertMessageTemplate(alertMessage, "warning", "Add a campaign");
      } else {
        ui.setCampaignsUI(datas, campaignList, campaignListMobile);
      }
    });
  };

  const _clearErrorFromInput = function () {
    ui.clearErrorFromInputUI(this);
  };

  const _toggleAside = function () {
    const aside = this.closest(".js-aside");
    ui.toggleAsideUI(aside);
  };

  const _setContent = function () {
    const contentData = this.dataset.content;
    ui.setContentUI(this, asideLinks, content, contentData);
    ui.clearErrorFromInputUI(campaignName);
    ui.clearErrorFromInputUI(campaignDescription);
  };

  const _createCampaign = function (e) {
    e.preventDefault();
    const name = campaignName.value;
    const description = campaignDescription.value;

    if (!name) {
      ui.errorMessage(campaignName, "You cannot leave this field blank.");
    }

    if (!description) {
      ui.errorMessage(
        campaignDescription,
        "You cannot leave this field blank."
      );
    }

    if (campaignName.value && campaignDescription.value) {
      const currentdate = new Date();
      const dateNow =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear();
      request
        .post("http://localhost:3000/campaignList", {
          name: campaignName.value,
          description: campaignDescription.value,
          point: 0,
          date: dateNow,
        })
        .then(() => {
          _setCampaigns();
          const inputs = createCampaignForm.querySelectorAll("input");
          ui.clearInputs(inputs);
          ui.alertMessageTemplate(
            alertMessage,
            "success",
            "Campaign successfully added"
          );
        });
    }
  };

  //
  // Return objects assigned to module
  //

  return {
    init: function () {
      _eventListeners();
      _setCampaigns();
    },
  };
})();

// Initialize module
// ------------------------------

document.addEventListener("DOMContentLoaded", function () {
  List.init();
});
