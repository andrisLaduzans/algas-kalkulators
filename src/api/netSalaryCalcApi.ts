import localforage from "localforage";
import {
  UserInputNetSalaryCalc,
  UserInputNetSalaryCalcData,
} from "../domain/features/netSalaryCalculator/types";

export const netSalaryCalcApi = () => ({
  create: async (
    data: UserInputNetSalaryCalc
  ): Promise<UserInputNetSalaryCalcData | null> => {
    try {
      const uniqueId = crypto.randomUUID();
      const updatedAt = Date.now();
      const value = await localforage.setItem<UserInputNetSalaryCalcData>(
        "netSalaryCalcInput",
        {
          ...data,
          id: uniqueId,
          updatedAt,
        }
      );

      return value || null;
    } catch (err) {
      return null;
    }
  },
});
