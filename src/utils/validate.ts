const checkValide = (pattern: string, value: string): boolean => {
  const result = pattern ? pattern.test(String(value).toLowerCase()) : value;
  return result;
};

export const validation = (element: HTMLElement) => {
  const { type, value } = element;
  let pattern;
  switch (type) {
    case "password":
      pattern = /[A-Za-z0-9]{6,64}/;
      return {
        value: checkValide(pattern, value),
        messageError: "какая то ошибка",
      };
    case "text":
      pattern = /^[A-zА-я]{1}[A-zА-я]{2,20}$/;
      return {
        value: checkValide(pattern, value),
        messageError: "какая то ошибка",
      };
    case "email":
      pattern =
        /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return {
        value: checkValide(pattern, value),
        messageError: "какая то ошибка",
      };
    case "tel":
      pattern =
        /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;
      return {
        value: checkValide(pattern, value),
        messageError: "какая то ошибка",
      };
    // No default
  }
};

export const checkPasswords = (password: string, passwordRepeat: string) =>
  password === passwordRepeat;

const getInputs = (form: HTMLFormElement) =>
  Array.from(form.elements).filter((el) => el.tagName !== "BUTTON");

const validInputs = (inputs) => {
  let result = {};
  inputs.forEach((input) => {
    result[input.name] = validation(input);
  });
  return result;
}

const setErrors = (form, valids): void => {
  for(let key in valids) {
    const parent = form[key].parentNode;
    const message = parent.querySelector('.input-component__message')
    if(!valids[key].value){
      message.textContent = valids[key].messageError;
      parent.classList.add('error')
    } else {
      parent.classList.remove('error')
    }
  }
}

const checkValid = (valids) => {
  let result = true;
  for(let key in valids) {
    if(!valids[key].value) {
      result = false
    }
  }
  return result;
}

export const multiValidate = (form: HTMLFormElement, page: string) => {
  const inputs = getInputs(form);
  let isValids = validInputs(inputs);
  switch (page) {
    case "passwords": {
      const password: string = form.password.value;
      const passwordRepeat: string = form.passwordRepeat.value;
      if (password && passwordRepeat) {
        const error = checkPasswords(password, passwordRepeat);
        isValids = {
          ...isValids,
          passwordRepeat: { value: error, messageError: "Пароли не совпадают" },
        };
      }
      break;
    }
    default:
  }
  setErrors(form, isValids);
  return checkValid(isValids);
};
