import { Request } from "../utils/request.js";
import { UI } from "./ui.js";

const ui = new UI();
const request = new Request();

// Setup module
// ------------------------------

const Login = (function () {
  //
  // Variables
  //

  const loginButton = document.querySelector(".js-login-button");
  const loginModal = document.querySelector(".js-modal-login");
  const loginModalContent = document.querySelector(".js-modal-login-content");
  const loginForm = document.querySelector(".js-login-form");
  const username = document.querySelector(".js-login-username");
  const password = document.querySelector(".js-login-password");

  //
  // Event Listeners
  //

  const _eventListeners = function () {
    document.addEventListener("click", _closeModal);
    loginButton.addEventListener("click", _toggleLoginModal);
    loginForm.addEventListener("submit", _loginRequest);
    username.addEventListener("input", _clearErrorFromInput);
    password.addEventListener("input", _clearErrorFromInput);
  };

  //
  // Setup module components
  //

  const _clearErrorFromInput = function () {
    ui.clearErrorFromInputUI(this);
  };

  const _closeModal = function (e) {
    const inputs = loginModalContent.querySelectorAll("input");
    if (
      !e.composedPath().includes(loginModalContent) &&
      !e.composedPath().includes(loginButton)
    ) {
      loginModal.classList.remove("active");
      loginButton.classList.remove("active");
      ui.clearErrorsUI(loginModal);
      ui.clearInputs(inputs);
    }
  };

  const _toggleLoginModal = function () {
    loginModal.classList.add("active");
    this.classList.add("active");
  };

  const _loginRequest = function (e) {
    e.preventDefault();
    ui.clearErrorsUI(loginModal);

    if (!username.value) {
      ui.errorMessage(username, "Please enter a username");
    }

    if (!password.value) {
      ui.errorMessage(password, "Please enter a password");
    }

    if (password.value && username.value) {
      request.get("http://localhost:3000/loginInformation").then((data) => {
        if (
          password.value === data.password &&
          username.value === data.username
        ) {
          window.location = "../list-page/index.html";
        }

        if (username.value !== data.username) {
          ui.errorMessage(username, "Username is wrong");
        }

        if (password.value !== data.password) {
          ui.errorMessage(password, "Password is wrong");
        }
      });
    }
  };

  //
  // Return objects assigned to module
  //

  return {
    init: function () {
      _eventListeners();
    },
  };
})();

// Initialize module
// ------------------------------

document.addEventListener("DOMContentLoaded", function () {
  Login.init();
});
