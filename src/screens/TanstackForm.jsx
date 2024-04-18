import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import TextField from "components/form/Field/Field";
import teams from "constants/teams";
import Radio from "components/form/Radio/Radio";
import { z } from "zod";
import { useState } from "react";

const TanstackForm = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const form = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      team: "Engineering",
    },
    onSubmit: async ({ value }) => {
      setSubmittedData(value);
    },
    validatorAdapter: zodValidator,
  });
  return (
    <div>
      <h1>TanStack Form</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          validators={{
            onBlur: z
              .string()
              .email("Email must be valid")
              .min(1, "Email is required"),
          }}
        >
          {(field) => (
            <TextField
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              label="Email"
              type="email"
              helperText={field.state.meta.touchedErrors?.at(0)}
            />
          )}
        </form.Field>
        <form.Field
          name="firstName"
          validators={{ onBlur: z.string().min(1, "First name is required") }}
        >
          {(field) => (
            <TextField
              name={field.name}
              label="First Name"
              type="text"
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              helperText={field.state.meta.touchedErrors?.at(0)}
            />
          )}
        </form.Field>
        <form.Field
          name="lastName"
          validators={{ onBlur: z.string().min(1, "Last name is required") }}
        >
          {(field) => (
            <TextField
              name={field.name}
              label="Last Name"
              type="text"
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              helperText={field.state.meta.touchedErrors?.at(0)}
            />
          )}
        </form.Field>
        <form.Field name="team" validators={{ onBlur: z.enum(teams) }}>
          {(field) => (
            <div role="group" style={{ display: "flex" }}>
              {teams.map((team) => (
                <Radio
                  key={team}
                  name={field.name}
                  label={team}
                  defaultChecked={field.state.value === team}
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={team}
                />
              ))}
            </div>
          )}
        </form.Field>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button disabled={!canSubmit} type="submit">
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        </form.Subscribe>
      </form>

      {submittedData && JSON.stringify(submittedData, null, "\t")}
    </div>
  );
};

export default TanstackForm;
