//navigate가 React Component에서 사용가능한 hook이라 함수 취급이 안되나..ㅠ
import { useNavigate } from "react-router-dom";

export const CheckAuthAndNavigateLogin = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("Authorization");
  if (!token) {
    navigate("/login");
  }
};
