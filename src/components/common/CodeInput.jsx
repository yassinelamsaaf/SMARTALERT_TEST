import React, { useRef, useEffect } from "react";

const CodeInput = ({
  value = ["", "", "", "", "", ""],
  onChange,
  lang = "fr",
  length = 6,
  autoFocus = true,
  inputStyle = {},
  containerStyle = {},
}) => {
  const inputsRef = useRef([]);

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (e, i) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    let newArr = [...value];
    if (val.length === length) {
      newArr = val.split("").slice(0, length);
      onChange(newArr);
      e.target.blur();
      return;
    }
    if (val.length <= 1) {
      newArr[i] = val;
      onChange(newArr);
      if (val && i < length - 1) {
        inputsRef.current[i + 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("Text").replace(/[^0-9]/g, "");
    if (pasted.length === length) {
      onChange(pasted.split("").slice(0, length));
      e.preventDefault();
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        marginBottom: 20,
        flexDirection: lang === "ar" ? "row-reverse" : "row",
        ...containerStyle,
      }}
    >
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          value={value[i] || ""}
          dir="ltr"
          onChange={(e) => handleChange(e, i)}
          onPaste={handlePaste}
          onKeyDown={(e) => handleKeyDown(e, i)}
          style={{
            width: 40,
            height: 48,
            fontSize: 20,
            fontWeight: 600,
            textAlign: "center",
            border: "2px solid #eee",
            borderRadius: 8,
            outline: "none",
            background: "#fafafa",
            transition: "all 0.2s",
            ...(value[i] ? { borderColor: "#F15A29", background: "#fff" } : {}),
            ...inputStyle,
          }}
          maxLength={1}
          autoFocus={autoFocus && i === 0}
        />
      ))}
    </div>
  );
};

export default CodeInput;
