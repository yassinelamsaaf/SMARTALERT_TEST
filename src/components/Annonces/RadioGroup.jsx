import PropTypes from 'prop-types';

const RadioGroup = ({ label, name, value, options, onChange, layout = 'horizontal' }) => {
  return (
    <div className={`mb-4 radio-group ${layout}`}>
      <label className="form-label fw-bold d-block mb-2">{label}</label>
      <div className={`radio-options ${layout === 'vertical' ? 'd-flex flex-column' : 'd-flex flex-wrap gap-3'}`}>
        {options.map((option) => (
          <div className="form-check custom-radio" key={option.value}>
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={`${name}-${option.value}`}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <label className="form-check-label ms-2" htmlFor={`${name}-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

RadioGroup.propTypes = {
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
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default RadioGroup;
