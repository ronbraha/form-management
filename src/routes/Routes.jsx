import { createBrowserRouter } from "react-router-dom";
import Screen, { Action } from "screens";
import Path from "routes/paths";

const router = createBrowserRouter([
  {
    path: Path.home,
    element: <Screen.Home />,
    children: [
      { index: true, element: <h1>Select a form Example!</h1> },
      { path: Path.formik, element: <Screen.Formik /> },
      { path: Path["react-hook-form"], element: <Screen.ReactHookForm /> },
      {
        path: Path["remix-forms"],
        element: <Screen.RemixForms />,
        action: Action.remixForms,
      },
      {
        path: Path.conform,
        element: <Screen.Conform />,
        action: Action.conform,
      },
      { path: Path["tanstack-form"], element: <Screen.TanstackForm /> },
    ],
  },
]);

export default router;
