import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { netSalaryCalcApi } from "../../../../api/netSalaryCalcApi";
import {
  NetSalaryCalcResult,
  UserInputNetSalaryCalcData,
} from "../../../../domain/features/netSalaryCalculator/types";
import { calculateNetSalary } from "../../../../domain/features/netSalaryCalculator/calculateNetSalary";

export const NetSalaryCalculatorResult = () => {
  const { resultId } = useParams();

  const [userInput, setUserInput] = useState<UserInputNetSalaryCalcData | null>(
    null
  );

  const [netSalary, setNetSalary] = useState<NetSalaryCalcResult | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (!resultId) {
          throw new Error(
            `/net-salary-calc/:resultId require resultId, but received: ${resultId}`
          );
        }

        const userInputSalaryCalcData = await netSalaryCalcApi().findId(
          resultId
        );

        if (!userInputSalaryCalcData) {
          throw new Error(
            `/net-salary-calc/:resultId could not find entry with id: ${resultId}`
          );
        }

        setUserInput(userInputSalaryCalcData);

        const netSalaryCalcResult = calculateNetSalary(userInputSalaryCalcData);
        setNetSalary(netSalaryCalcResult);
      } catch (_err) {
        /**
         * šeit mēs varētu pievienot kādu analītikas logeri kā piemēram bugsnag,
         * kas reportētu errorus uz mūsu serveriem
         */
        navigate("/404", { replace: true });
      }
    })();
  }, [resultId, navigate]);

  return (
    <div style={{ padding: 24 }}>
      {userInput === null || netSalary === null ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <p>Lietotāja inputs:</p>
          <pre>{JSON.stringify(userInput, null, 2)}</pre>

          <p>salary calc rezultāts: </p>
          <pre>{JSON.stringify(netSalary, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
