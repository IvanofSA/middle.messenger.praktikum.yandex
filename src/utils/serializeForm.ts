export const serializeForm = function (formData) {
  const obj = {};
  for (const key of formData.keys()) {
    obj[key] = formData.get(key);
  }

  return obj;
};
