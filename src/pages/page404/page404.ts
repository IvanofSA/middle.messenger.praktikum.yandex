import { compile } from "pug";
import Block from "../../utils/Block/Block";
import PageModel from "../../constans/page.model";

const template: string = `
h1.error__title 404
p.error__description Не туда попали
a.error__link.link(href="/messenger") Назад к чатам`;

const compileTemplate = compile(template);

export default class Page404 extends Block {
  constructor(props: PageModel) {
    super({
      tagName: "main",
      classNames: ["error", "main"],
      ...props,
    });
  }

  render(): string {
    return compileTemplate(this.props);
  }
}
