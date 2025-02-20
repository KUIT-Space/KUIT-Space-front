import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { discordLoginApi } from "@/apis";

const DiscordRedirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get("code");
    discordLoginApi(code ?? "").then((res) => {
      console.log(res);
      if (res.status === "OK") {
        navigate("/space");
      } else {
        alert("login 실패! : " + res.message);
        navigate("/login");
      }
    });
  }, [navigate]);

  return <div>discord 로그인 중...</div>;
};

export default DiscordRedirection;
