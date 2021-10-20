import { render } from "pug";
import Block from "../../utils/Block/Block";
import PageModel from "../../constans/page.model";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Avatar } from "../../components/avatar";
import { Channel } from "../../components/channel";
import { Message } from "../../components/message";
import { authAPI } from "../../api/authApi";
import { chatsAPI } from "../../api/chatsApi";
import { usersAPI } from "../../api/usersApi";
import { multiValidate } from "../../utils/validate";
import ChannelList from "../../components/channelList";
import ChatBody from "../../components/chatbody";
import WebSocketMessage from "../../api/webSocket";

const template: string = `
.home__container
  aside.chat-menu.menu
    .menu__container
      a.menu__profile(href="/settings") Профиль
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
                input.messages__input(type="text" placeholder="Сообщение")
                button.messages__submit.messages__submit-send`;
export default class Chats extends Block {
  activeChat: Record<string, any>;
  usersChat: Record<string, any>;
  socketMessage: Record<string, string | number>[];
  userId: number | null;
  typeEventUser: string | undefined;
  tooltip: HTMLElement | null | undefined;
  chats: [];

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
            const target = e.currentTarget as HTMLElement;
            const id = Number(target.dataset.id);
            this.props.isShow = true;
            chatsAPI
              .getChatUsers(id)
              .then((payload) => {
                const users = payload as [];
                users.forEach((user: Record<string, any>) => {
                  this.usersChat[`${user.id}`] = { ...user };
                });
              })
              .then(() => this.getChatToken(id))
              .then(({ token }: any) => {
                this.setHeaderChat(id);
                /* eslint-disable no-new */
                new WebSocketMessage(
                  this.createMessageList.bind(this),
                  this.userId,
                  id,
                  token
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
          callback: (e: Event) => {
            const element = e.currentTarget as HTMLElement;
            this.typeEventUser = element.dataset.type;
            this.tooltip = element
              .closest(".messages__head")
              ?.querySelector(".messages__tooltip");
            this.tooltip?.classList.add("show");
          },
        },
        addUser: {
          eventName: "click",
          tagEvent: ".messages__submit-user",
          callback: (e: Event) => {
            e.preventDefault();
            const element = e.currentTarget as HTMLInputElement;

            const input = element.previousSibling as HTMLInputElement;
            const { value } = input;
            const { id } = this.activeChat;
            if (value.length > 0) {
              usersAPI
                .searchUser(value)
                .then((payload) => {
                  const users = payload as Record<string, any>;
                  switch (this.typeEventUser) {
                    case "add":
                      chatsAPI
                        .addUsersChat(users[0].id, id)
                        .then()
                        .catch((err) => {
                          console.error(err);
                        });
                      break;
                    case "remove":
                      chatsAPI
                        .deleteUsersChat(users[0].id, id)
                        .then()
                        .catch((err) => {
                          console.error(err);
                        });
                      break;
                    default:
                      console.log("значение не выбрано");
                  }
                })
                .catch((err) => {
                  console.error(err);
                });

              this.tooltip?.classList.remove("show");
            }
          },
        },
        submit: {
          eventName: "submit",
          tagEvent: ".home-page__form-add",
          callback: (e: Event) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            const isValid = multiValidate(target, "chats");
            if (isValid) {
              const data = new FormData(target);
              chatsAPI
                .createChat(data)
                .then(() => {
                  this.getChats();
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          },
        },
        search: {
          eventName: "submit",
          tagEvent: ".home-page__form-search",
          callback: (e: Event) => {
            e.preventDefault();
          },
        },
        send: {
          eventName: "click",
          tagEvent: ".messages__submit-send",
          callback: (e: Event) => {
            e.preventDefault();
            const element = e.target as HTMLInputElement;
            const input = element.previousSibling as HTMLInputElement;
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
    this.chats = [];
    this.usersChat = {};
    this.socketMessage = [];
  }

  getChatToken(id: number) {
    return chatsAPI
      .getChatUsersToken(id)
      .then()
      .catch((err) => {
        console.error(err);
      });
  }

  setHeaderChat(id: string | number) {
    const { avatar, title } = this.chats.filter(
      (chat: { [key: string]: any }) => chat.id === id
    )[0];

    this.props.children?.avatarHead.setProps({
      src: avatar,
      text: title,
    });
  }

  sendMessage(message: string) {
    new WebSocketMessage(this.createMessageList.bind(this)).send(message);
  }

  createMessageList(data: []) {
    const dataReverse = data.length > 1 ? data.reverse() : data;
    this.socketMessage = Array.isArray(dataReverse)
      ? dataReverse
      : [...this.socketMessage, dataReverse];
    const messagesList: Record<string, Block> = {};

    this.socketMessage.forEach((message, index) => {
      const { content, is_read, time, user_id } = message;
      const date = new Date(time);

      /* ToDo вынести обработку даты в отдельную утилиту */
      const configMsg = {
        message: content,
        time: `${date.getHours()}:${
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        }`,
        status: is_read,
        position: user_id === this.userId ? "your" : "their",
      };
      messagesList[`message-${index}`] = new Message(configMsg);

      const { chatsBody } = this.props.children as Record<string, Block>;

      chatsBody.setProps({
        children: { ...chatsBody.props.children, ...messagesList },
        countMessages: this.socketMessage.length,
      });
    });
  }

  getChats() {
    chatsAPI
      .getChats()
      .then((payload: {}) => {
        const channels = payload as [];
        this.chats = [...channels];
        const channelCards: Record<string, Block> = {};
        channels.forEach((channel, index) => {
          this.activeChat = channel;
          const {
            last_message,
            avatar,
            title,
            unread_count,
            id,
          }: {
            last_message: { [key: string]: any };
            avatar: string;
            title: string;
            unread_count: string;
            id: string;
          } = channel;
          const date = new Date(last_message?.time);
          const channelConfig = {
            id,
            name: title,
            lastMessage: last_message?.content,
            time: `${date.getHours()}:${
              date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes()
            }`,
            missed: unread_count,
            src: avatar,
            text: title,
          };
          channelCards[`channelCard-${index}`] = new Channel(channelConfig);
        });

        const { channelList } = this.props.children as Record<string, Block>;
        channelList.setProps({
          children: { ...channelList.props.children, ...channelCards },
          countChannels: channels.length,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    authAPI
      .getUserInfo()
      .then((payload) => {
        // @ts-ignore
        const { id } = payload;
        this.userId = id;
        this.getChats();

        console.log("tut");
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
