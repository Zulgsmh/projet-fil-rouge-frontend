import React from "react";

const Footer = () => {
  return (
    <div className="flex px-10 py-3 justify-between text-white">
      <div>&#169; - {new Date().getFullYear()}</div>
      <h2>MyEasyContainer</h2>
      <div className="flex items-center gap-2">
        Projet fil rouge - ESI5 Evry
      </div>
    </div>
  );
};

export default Footer;
