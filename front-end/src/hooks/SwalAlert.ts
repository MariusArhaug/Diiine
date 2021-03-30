import swal from 'sweetalert';

export function SwalAlert(title: string, text: string, icon: string, buttonText: string, buttonStyle?: string) {
  swal({
    title: title,
    text: text,
    icon: icon,
    buttons: {
      confirm: {
        text: buttonText,
        className: `buttonStyle ${buttonStyle}`
      }
    }
  });
}
