export const getData = (form: HTMLElement) => {
  const result = {};
  if (!form) {
    return result;
  }

  const elem = form.elements;
  for (let i = 0; i < elem.length; i++) {
    result[elem[i].name] = elem[i].value;
  }

  return result;
};
