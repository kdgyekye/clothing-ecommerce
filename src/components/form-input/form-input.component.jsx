import React, {useEffect} from 'react';

import './form-input.style.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
    return(
    <div className='group'>
        <input className='form-control' onChange={handleChange} {...otherProps} />
        {label ? (
            <label
                className={`${
                    otherProps.value.length ? 'shrink' : ''
                } form-input-label`}
            >
                {label}
            </label>
        ) : null}
        <p className="help-block text-danger">
            {(otherProps.touched && otherProps.errors) &&
            <span>{otherProps.errors}</span>
            }
        </p>
    </div>
)};

export default FormInput;