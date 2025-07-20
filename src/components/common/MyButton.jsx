import React from "react";

/**
 * MyButton component
 * @param {string} icon - Path to the icon relative to /img (e.g. 'dashboard/icons/1.svg') OR icon class name (e.g. 'icon-plus')
 * @param {function} onClick - Click handler
 * @param {number} size - Width and height in px
 * @param {string} alt - Alt text for the icon (only used for image icons)
 * @param {string} title - Tooltip/title for the button
 * @param {object} style - Additional style
 * @param {string} className - Additional className
 * @param {boolean} disabled - Indicates if the button is disabled
 * @param {object} imgStyle - Additional style for the icon image
 * @param {boolean} isIconClass - If true, treats icon as a CSS class name instead of image URL
 */
const INEButton = ({
  icon,
  onClick = () => {},
  size = 48,
  alt = "button icon",
  title = "",
  style = {},
  className = "",
  disabled = false,
  imgStyle = {},
  isIconClass = false,
  color = 'white',
}) => {
  // Check if icon is a class name (starts with 'icon-' or contains no file extension)
  const isIconClassName = isIconClass || icon.startsWith('icon-') || (!icon.includes('.') && !icon.startsWith('http'));

  return (
    <button
      className={`my-squared-btn my-squared-btn--scale ${className}`}
      onClick={disabled ? undefined : onClick}
      title={title}
      disabled={disabled}
      style={{
        width: size,
        height: size,
        borderRadius: size / 4, // half-rounded
        background: "var(--color-dark-3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "background 0.2s, transform 0.2s cubic-bezier(0.4,0,0.2,1), opacity 0.2s",
        ...style,
      }}
    >
      {isIconClassName ? (
        <i 
          className={icon} 
          style={{ 
            fontSize: size * 0.6, 
            color: color,
            ...imgStyle 
          }}
        />
      ) : (
        <img
          src={`${icon}`}
          alt={alt}
          style={{ width: size * 0.6, height: size * 0.6, objectFit: "contain", ...imgStyle }}
        />
      )}
    </button>
  );
};

export default INEButton; 