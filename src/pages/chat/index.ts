import "../chat/chat.scss";
import Chat from "./chat";
import { Avatar } from "../../components/avatar";
import { Channel } from "../../components/channel";
import { Message } from "../../components/message";

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
/* eslint-disable no-new */
new Chat({
  template,
  children: {
    channel1: new Channel({
      name: "Клуб",
      lastMessage: "Проверяю всякую чушь",
      time: "11-45",
      missed: "3",
      avatarId: "1",
      avatarSrc:
        "https://i.pinimg.com/originals/9a/23/45/9a2345280c836c94a056f96459a52b0c.jpg",
    }).getContent(),
    channel2: new Channel({
      name: "Клуб",
      lastMessage: "Проверяю всякую чушь",
      time: "11-45",
      missed: "3",
      avatarId: "1",
      avatarSrc:
        "https://i.pinimg.com/originals/9a/23/45/9a2345280c836c94a056f96459a52b0c.jpg",
    }).getContent(),
    channel3: new Channel({
      name: "Клуб",
      lastMessage: "Проверяю всякую чушь",
      time: "11-45",
      missed: "3",
      avatarId: "1",
      avatarSrc:
        "https://i.pinimg.com/originals/9a/23/45/9a2345280c836c94a056f96459a52b0c.jpg",
    }).getContent(),
    message1: new Message({
      position: "their",
      message: "Text text text text text tet text text",
      time: "11-45",
      status: "uncheck",
    }).getContent(),
    message2: new Message({
      position: "their",
      message: "Text text text text text tet text text",
      time: "11-45",
      status: "uncheck",
    }).getContent(),
    message3: new Message({
      position: "your",
      message: "Text text text text text tet text text",
      time: "11-45",
      status: "check",
    }).getContent(),
    avatarChannel: new Avatar({
      id: "2",
      src: "https://i.pinimg.com/originals/9a/23/45/9a2345280c836c94a056f96459a52b0c.jpg",
    }).getContent(),
  },
});
