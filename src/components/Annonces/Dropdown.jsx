import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

const Dropdown = ({
  label,
  value,
  options,
  onSelect,
  isOpen,
  onToggle,
  icon,
  placeholder = 'Sélectionner',
  renderOption
}) => {
  const menuId = `dropdown-menu-${label.replace(/\s+/g, '-')}`;
  const buttonRef = useRef();
  const dropdownRef = useRef();

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onToggle(false);
      buttonRef.current?.focus();
    }
  };

  const getOptionLabel = (option) =>
    typeof option === 'object' && option !== null ? option.label : option;

  return (
    <div className="dropdown-wrapper position-relative" ref={dropdownRef}>
      <label className="form-label fw-bold d-block">{label}</label>
      <div className="dropdown">
        <button
          className="dropdown-toggle"
          type="button"
          onClick={() => onToggle(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={menuId}
          ref={buttonRef}
        >
          <span className="d-flex align-items-center">
            {icon && <i className={`${icon} me-2`}></i>}
            {value ? getOptionLabel(value) : <span className="text-muted">{placeholder}</span>}
          </span>
          <i className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
        </button>
        {isOpen && (
          <ul
            className="dropdown-menu show w-100 mt-1"
            id={menuId}
            tabIndex={-1}
            role="listbox"
            onKeyDown={handleKeyDown}
          >
            {options.length === 0 && (
              <li className="dropdown-item text-muted" tabIndex={-1}>
                {placeholder}
              </li>
            )}
            {options.map((option, index) => (
              <li key={index} role="option" aria-selected={value === option}>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => onSelect(option)}
                >
                  {renderOption ? renderOption(option) : getOptionLabel(option)}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  renderOption: PropTypes.func
};

export default Dropdown;
