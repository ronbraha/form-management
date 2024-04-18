import { useActionData } from "react-router-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import zodValidationSchema from "validation/zod.js";
import TextField from "components/form/Field/Field.jsx";
import Radio from "components/form/Radio/Radio.jsx";
import teams from "constants/teams.js";

import { json } from "react-router-dom";
import { useState } from "react";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: zodValidationSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  return json(submission.reply({ resetForm: true }));
};

const Conform = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const lastResult = useActionData();
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,
    defaultValue: {
      email: "",
      firstName: "",
      lastName: "",
      team: "Engineering",
    },
    onSubmit: (e, context) => {
      e.preventDefault();
      setSubmittedData(context.submission.value);
      e.target.reset();
      return null;
    },
    // Configure when each field should be validated
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: zodValidationSchema }),
  });

  return (
    <div>
      <h1>Conform</h1>
      <form method="post" id={form.id} onSubmit={form.onSubmit}>
        <TextField
          label="Email"
          type="email"
          name={fields.email.name}
          helperText={fields.email.errors?.join()}
        />
        <TextField
          name={fields.firstName.name}
          label="First Name"
          type="text"
          helperText={fields.firstName.errors?.join()}
        />
        <TextField
          name={fields.lastName.name}
          label="Last Name"
          type="text"
          helperText={fields.lastName.errors?.join()}
        />
        <div role="group" style={{ display: "flex" }}>
          {teams.map((team) => (
            <Radio
              defaultChecked={fields.team.initialValue === team}
              key={team}
              name={fields.team.name}
              label={team}
              value={team}
            />
          ))}
        </div>
        <button disabled={!form.valid} form={form.id} type="submit">
          Submit
        </button>
      </form>

      {submittedData && JSON.stringify(submittedData, null, "\t")}
    </div>
  );
};

export default Conform;
