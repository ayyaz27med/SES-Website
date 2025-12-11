import { useField } from "formik";

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
          <div>
            <label className="block mb-1 text-md">{label}</label>
          </div>
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
