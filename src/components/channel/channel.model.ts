export default interface ChannelModel {
  name?: string;
  lastMessage?: string;
  time?: string;
  missed?: string;
  avatarId?: string;
  avatarSrc?: string;
  avatarName?: string;
  classNames?: Array<string>;
  children?: { [key: string]: HTMLElement };
  events?: {};
}
