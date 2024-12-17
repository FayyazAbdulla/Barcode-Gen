import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-6 text-center">
      <p className="text-sm">
        Created by <span className="font-semibold text-purple-400">TeamCodeMe</span> &copy;{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
