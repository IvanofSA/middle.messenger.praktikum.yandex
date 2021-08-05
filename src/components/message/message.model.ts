export default interface MessageModel {
  position?: "their" | "your";
  message: string;
  time: string;
  status?: "check" | "uncheck";
}
