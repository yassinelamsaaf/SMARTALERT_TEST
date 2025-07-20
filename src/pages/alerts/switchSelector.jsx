import PropTypes from 'prop-types';
import { useState } from 'react';

const SwitchSelector = ({ label,  onChange, activeLabel, inactiveLabel, id }) => {

    const [checked, setChecked] = useState(false)

    return (
  <div className="option-selector">
    <label className="option-selector__label" htmlFor={id}>{label}</label>
    <div className="custom-switch" style={{ marginTop: 8 }}>
      <input
        type="checkbox"
        className="custom-switch__input"
        id={id}
        checked={checked}
        onChange={()=>{setChecked(!checked)}}
       
      />
      <span className="custom-switch__slider"
       onClick={e => {
        setChecked(!checked);
        onChange(!checked)
    }}></span>
      <span className="custom-switch__label">
        {checked ? activeLabel : inactiveLabel}
      </span>
    </div>
  </div>
)};

SwitchSelector.propTypes = {
  label: PropTypes.string.isRequired,
//   checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  activeLabel: PropTypes.string.isRequired,
  inactiveLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default SwitchSelector;
