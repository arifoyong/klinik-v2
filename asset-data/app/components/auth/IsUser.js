import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from '../../utils/auth'

const IsUser = ({ children }) => {
  useEffect(() => {
    const user = isAuth()

    if (!user || (user.role !== 'user' && user.role !== 'admin')) {
      Router.push(`/auth/signin`);
    }
  }, []);

  return <>{children}</>;
};

export default IsUser;