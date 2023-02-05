//  Libray sweetalert2 React
import Swal from 'sweetalert2';

let timerInterval= 0;
  function windowsAlertProcessValidateEmail() {
    Swal.fire({
      title: 'Validate Email.',
      html: 'I will close in <b>0.5</b> seconds.',
      timer: 500,
      timerProgressBar: true,
      width: 400,
      position: 'top-end',
      padding: '2em',
      color: 'rgb(9, 9, 9)',
      background: '#aaa url("../images/fondos/logoTransparent1.jpg")',
      backdrop: `
      rgba(0,0,123,0.4)
      url("../images/fondos/logoBuy1.jpg")
      left top
      no-repeat
    `,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'info',
      imageUrl: 'https://unsplash.it/200/100',
      imageWidth: 200,
      imageHeight: 100,
      imageAlt: 'Custom image',
      showCloseButton: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
  }

function ValidateEmail({ parInputEmail }) {
  console.log(parInputEmail)
  let resultValidationEmail = false;
  let contOfArroba = 0;
  let contPartLeftCharacter = 0;

  const regulate = '/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/';

  if (typeof parInputEmail === 'string' || parInputEmail !== null || parInputEmail.length > 0) {
    // if (parInputEmail.match(regulate)) {
    //   resultValidationEmail = true;
    // }
    // else {
    //   alert("Invalid email address.");
    //   document.form1.text1.focus();
    //   alertNotValidation();
    //   return resultValidationEmail = false;
    // }

    while (contOfArroba < 2) {
      for (let i = 0; i < parInputEmail.length - 1; i++) {
        contPartLeftCharacter++;
        if (parInputEmail.charAt(i) === '@') {
          contOfArroba++;
        }
      }
    }
    if (contPartLeftCharacter > 4) {
      resultValidationEmail = true;
    }
  } else {
    alertNotValidation();
    resultValidationEmail = false;
  }

  return resultValidationEmail;
}

function alertNotValidation() {
  windowsAlertProcessValidateEmail();
}

export default ValidateEmail;


    
  
  