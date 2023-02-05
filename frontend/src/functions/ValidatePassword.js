function ValidatePassword() {
  //  Elements HTML-DOM of password
  const elementDivMessage = document.querySelector('#message')
  const elementPassword = document.querySelector("#password")
  const elementLetter = document.querySelector("#letter")
  const elementCapital = document.querySelector("#capital")
  const elementNumber = document.querySelector("#number")
  const elementLength = document.querySelector("#length")
  const elementSpecial = document.querySelector("#special")

  // When the user clicks on the password field, show the message box
  elementPassword.onfocus = function () {
    elementDivMessage.style.display = "block"
  }

  // When the user clicks outside of the password field, hide the message box
  elementPassword.onblur = function () {
    elementDivMessage.style.display = "none"
  }

  // When the user starts to type something inside the password field
  elementPassword.onkeyup = function () {
    // Validate lowercase letters
    const lowerCaseLetters = /[a-z]/g
    if (elementPassword.value.match(lowerCaseLetters)) {
      elementLetter.classList.remove("invalid")
      elementLetter.classList.add("valid")
    } else {
      elementLetter.classList.remove("valid")
      elementLetter.classList.add("invalid")
    }

    // Validate capital letters
    const upperCaseLetters = /[A-Z]/g
    if (elementPassword.value.match(upperCaseLetters)) {
      elementCapital.classList.remove("invalid")
      elementCapital.classList.add("valid")
    } else {
      elementCapital.classList.remove("valid")
      elementCapital.classList.add("invalid")
    }

    // Validate numbers
    const numbers = /[0-9]/g
    if (elementPassword.value.match(numbers)) {
      elementNumber.classList.remove("invalid")
      elementNumber.classList.add("valid")
    } else {
      elementNumber.classList.remove("valid")
      elementNumber.classList.add("invalid")
    }

    // Validate length
    if (elementPassword.value.length >= 8) {
      elementLength.classList.remove("invalid")
      elementLength.classList.add("valid")
    } else {
      elementLength.classList.remove("valid")
      elementLength.classList.add("invalid")
    }

    // Validate special character
    const specialCharacter = /[$@$!%*?&_-]/g
    if (elementPassword.value.match(specialCharacter)) {
      elementSpecial.classList.remove("invalid")
      elementSpecial.classList.add("valid")
    } else {
      elementSpecial.classList.remove("valid")
      elementSpecial.classList.add("invalid")
    }
  }
}

export default ValidatePassword