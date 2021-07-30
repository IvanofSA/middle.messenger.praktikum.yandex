import { compile } from "pug";
import Block from "../../utils/block";
import SignUpModel from "./signup.model";
import { getData } from "../../utils/getData";
export default class SignUp extends Block {
  _formElement: HTMLFormElement;
  _node: HTMLInputElement;
  constructor(props: SignUpModel) {
    const events = {
      submit: {
        tagEvent: "form",
        callback: (e) => {
          e.preventDefault();
          const data = getData(e.target);
          this._initValidationOnSubmit(e.target);
        },
      },
    };
    super({
      tagName: "div",
      classNames: ["login__container"],
      ...props,
      events,
    });
  }

  _registerEvents(): void {
    // @ts-ignore
    console.log('tut')
    // @ts-ignore
    super._registerEvents()
    // const { props } = this._meta
    if (true) this.initValidationEvents()
  }
  initValidationEvents(): void {
    // this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._initValidationElements.bind(this))
    // this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._initValidationListners.bind(this))
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._initValidationOnSubmit.bind(this))
  }
  // _getRequiredElement(selector: string): HTMLElement {
  //   const element = this._element.querySelector(selector)
  //   if (element === null) throw new Error(`no ${selector} required element`)
  //   return element as HTMLElement
  // }
  // _initValidationElements(): void {
  //   this._node = this._getRequiredElement('.input-component__input') as HTMLInputElement
  // }
  // _initValidationListners(): void {
  //   this._node.addEventListener('focus', () => {
  //     this._node.addEventListener('focus', this._validate.bind(this))
  //   }, { once: true })
  //   this._node.addEventListener('blur', this._validate.bind(this))
  // }

  _initValidationOnSubmit(form): void {
    console.log(form);
  }

  _validate(e): void {
    e.preventDefault();
    console.log('hui')
  }


  componentDidMount(): HTMLElement {
    const element = document.getElementById("reg");
    element?.appendChild(this.getContent());
    return element as HTMLElement;
  }

  render(): string {
    const { template } = this.props;
    return compile(template)(this.props);
  }
}
