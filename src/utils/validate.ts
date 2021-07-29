const checkValide = (pattern: string, value: string): boolean => {
  const result = pattern ? pattern.test(String(value).toLowerCase()) : value;
  return result;
};

export const validation = (value: string, type: string): boolean => {
  let pattern;
  switch (type) {
    case "password":
      pattern = /[A-Za-z0-9]{6,64}/;
      break;
    case "text":
      pattern = /^[A-zА-я]{1}[A-zА-я]{2,20}$/;
      break;
    case "email":
      pattern =
        /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      break;
    case "tel":
      pattern =
        /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;
      break;
    // No default
  }

  return checkValide(pattern, value);
};
