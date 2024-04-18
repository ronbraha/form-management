import { InputError, makeDomainFunction } from "domain-functions";
import zodValidationSchema from "validation/zod";
import { formAction } from "formAction";
import { Form } from "components/form/Form/Form";
import { useActionData } from "react-router-dom";
import TextField from "components/form/Field/Field";
import Radio from "components/form/Radio/Radio";
import teams from "constants/teams";
import Path from "routes/paths";

const mutation = makeDomainFunction(zodValidationSchema)(async (values) => {
  if (values.team !== "Engineering")
    throw new InputError("Engineering is the only correct choice", "team");
  return values;
});

export const action = async ({ request }) =>
  formAction({
    request,
    schema: zodValidationSchema,
    mutation,
    successPath: Path.home,
  });

const RemixForms = () => {
  const action = useActionData();

  return (
    <div>
      <h1>Remix Forms</h1>
      <Form
        mode="onBlur"
        className="form"
        schema={zodValidationSchema}
        buttonLabel="Submit"
      >
        {({ Field: FormField, register, Button }) => (
          <>
            <FormField name="email">
              {({ errors }) => (
                <TextField
                  {...register("email")}
                  label="Email"
                  helperText={errors?.at(0)}
                />
              )}
            </FormField>
            <FormField name="firstName">
              {({ errors }) => (
                <TextField
                  {...register("firstName")}
                  label="First Name"
                  helperText={errors?.at(0)}
                />
              )}
            </FormField>
            <FormField name="lastName">
              {({ errors }) => (
                <TextField
                  {...register("lastName")}
                  label="Last Name"
                  helperText={errors?.at(0)}
                />
              )}
            </FormField>
            <FormField name="team">
              {({ Error }) => (
                <>
                  <div role="group" style={{ display: "flex" }}>
                    {teams.map((team) => (
                      <Radio
                        key={team}
                        name="team"
                        label={team}
                        {...register("team")}
                        defaultChecked={team === "Engineering"}
                        value={team}
                      />
                    ))}
                  </div>
                  <Error
                    style={{ color: "red", textAlign: "left" }}
                    name="team"
                  />
                </>
              )}
            </FormField>
            <Button />
          </>
        )}
      </Form>
      {action && JSON.stringify(action.values || action, null, "\t")}
    </div>
  );
};

export default RemixForms;
