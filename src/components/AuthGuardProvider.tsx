import React from "react";

import { useAuthGuard } from "@/hooks/useAuthGuard";

interface AuthGuardProviderProps extends React.PropsWithChildren {
  redirectTo?: string;
}

export default function AuthGuardProvider({ children, redirectTo }: AuthGuardProviderProps) {
  useAuthGuard({ redirectTo });

  return <>{children}</>;
}
