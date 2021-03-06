import EventBus from "../EventBus";
type Props = {
  children?: object;
  tagName?: string;
  classNames?: Array<string>;
  attribute?: Record<string, string>;
  events?: Record<string, Function>;
  [key: string]: unknown | object;
};

export default abstract class Block {
  props: Props;

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  protected _element: HTMLElement;

  private _meta: Props;

  eventBus: EventBus;

  constructor(props = {}) {
    this._meta = props;
    this.props = this._makePropsProxy(props);
    this.eventBus = new EventBus();

    this._registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents() {
    this.eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const {
      tagName = "template",
      classNames = [],
      attribute = {},
    } = this._meta;
    this._element = this._createDocumentElement(tagName, classNames, attribute);
  }

  init(): void {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {
    return this.element as HTMLElement;
  }

  private _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
    if (oldProps === newProps) {
      return false;
    }

    return true;
  }

  public setProps = (nextProps: Record<string, unknown>): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus.emit(Block.EVENTS.FLOW_CDU);
  };

  get element() {
    return this._element;
  }

  private _render() {
    this._removeEvents();
    const block = this.render();
    const { children, tagName } = this.props;
    this._element.innerHTML = block;

    if (Boolean(this._element.content) && tagName === "template") {
      this._element = this._element.content.cloneNode(true)
        .firstChild as HTMLElement;
    }

    if (children) {
      Object.keys(children).forEach((key) => {
        const _id = `#${key}`;
        const template = this._element.querySelector(_id);
        template?.replaceWith(children[key].getContent());
      });
    }

    this._addEvents();
  }

  render(): string {
    return "";
  }

  getContent() {
    return this.element as HTMLElement;
  }

  private _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((name) => {
      const { eventName, tagEvent, callback } = events[name];
      const inputElement = this._element.querySelectorAll(tagEvent);
      if (inputElement.length) {
        inputElement.forEach((el) => {
          el?.addEventListener(eventName, callback);
        });
      } else if (this._element.className.indexOf(tagEvent) !== -1) {
        this._element.addEventListener(eventName, callback);
      }
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      const { tagEvent, callback } = events[eventName];
      const inputElement = this._element.querySelector(tagEvent);
      inputElement?.removeEventListener(eventName, callback);
    });
  }

  private _makePropsProxy(props) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const result = target[prop];
        return typeof result === "function" ? result.bind(target) : result;
      },
      set(target, prop, value) {
        target[prop] = value;
        self.eventBus.emit(Block.EVENTS.FLOW_CDU, target);
        return true;
      },
      deleteProperty() {
        throw new Error("?????? ??????????????");
      },
    });
  }

  private _createDocumentElement(
    tagName: string,
    classNames: Array<string>,
    attribute: Record<string, string>
  ): HTMLElement {
    const el = document.createElement(tagName);
    if (attribute) {
      Object.keys(attribute).forEach((attr) => {
        el.setAttribute(attr, attribute[attr]);
      });
    }

    if (classNames.length) {
      classNames.forEach((className: string): void => {
        el.classList.add(className);
      });
    }

    return el;
  }

  show(query: string) {
    const root = document.querySelector(query);
    root?.append(this.element);
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  hide() {
    this.element?.remove();
  }
}
