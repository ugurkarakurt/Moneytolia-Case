export class UI {
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

  clearErrorFromInputUI(element) {
    const error = element.closest(".input-group").querySelector(".error");
    error.classList.remove("active");
    element.classList.remove("input-error");
  }
}
