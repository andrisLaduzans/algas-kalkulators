import { createBrowserRouter } from "react-router-dom";
import { NetSalaryCalc } from "./routes/net-salary-calc/NetSalaryCalc";
import { NetSalaryCalculatorResult } from "./routes/net-salary-calc/result/NetSalaryCalculatorResult";
import { Root } from "./routes/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <NetSalaryCalc />,
      },
      {
        path: "net-salary-calc/:resultId",
        element: <NetSalaryCalculatorResult />,
      },
    ],
  },
]);
