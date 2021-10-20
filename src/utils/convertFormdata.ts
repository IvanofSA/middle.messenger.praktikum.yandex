export default function convertFormData(formData: Record<string, any>) {
  const result = {} as Record<string, string>;
  formData.forEach((value: string, key: string) => {
    result[key] = value;
  });

  return result;
}
