import localforage from "localforage";
import {
  UserInputNetSalaryCalc,
  UserInputNetSalaryCalcData,
} from "../domain/features/netSalaryCalculator/types";
import { appConfig } from "../domain/appConfig";

const NET_SALARY_CALC_STORAGE_KEY = "netSalaryCalc";

export const netSalaryCalcApi = () => {
  const findAll = async () => {
    try {
      const userInputs = localforage.getItem<UserInputNetSalaryCalcData[]>(
        NET_SALARY_CALC_STORAGE_KEY
      );

      return userInputs;
    } catch (error) {
      return null;
    }
  };

  return {
    create: async (
      data: UserInputNetSalaryCalc
    ): Promise<UserInputNetSalaryCalcData | null> => {
      try {
        let records = (await findAll()) || [];

        const uniqueId = crypto.randomUUID();
        const updatedAt = Date.now();
        const newUserInput = {
          ...data,
          id: uniqueId,
          updatedAt,
        };

        records.push(newUserInput);
        records = records.slice(
          appConfig.netSalaryCalc.userInputHistorySize * -1
        );

        const updatedRecords = await localforage.setItem<
          UserInputNetSalaryCalcData[]
        >(NET_SALARY_CALC_STORAGE_KEY, records);

        return updatedRecords && updatedRecords.length ? newUserInput : null;
      } catch (err) {
        return null;
      }
    },

    findId: async (id: string) => {
      try {
        const records = (await findAll()) || [];

        const userInput = records.find((it) => it.id === id) || null;

        return userInput;
      } catch (error) {
        return null;
      }
    },

    findAll,
  };
};
