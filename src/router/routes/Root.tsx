import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { initAppConfig } from "../../domain/appConfig";
import { MainLayout } from "../../components/layout/MainLayout";
import { NavBar } from "../../components/layout/NavBar";
import { MainFooter } from "../../components/layout/MainFooter";

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

  return (
    <MainLayout headerNode={<NavBar />} footerNode={<MainFooter />}>
      <Outlet />
    </MainLayout>
  );
};
