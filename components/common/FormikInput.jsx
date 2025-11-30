import { ErrorMessage, Field, useFormikContext } from 'formik'
import Label from './Label'

const FormikInput = ({
  name,
  label,
  type = 'text',
  placeholder,
  fieldClass = '',
  required = false,
  maxLength = '',
  readOnly = false,
  leftIcon,
  rightIcon,
  labelClassName = '',
  ...props
}) => {
  const { errors, touched } = useFormikContext()
  const hasError = errors[name] && touched[name]
  return (
    <fieldset>
      {label && <Label label={label} required={required || false} className={labelClassName} />}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            {leftIcon}
          </div>
        )}
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          onWheel={(e) => e.currentTarget.blur()}
          readOnly={readOnly}
          className={`
            rightIcon && 'pr_8',
            hasError && 'border-red-300 focus:border-red-500 focus:ring-red-500/20',
            fieldClass
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            {rightIcon}
          </div>
        )}
      </div>
      <ErrorMessage name={name}>
        {(msg) => <div className="text-red-500 text-sm">{msg}</div>}
      </ErrorMessage>
    </fieldset>
  )
}

export default FormikInput
