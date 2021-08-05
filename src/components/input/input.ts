import { compile } from "pug";
import Block from "../../utils/Block";
import "./input.scss";
import InputModel from "./input.model";
import { validation } from "../../utils/validate";
const template: string = `
.input-component(class="input-component_"+theme+" "+status)
   input(id=id name=name type=type placeholder=placeholder value=value disabled=disabled).input-component__input 
   label(for=id).input-component__label=label
   span.input-component__message=error`;

export default class Input extends Block {
  constructor(props: InputModel) {
    const events = {
      blur: {
        tagEvent: "input",
        callback: (e: Event) => {
          const element = e.target as HTMLInputElement;
          this.props.value = element.value;
          const { messageError, value } = validation(element);
          if (value) {
            this.setProps({
              status: "success",
            });
          } else {
            this.setProps({
              status: "error",
              error: messageError,
            });
          }
        },
      },
      focus: {
        tagEvent: "input",
        callback: () => {},
      },
    };
    super({
      ...props,
      tagName: "div",
      classNames: ["input-component__box"],
      events,
    });
  }

  render(): string {
    return compile(template)(this.props);
  }
}
