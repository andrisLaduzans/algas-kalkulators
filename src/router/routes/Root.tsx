import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { initAppConfig } from "../../domain/appConfig";

export const Root = () => {
  const [isBootstrapped, setIsBootstrapped] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      initAppConfig();

      setIsBootstrapped(true);
    })();
  }, []);

  if (!isBootstrapped) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};
