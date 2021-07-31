import { compile } from "pug";
import Block from "../../utils/Block";
import PageModel from "../../constans/page.model";

const template: string = `
aside.chat-menu.menu
    .menu__container
        a.menu__profile(href="../profile/index.pug") Профиль
        .menu__search.search
            button.search__btn
            input.search__input(type="text", placeholder="Поиск")
        ul.menu__list
           li.menu__item 
                #channel1
           li.menu__item 
                #channel2
           li.menu__item 
                #channel3
main.chat-messages.messages
        .messages__container
                .messages__head
                        .messages__avatar
                                #avatarChannel
                .messages__body
                        #message1
                        #message2
                        #message3
                .messages__footer
                        button.messages__file
                        input.messages__input(type="text" placeholder="Сообщение")
                        buttom.messages__submit
        `;

export default class Chat extends Block {
  constructor(props: PageModel) {
    super({ tagName: "div", classNames: ["home__container"], ...props });
  }

  render(): string {
    return compile(template)(this.props);
  }
}
