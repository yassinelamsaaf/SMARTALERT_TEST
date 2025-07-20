import PropTypes from 'prop-types';

const OptionSelector = ({ label, name, options, value, onChange }) => {
  return (
    <div className="option-selector">
      <label className="option-selector__label">{label}</label>
      <div className="option-selector__group" role="group" aria-label={label}>
        {options.map((option) => (
          <div key={option.value} className="option-selector__item">
            <input
              type="radio"
              className="option-selector__input"
              name={name}
              id={`${name}-${option.value}`}
              value={option.value}
              checked={value === option.value}
              onChange={() => {}}
              onClick={() => onChange(option.value)}
              autoComplete="off"
            />
            <label
              className={`option-selector__btn ${value === option.value ? 'active' : ''}`}
              htmlFor={`${name}-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

OptionSelector.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OptionSelector;
