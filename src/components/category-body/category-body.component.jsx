import React from "react";


const ContainerBody = ({ title, message }) => (
  <div className="category-body-container">
    <h2>{title.toUpperCase()}</h2>
    <p>{message}</p>
  </div>
);

export default ContainerBody