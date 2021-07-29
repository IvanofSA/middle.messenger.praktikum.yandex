export default interface Chat {
  template: string;
  children?: { [key: string]: HTMLElement };
}
