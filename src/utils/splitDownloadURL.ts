export const splitDownloadURL = (url: string) => {
  const urlObj = new URL(url);
  const relativePath = urlObj.pathname;

  //console.log(relativePath);

  return relativePath;
};
