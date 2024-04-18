import Formik from "screens/Formik";
import Home from "screens/Home";
import ReactHookForm from "screens/ReactHookForm";
import RemixForms, { action as remixFormsAction } from "screens/RemixForms";
import Conform, { action as conformAction } from "screens/Conform";
import TanstackForm from "screens/TanstackForm";

const Screen = {
  Home,
  Formik,
  ReactHookForm,
  RemixForms,
  Conform,
  TanstackForm,
};

export const Action = {
  remixForms: remixFormsAction,
  conform: conformAction,
};

export default Screen;
