import Block from "../Block";

export class Route {
  _pathname: string;
  _blockClass: Block;
  _block: Block | null;
  _props: { [key: string]: unknown };

  constructor(
    pathname: string,
    view: Block,
    props: { [key: string]: unknown }
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;

    console.log(this._props, "this._props");
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass();
      this._block.show(this._props.rootQuery);
      return;
    }

    this._block.show(this._props.rootQuery);
  }
}
