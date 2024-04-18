import React from "react";
import PropTypes from "prop-types";
import "./Field.css";
import { useFormContext } from "react-hook-form";

const TextField = React.forwardRef(
  ({ label, helperText, ...inputProps }, ref) => {
    const inputId = React.useId();
    const helperTextId = React.useId();
    const { register } = useFormContext();
    return (
      <div className="form-control">
        <label className="form-control__label" htmlFor={inputId}>
          {label}
        </label>
        <input
          className="form-control__input"
          aria-describedby={helperTextId}
          aria-invalid={Boolean(helperText)}
          id={inputId}
          ref={ref}
          {...register(inputProps.name)}
          {...inputProps}
        />
        <div
          className="form-control__helper-text"
          id={helperTextId}
          role="alert"
        >
          {helperText || " "}
        </div>
      </div>
    );
  }
);

TextField.displayName = "Field";

TextField.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
};

TextField.defaultProps = {
  label: "Field",
  type: "text",
  helperText: " ",
};

export default TextField;
