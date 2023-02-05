import Swal from 'sweetalert2'


function AddArticleToSC() {
  let timerInterval = 0
  function windowsAlertProcessAddArticle() {
    Swal.fire({
      title: 'ShoppingCar: Add an article',
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
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })
  }

  return windowsAlertProcessAddArticle()
}

export default AddArticleToSC