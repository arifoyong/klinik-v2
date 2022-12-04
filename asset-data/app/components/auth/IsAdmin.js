import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from '../../utils/auth'

const IsAdmin = ({ children }) => {
  useEffect(() => {
    const user = isAuth()

    if (!user || user.role !== 'admin') {
      Router.push(`/auth/signin`);
    }
  }, []);

  return <>{children}</>;
};

export default IsAdmin;