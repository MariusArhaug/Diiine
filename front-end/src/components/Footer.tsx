import React from "react";
import { useAuth } from "../hooks/use-auth";
import footer from '../media/footer.svg';

function Footer() {
  const user = useAuth().user;

  if (user){
    return (
      <div>
        <img src={footer} style={{height: "200px"}} />
        <p> Support: diiine@mail.com </p>
      </div>
    );
  }

  return (
    <div>
      <img src={footer} style={{width: "100vw"}} />
    </div>
  );
  
}

export default Footer;