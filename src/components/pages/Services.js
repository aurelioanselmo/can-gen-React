import React from "react";
import "../../App.css";
import Footer from "../Footer";
import NewModal from "../NewModal";

export default function Services() {
  return (
    <>
      <div className="container">
        <NewModal title={"My Modal"} content={"My Content"} />
        <button className="lftp-line">Lftp Generator</button>
        <button className="resources">Resources</button>
      </div>
      <Footer />
    </>
  );
}
