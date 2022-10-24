import React from "react";

const Text = ({
  children,
  fontSize = 1.2,
  fontWeight = "normal",
  color = "black",
  marginTop = "0vh",
  marginRight = "0vh",
  onClick,
}) => {
  return onClick ? (
    <button
      type="button"
      style={{
        fontSize: `${fontSize}rem`,
        fontWeight: fontWeight,
        fontFamily: "inter",
        color: color,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <span
      style={{
        fontSize: `${fontSize}rem`,
        fontWeight: fontWeight,
        color: color,
        marginTop: marginTop,
        fontFamily: "inter",
        marginRight: marginRight,
      }}
    >
      {children}
    </span>
  );
};

export default Text;
