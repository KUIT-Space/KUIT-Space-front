import React from "react";
import ReactDOMServer from "react-dom/server";

// SVG 컴포넌트를 문자열로 변환하고 이를 File 객체로 만드는 함수
export function svgComponentToFile(
  SvgComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
): File {
  // 1. SVG 컴포넌트를 문자열로 변환
  const svgString = ReactDOMServer.renderToStaticMarkup(<SvgComponent />);

  // 2. 문자열을 Blob으로 변환
  const blob = new Blob([svgString], { type: "image/svg+xml" });

  // 3. Blob을 File 객체로 변환
  const file = new File([blob], `image.svg`, { type: "image/svg+xml" });

  return file;
}
