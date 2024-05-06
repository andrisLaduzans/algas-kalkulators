import localforage from "localforage";
import { UserInputNetSalaryCalc } from "../domain/features/netSalaryCalculator/types";
import { delay } from "../utils/delay";

export const netSalaryCalcApi = () => ({
  create: async (data: UserInputNetSalaryCalc) => {
    await delay(5000);

    try {
      const uniqueId = crypto.randomUUID();
      const updatedAt = Date.now();
      const value = await localforage.setItem("netSalaryCalcInput", {
        ...data,
        id: uniqueId,
        updatedAt,
      });

      console.log(value);
    } catch (err) {
      // This code runs if there were any errors.
      console.log(err);
    }
  },
});
