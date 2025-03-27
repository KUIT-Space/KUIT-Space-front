import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthQuery } from "../apis/oauth";

export const useAuthRedirect = (options?: { redirectTo?: string }) => {
  const navigate = useNavigate();
  const { data: isAuthenticated } = useAuthQuery();
  const redirectTo = options?.redirectTo || "/discordlogin";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return { isAuthenticated };
};
