import { createBrowserRouter } from "react-router-dom";
import { NetSalaryCalc } from "./routes/net-salary-calc/NetSalaryCalc";
import { NetSalaryCalculatorResult } from "./routes/net-salary-calc/result/NetSalaryCalculatorResult";
import { Root } from "./routes/Root";
import { ErrorPage } from "./routes/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <NetSalaryCalc />,
      },
      {
        path: "net-salary-calc/:resultId",
        element: <NetSalaryCalculatorResult />,
      },

      {
        path: "404",
        element: <ErrorPage />,
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);
