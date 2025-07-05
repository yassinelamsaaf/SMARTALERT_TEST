import PropTypes from 'prop-types';

const Dropdown = ({ label, value, options, onSelect, isOpen, onToggle, icon }) => {
  return (
    <div className="dropdown-wrapper position-relative">
  <label className="form-label fw-bold d-block">{label}</label>
  <div className="dropdown">
    <button
      className="dropdown-toggle"
      type="button"
      onClick={onToggle}
    >
      <span className="d-flex align-items-center">
        {icon && <i className={`${icon} me-2`}></i>}
        {typeof value === 'string' || typeof value === 'number' ? value : 'Sélectionner'}
      </span>
      <i className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
    </button>
    {isOpen && (
      <ul className="dropdown-menu show w-100 mt-1">
        {options.map((option, index) => (
          <li key={index}>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => onSelect(option)}
            >
              {option}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  icon: PropTypes.string
};

export default Dropdown;