import { Button } from "@material-ui/core";
import React from "react";
import { useAuth } from "../hooks/use-auth";
import footer from '../media/footer.svg';
import swal from 'sweetalert';
import '../styles/App.css';

export default function Footer() {

  const user = useAuth().user;

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

  if (user) {
    return (
      <div>
        <img src={footer} style={{ height: "200px" }} alt="footerimage" />
        <br />
        <Button variant="outlined" onClick={handleOnClick}>
          Want to advertise on this page?
        </Button>
      </div>
    );
  }
  return (
    <div>
      <img src={footer} alt="footerimage" style={{ height: "25vw" }} />
    </div>
  );
}