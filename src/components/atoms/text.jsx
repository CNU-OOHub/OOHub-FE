import React from "react";

const Text = ({
  children,
  fontSize = 1.1,
  fontWeight = "normal",
  color = "black",
  marginTop = "0vh",
  marginBottom = "0vh",
  marginLeft = "0vh",
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
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        fontFamily: "inter",
      }}
    >
      {children}
    </span>
  );
};

export default Text;
