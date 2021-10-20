export const getData = (form: HTMLFormElement) => {
  const result = {};
  if (!form) {
    return result;
  }

  // @ts-ignore
  return form.elements.map(
    (elem: HTMLFormElement, ind: string) => elem[ind].value
  );
};
