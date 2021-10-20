export const serializeForm = (formData: { keys(): any }) => {
  const obj = {};
  for (const key of formData.keys()) {
    // @ts-ignore
    obj[key] = formData.get(key);
  }

  return obj;
};
