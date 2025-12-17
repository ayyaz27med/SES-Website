
const Label = ({ label, required, className, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className={`fw-5  mb-1', className`}>
      {label}
      {required && <span style={{ color: 'red' }}>*</span>}
    </label>
  )
}

export default Label
