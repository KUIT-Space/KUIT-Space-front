export const formattedDateTime_convertUTC9 = (isoString: string, isUtc9?: boolean): string => {
  const date = new Date(isoString);

  // UTC+9로 시간 변환
  const utc9Date = isUtc9
    ? new Date(date.getTime() + 9 * 60 * 60 * 1000)
    : new Date(date.getTime());

  // 날짜 부분 변환 (yy.mm.dd)
  const datePart = utc9Date
    .toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");

  // 시간 부분 (AM/PM hh:mm)
  const timePart = utc9Date
    .toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\s/g, " ");

  return `${datePart} ${timePart}`;
};
