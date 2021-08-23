export default interface PageModel {
  tag?: string;
  title?: string;
  classNames?: Array<string>;
  children?: { [key: string]: HTMLElement };
}
