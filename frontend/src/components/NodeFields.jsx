// NodeFields.js
// Reusable form field components for nodes

import './NodeFields.css';

/**
 * TextField - A styled text input field
 */
export const TextField = ({
    label,
    value,
    onChange,
    placeholder = '',
    name
}) => {
    return (
        <div className="node-field">
            {label && <label className="node-field-label">{label}</label>}
            <input
                type="text"
                className="node-field-input"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
            />
        </div>
    );
};

/**
 * SelectField - A styled dropdown select
 */
export const SelectField = ({
    label,
    value,
    onChange,
    options = [],
    name
}) => {
    return (
        <div className="node-field">
            {label && <label className="node-field-label">{label}</label>}
            <select
                className="node-field-select"
                value={value}
                onChange={onChange}
                name={name}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

/**
 * TextAreaField - A styled multi-line text area
 */
export const TextAreaField = ({
    label,
    value,
    onChange,
    placeholder = '',
    rows = 3,
    name,
    style = {}
}) => {
    return (
        <div className="node-field">
            {label && <label className="node-field-label">{label}</label>}
            <textarea
                className="node-field-textarea"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                name={name}
                style={style}
            />
        </div>
    );
};

/**
 * NumberField - A styled number input
 */
export const NumberField = ({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    name
}) => {
    return (
        <div className="node-field">
            {label && <label className="node-field-label">{label}</label>}
            <input
                type="number"
                className="node-field-input node-field-number"
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                name={name}
            />
        </div>
    );
};
