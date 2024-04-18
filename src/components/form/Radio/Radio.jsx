import React from "react";
import PropTypes from "prop-types";
import "./Radio.css";

const Radio = React.forwardRef(
  ({ label, helperTextId, ...inputProps }, ref) => {
    const inputId = React.useId();

    return (
      <div className="form-control__radio">
        <input
          aria-describedby={helperTextId}
          id={inputId}
          ref={ref}
          type="radio"
          {...inputProps}
        />
        <label className="form-control__label" htmlFor={inputId}>
          {label}
        </label>
      </div>
    );
  }
);

Radio.displayName = "Radio";

Radio.propTypes = {
  label: PropTypes.string,
  helperTextId: PropTypes.string,
};

Radio.defaultProps = {
  label: "Field",
  helperTextId: null,
};

export default Radio;
