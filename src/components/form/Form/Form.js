import { createForm } from "remix-forms";
import {
  Form as FrameworkForm,
  useActionData,
  useSubmit,
  useNavigation,
} from "react-router-dom";

const Form = createForm({
  component: FrameworkForm,
  useNavigation,
  useSubmit,
  useActionData,
});

export { Form };
