import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const EditContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

const EditContactForm = ({ initialValues, onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        name: initialValues.name || "",
        phone: initialValues.phone || "",
      }}
      validationSchema={EditContactSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(248, 231, 231)",
            gap: "5px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <label>
            Name
            <Field name="name" type="text" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </label>

          <label>
            Phone
            <Field
              name="phone"
              type="text"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setFieldValue("phone", value);
                }
              }}
            />
            {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
          </label>

          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditContactForm;
