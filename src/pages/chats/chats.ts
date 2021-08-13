import { render } from "pug";
import Block from "../../utils/Block";
import PageModel from "../../constans/page.model";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Avatar } from "../../components/avatar";
import { Channel } from "../../components/channel";
import { Message } from "../../components/message";
import AuthApi from "../../api/authApi";
import ChatsApi from "../../api/chatsApi";
import UsersApi from "../../api/usersApi";
import { multiValidate } from "../../utils/validate";
import ChannelList from "../../components/channelList";
import ChatBody from "../../components/chatBody";
import WebSocketMessage from "../../api/webSocket";

const template: string = `
.home__container
  aside.chat-menu.menu
    .menu__container
      a.menu__profile(href="/settings") Профиль
      form.home-page__form-search.menu__search.search
        button.search__btn
        input.search__input(type="text", placeholder="Поиск")
      form.menu__add.home-page__form-add
        #addChatInput
        #buttonAddChat
      #channelList
  section.chat-messages.messages
      if !isShow
        span.messages__empty Выберите чат чтобы отправить сообщение;
      else
        .messages__container
            .messages__head
                .messages__avatar
                    #avatarHead
                .messages__btns
                    button.button.messages__btn(data-type="add") +
                    button.button.messages__btn(data-type="remove") -
                .messages__tooltip
                    input.messages__input(type="text" placeholder="Сообщение")
                    button.messages__submit.messages__submit-user
            #chatsBody
            .messages__footer
                button.messages__file
                input.messages__input(type="text" placeholder="Сообщение")
                button.messages__submit.messages__submit-send`;
export default class Chats extends Block {
  activeChat: {};
  usersChat: {};
  socketMessage: [];
  userId: number | null;
  typeEventUser: string;
  tooltip: HTMLElement | null;

