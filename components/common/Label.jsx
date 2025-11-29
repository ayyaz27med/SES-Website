
const Label = ({ label, required, className, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 mb-1', className`}>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}

export default Label
