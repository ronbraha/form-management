import { useState } from "react";
import { useFormik } from "formik";

import TextField from "components/form/Field/Field.jsx";
import yupValidationSchema from "validation/yup.js";
import teams from "constants/teams.js";
import Radio from "components/form/Radio/Radio.jsx";

const Formik = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    initialValues,
    values,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      team: "Engineering",
    },
    validationSchema: yupValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    isInitialValid: false,
    onSubmit: (values, { resetForm }) => {
      setSubmittedData(values);
      resetForm();
    },
  });

  return (
    <div>
      <h1>Formik</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.email && errors.email}
          value={values.email}
        />
        <TextField
          name="firstName"
          label="First Name"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.firstName && errors.firstName}
          value={values.firstName}
        />
        <TextField
          name="lastName"
          label="Last Name"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.lastName && errors.lastName}
          value={values.lastName}
        />
        <div style={{ display: "flex" }}>
          {teams.map((team) => (
            <Radio
              key={team}
              name="team"
              label={team}
              onChange={handleChange}
              onBlur={handleBlur}
              defaultChecked={initialValues.team === team}
              checked={values.team === team}
              value={team}
            />
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>

      {submittedData && JSON.stringify(submittedData, null, "\t")}
    </div>
  );
};

export default Formik;
