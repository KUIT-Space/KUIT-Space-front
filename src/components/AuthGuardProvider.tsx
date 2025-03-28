import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthQuery } from "@/apis/oauth";

interface AuthGuardProviderProps extends React.PropsWithChildren {
  options?: { redirectTo?: string };
}

export default function AuthGuardProvider({ children, options }: AuthGuardProviderProps) {
  const navigate = useNavigate();
  const { data: isAuthenticated } = useAuthQuery();
  const redirectTo = options?.redirectTo || "/discordlogin";
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo, location.pathname]);

  return <>{children}</>;
}
