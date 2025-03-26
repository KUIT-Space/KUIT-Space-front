import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

export const useAuthRedirect = (options?: { redirectTo?: string; skipIfLoading?: boolean }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  const redirectTo = options?.redirectTo || "/discordlogin";
  const skipIfLoading = options?.skipIfLoading !== false;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isLoading && skipIfLoading) {
      return;
    }

    if (!isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo, skipIfLoading]);

  return { isAuthenticated, isLoading };
};
