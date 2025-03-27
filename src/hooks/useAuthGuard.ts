import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthQuery } from "../apis/oauth";

export const useAuthGuard = (options?: { redirectTo?: string }) => {
  const navigate = useNavigate();
  const { data: isAuthenticated } = useAuthQuery();
  const redirectTo = options?.redirectTo || "/discordlogin";
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo, location.pathname]);

  return { isAuthenticated };
};
