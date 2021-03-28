import { Button } from "@material-ui/core";
import React from "react";
import { useAuth } from "../hooks/use-auth";
import footer from '../media/footer.svg';
import swal from 'sweetalert';
import '../styles/App.css';


//Interested in advertising on this page? Lets Button: get in touch
function Footer() {

  const handleOnClick = (): void => {
    swal({
      title: "Contact information",
      text: 'Contact us on diiine@mail.com',
      buttons: {
        confirm: {
          text: "Ok",
          className: "buttonStyle",
        }
      }
    });
  };

  return (
    <div>
      <img src={footer} alt="footerimage" />
      <Button variant="outlined" onClick={handleOnClick}>
        Want to advertise on this page?
      </Button>
    </div>
  );

}

export default Footer;