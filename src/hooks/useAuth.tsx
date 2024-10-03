import { useEffect, useState } from "react";

/** 현재 로그인 상태 확인 hook
 *
 */
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 실제 로그인 상태를 확인 / TODO : refresh token??
    const token = localStorage.getItem("Authorization");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
};

export default useAuth;
