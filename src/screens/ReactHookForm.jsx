import { useState } from "react";

import TextField from "components/form/Field/Field.jsx";
import zodValidationSchema from "validation/zod.js";
import teams from "constants/teams.js";
import Radio from "components/form/Radio/Radio.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";

const ReactHookForm = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const { register, handleSubmit, formState, reset, control } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      team: "Engineering",
    },
    mode: "onBlur",
    resolver: zodResolver(zodValidationSchema),
  });
  const onSubmit = (values) => {
    setSubmittedData(values);
    reset();
  };

  return (
    <div>
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          helperText={formState.errors?.email?.message}
        />
        <TextField
          label="First Name"
          type="text"
          {...register("firstName")}
          helperText={formState.errors?.firstName?.message}
        />
        <TextField
          label="Last Name"
          type="text"
          {...register("lastName")}
          helperText={formState.errors?.lastName?.message}
        />
        <div role="group" style={{ display: "flex" }}>
          {teams.map((team) => (
            <Radio key={team} label={team} {...register("team")} value={team} />
          ))}
        </div>
        <button type="submit">Submit</button>
        <DevTool control={control} />
      </form>

      {submittedData && JSON.stringify(submittedData, null, "\t")}
    </div>
  );
};

export default ReactHookForm;
