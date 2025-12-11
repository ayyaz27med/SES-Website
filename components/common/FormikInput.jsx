// FormikInput.jsx
import React, { useRef } from "react";
import { useField } from "formik";
import Label from "./Label";

const FormikInput = ({
  name,
  label,
  type = "text",
  placeholder,
  fieldClass = "",
  required = false,
  maxLength = "",
  readOnly = false,
  leftIcon,
  rightIcon,
  labelClassName = "",
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const inputRef = useRef(null);

  const handleFocus = (e) => {
    // If browser supports showPicker (Chromium), trigger it so clicking input opens calendar
    if (type === "date" && inputRef.current && typeof inputRef.current.showPicker === "function") {
      try {
        inputRef.current.showPicker();
      } catch (err) {
        // ignore if not allowed
      }
    }

    if (props.onFocus) props.onFocus(e);
  };

  const handleClick = (e) => {
    // Some mobile/desktop combos open on click, ensure showPicker called also on click
    if (type === "date" && inputRef.current && typeof inputRef.current.showPicker === "function") {
      try {
        inputRef.current.showPicker();
      } catch (err) {}
    }
    if (props.onClick) props.onClick(e);
  };

  const onWheel = (e) => {
    if (type === "number") {
      e.currentTarget.blur();
    }
    if (props.onWheel) props.onWheel(e);
  };

  return (
    <fieldset>
      {label && (
        <Label label={label} required={required || false} className={labelClassName} />
      )}
      <div className={`relative ${fieldClass}`}>
        <input
          {...field}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          readOnly={readOnly}
          ref={inputRef}
          onFocus={handleFocus}
          onClick={handleClick}
          onWheel={onWheel}
          onChange={(e) => {
            // default Formik field change
            field.onChange(e);
            if (props.onChange) props.onChange(e);
          }}
          {...props}
        />
      </div>

      {meta.touched && meta.error ? (
        <div className="small" style={{ color: "red" }}>
          {meta.error}
        </div>
      ) : null}
    </fieldset>
  );
};

export default FormikInput;
