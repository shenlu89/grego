export const encodeBase64 = async (file: Blob) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  await new Promise<void>((resolve) => (fileReader.onload = () => resolve()));
  return fileReader.result;
};
