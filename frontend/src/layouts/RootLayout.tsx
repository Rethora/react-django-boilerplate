import { Outlet } from "react-router-dom";
import { useVerifyTokenQuery } from "../services/auth/api";

const RootLayout = () => {
  const { isLoading } = useVerifyTokenQuery(undefined, {
    skip: !localStorage.getItem("access"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default RootLayout;
