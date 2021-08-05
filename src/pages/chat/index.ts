import "../chat/chat.scss";
import Chat from "./chat";
import { Avatar } from "../../components/avatar";
import { Channel } from "../../components/channel";
import { Message } from "../../components/message";

const chat = new Chat({
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

const element = document.getElementById("home");
element?.appendChild(chat.getContent());
