import { Form, Formik } from 'formik'

const FormikForm = ({
  children,
  ...formikProps
}) => {
  return (
    <Formik {...formikProps}>
      {(formikBag) => (
        <Form>{typeof children === 'function' ? children(formikBag) : children}</Form>
      )}
    </Formik>
  )
}

export default FormikForm
