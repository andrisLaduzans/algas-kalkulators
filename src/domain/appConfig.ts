type AppConfig = {
  netSalaryCalc: {
    /**
     * Regulates how many form input data entries app stores
     */
    userInputHistorySize: number;
  };
};

export const appConfig: AppConfig = {
  netSalaryCalc: {
    userInputHistorySize: 10,
  },
};

const validateAppConfig = (appConfig: AppConfig) => {
  if (appConfig.netSalaryCalc.userInputHistorySize < 0) {
    (): never => {
      throw new Error(
        "Invalid app config: appConfig.netSalaryCalc.userInputHistorySize must be non-negative integer"
      );
    };
  }
};

export const initAppConfig = () => {
  validateAppConfig(appConfig);
};