  constructor(props: PageModel) {
    const addChatInput = new Input({
      theme: "login",
      label: "Название чата",
      id: "title",
      placeholder: "Добавить чат",
      name: "title",
      type: "text",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const buttonAddChat = new Button({
      text: "Добавить чат",
      classNames: ["button__add-chats", "menu__add"],
    });
    const avatarHead = new Avatar();
    const channelList = new ChannelList({
      getChats: () => this.getChats(),
      events: {
        chats: {
          eventName: "click",
          tagEvent: ".channel",
          callback: (e: Event) => {
            const id = Number(e.currentTarget.getAttribute("data-id"));
            this.activeChat.id = id;
            this.props.isShow = true;
            new ChatsApi()
              .getChatUsers(id)
              .then((data) => {
                const result = JSON.parse(data);
                result.forEach((user) => {
                  this.usersChat[`${user.id}`] = { ...user };
                });
              })
              .then(() => this.getChatToken(id))
              .then(({ token }) => {
                this.setHeaderChat();
                new WebSocketMessage(
                  this.userId,
                  this.activeChat.id,
                  token,
                  this.createMessageList.bind(this)
                );
              });
          },
        },
      },
    });
    const chatsBody = new ChatBody();
    super({
      tagName: "main",
      classNames: ["home", "main"],
      events: {
        showTooltip: {
          eventName: "click",
          tagEvent: ".messages__btn",
          callback: (e) => {
            /* Todo тут в попыхах делал по хорошему в отдельный компонент вынести и тултип и кнпоки */
            this.typeEventUser = e.currentTarget.getAttribute("data-type");
            this.tooltip = e.currentTarget
              .closest(".messages__head")
              ?.querySelector(".messages__tooltip");
            this.tooltip.classList.add("show");
          },
        },
        addUser: {
          eventName: "click",
          tagEvent: ".messages__submit-user",
          callback: (e) => {
            e.preventDefault();
            const input = e.currentTarget.previousSibling;
            const { value } = input;
            const { id } = this.activeChat;
            if (value.length > 0) {
              new UsersApi().searchUser(value).then((data) => {
                const result = JSON.parse(data);
                switch (this.typeEventUser) {
                  case "add":
                    new ChatsApi().addUsersChat(result[0].id, id).then(() => {
                      console.log("add user");
                    });
                    break;
                  case "remove":
                    new ChatsApi()
                      .deleteUsersChat(result[0].id, id)
                      .then(() => {
                        console.log("remove user");
                      });
                    break;
                  default:
                    console.log("значение не выбрано");
                }
              });

              this.tooltip?.classList.remove("show");
            }
          },
        },
        addChannel: {
          eventName: "submit",
          tagEvent: ".home-page__form-add",
          callback: (e) => {
            e.preventDefault();
            const isValid = multiValidate(e.target, "chats");
            if (isValid) {
              const data = new FormData(e.target);
              new ChatsApi().createChat(data).then(() => {
                this.getChats();
              });
            }
          },
        },
        search: {
          eventName: "submit",
          tagEvent: ".home-page__form-search",
          callback: (e) => {
            e.preventDefault();
            console.log("click add home-page__form-search");
          },
        },
        send: {
          eventName: "click",
          tagEvent: ".messages__submit-send",
          callback: (e) => {
            e.preventDefault();
            const input = e.currentTarget.previousSibling;
            const { value } = input;
            if (value.length > 0) {
              this.sendMessage(value);
            }
          },
        },
      },
      children: {
        buttonAddChat,
        addChatInput,
        channelList,
        chatsBody,
        avatarHead,
      },
      isShow: false,
      ...props,
    });
    this.typeEventUser = "";
    this.activeChat = {};
    this.tooltip = null;
    this.userId = null;
    this.usersChat = {};
    this.socketMessage = [];
  }

  getChatToken(id: number) {
    return new ChatsApi()
      .getChatUsersToken(id)
      .then((data) => JSON.parse(data))
      .catch((err) => {
        console.error(err);
      });
  }

  setHeaderChat() {
    const { avatarHead } = this.props.children;

    avatarHead.setProps({
      src: this.activeChat.avatar,
      text: this.activeChat.title,
    });
  }

  sendMessage(message: string) {
    new WebSocketMessage().send(message);
  }

  createMessageList(data: []) {
    const dataReverse = data.length > 1 ? data.reverse() : data;
    this.socketMessage = Array.isArray(dataReverse)
      ? dataReverse
      : [...this.socketMessage, dataReverse];
    const messagesList = {};

    this.socketMessage.forEach((message, index) => {
      const { content, is_read, time, user_id } = message;
      const date = new Date(time);

      /* ToDo вынести обработку даты в отдельную утилиту */
      const configMsg = {
        position: user_id === this.userId ? "your" : "their",
        message: content,
        time: `${date.getHours()}:${
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        }`,
        status: is_read,
      };
      messagesList[`message-${index}`] = new Message(configMsg);

      const { chatsBody } = this.props.children;

      chatsBody.setProps({
        children: { ...chatsBody.props.children, ...messagesList },
        countMessages: this.socketMessage.length,
      });
    });
  }

  getChats() {
    new ChatsApi().getChats().then((data) => {
      const result = JSON.parse(data);
      const channelCards = {};
      result.forEach((channel, index) => {
        this.activeChat = channel;
        const { last_message, avatar, title, unread_count, time, id } = channel;
        const date = new Date(time);

        const channelConfig = {
          id,
          name: title,
          lastMessage: last_message?.content,
          time: `${date.getHours()}:${
            date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
          }`,
          missed: unread_count,
          src: avatar,
          text: title,
        };
        channelCards[`channelCard-${index}`] = new Channel(channelConfig);
      });
      const { channelList } = this.props.children;
      channelList.setProps({
        children: { ...channelList.props.children, ...channelCards },
        countChannels: result.length,
      });
    });
  }

  componentDidMount() {
    new AuthApi()
      .getUserInfo()
      .then((data) => {
        const { id } = JSON.parse(data);
        this.userId = id;
        this.getChats();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render(): string {
    const { isShow } = this.props;
    return render(template, { isShow });
  }
}
