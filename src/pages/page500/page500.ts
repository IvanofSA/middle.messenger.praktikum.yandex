import { compile } from "pug";
import Block from "../../utils/Block/Block";
import PageModel from "../../constans/page.model";

const template: string = `
h1.error__title 500
p.error__description Мы уже фиксим
a.error__link.link(href="/messenger") Назад к чатам`;

export default class Page500 extends Block {
  constructor(props: PageModel) {
    super({
      tagName: "main",
      classNames: ["error", "main"],
      ...props,
    });
  }

  render(): string {
    return compile(template)(this.props);
  }
}
