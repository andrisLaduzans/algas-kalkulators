import localforage from "localforage";
import { UserInputNetSalaryCalc } from "../domain/features/netSalaryCalculator/types";

export const netSalaryCalcApi = () => ({
  create: async (data: UserInputNetSalaryCalc) => {
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
