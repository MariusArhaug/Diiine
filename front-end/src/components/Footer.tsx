import React from "react";
import footer from '../media/footer.svg';

function Footer() {
  return (
    <div>
      <img src={footer} style={{height: "200px"}} />
      <p> Support: diiine@mail.com </p>
    </div>
  );
}

export default Footer;