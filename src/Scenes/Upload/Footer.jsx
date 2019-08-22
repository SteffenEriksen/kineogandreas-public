import React from "react";

const style = {
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  backgroundColor: "red",
  color: "white",
  textAlign: "center"
};

export default function Footer() {
  return (
    <div style={style}>
      <h1>Footer</h1>
    </div>
  );
}
