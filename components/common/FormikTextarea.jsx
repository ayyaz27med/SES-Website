import { useField } from "formik";
import Label from "./Label";

const FormikTextArea = ({
  label,
  name,
  fieldContainer,
  id,
  rows = 4,
  placeholder,
  readOnly = false,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <>
      <div className={`flex flex-col`}>
        {label && (
          <Label label={label} />
        )}
        <div className={fieldContainer}>
          <textarea
            id={id}
            {...field}
            placeholder={placeholder}
            rows={rows}
            value={field.value ?? ""}
            onChange={(e) => helpers.setValue(e.target?.value)}
            readOnly={readOnly}
          />
        </div>
        {meta.error && meta.touched && (
          <div className="small" style={{ color: "red" }}>{meta.error}</div>
        )}
      </div>
    </>
  );
};

export default FormikTextArea;
