import React from "react";
import "./Input.css";

const Input = (event) => {
  const inputs = document.querySelectorAll(".input-div");
  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }
  function remcl() {
    let parent = this.parentNode.parentNode;
    if (event.target.value === "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
  });
  const handleInputChange = (event) => {
   
  }
  return (
    <div className="input-div focus">
      <div className="i">
        <i className="fas fa-user"></i>
      </div>
      <div className="div">
        <input
          id={event.target.value.id}
          name={event.target.value.name}
          placeholder={event.target.value.placeholder}
          type={event.target.value.type}
          onChange={handleInputChange}
          className={event.target.value ? "input-error" : "input-div"}
        />
      </div>
    </div>
  );
};
export default Input;
