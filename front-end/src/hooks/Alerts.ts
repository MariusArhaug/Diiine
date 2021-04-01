import swal from 'sweetalert';
import '../styles/App.css'

export function SuccessAlert(title: string, text: string, buttonText: string) {
  swal({
    title: title,
    text: text,
    icon: 'success',
    buttons: {
      confirm: {
        text: buttonText,
        className: 'buttonStyle'
      }
    }
  });
}


export function ErrorAlert(title: string, text: string, buttonText: string) {
  swal({
    title: title,
    text: text,
    icon: 'error',
    buttons: {
      confirm: {
        text: buttonText,
        className: `buttonStyle buttonError`
      }
    }
  });
}
