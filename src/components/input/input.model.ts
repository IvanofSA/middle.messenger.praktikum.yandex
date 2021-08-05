export default interface InputModel {
  theme?: "profile" | "login";
  type?: "password" | "email" | "text" | "tel";
  status?: "success" | "error";
  label?: string;
  events?: {};
  placeholder?: string;
  classNames?: Array<string>;
  name?: string;
  value?: string;
  id?: string;
  error?: string;
  disabled?: boolean;
}
