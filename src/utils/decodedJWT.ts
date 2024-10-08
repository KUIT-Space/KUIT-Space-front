/** JWT가 있으면 복호화해서 userId 찾는 함수
 * decodedJWT().userId 로 사용 가능
 * @returns if null, jwt 없음
 */
export const decodedJWT = (): { exp: number; iat: number; userId: number } | null => {
  let token = localStorage.getItem("Authorization");
  if (!token) return null;

  token = token.replace("Bearer ", "");
  const base64Payload = token.split(".")[1];
  const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");

  const decodedJWT = JSON.parse(
    decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    ),
  );
  return decodedJWT;
};
