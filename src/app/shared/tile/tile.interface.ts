export interface IOptions {
  style: Object;
  header: HeaderOptions;
}
export class HeaderBorder {
  public color: string;
  constructor(color: string = '#c9c9c9') {
    this.color = color;
  }
}
export class HeaderPadding {
  top = '10px';
  left = '10px';
  right = '10px';
  bottom = '10px';
  constructor(padding = {top: '10px', left: '10px', right: '10px', bottom: '10px'}) {
    this.top = padding.top;
    this.left = padding.left;
    this.right = padding.right;
    this.bottom = padding.bottom;
  }
}
export class HeaderOptions {
  text:  string;
  padding: HeaderPadding;
  border: HeaderBorder;
  constructor(border: HeaderBorder = new HeaderBorder(), padding: HeaderPadding = new HeaderPadding()) {
    this.border = new HeaderBorder(border.color);
    this.padding = new HeaderPadding(padding);
  }
}
export interface IHeaderOptions {
  'padding-top'?: string;
  'padding-bottom'?: string;
  'padding-left'?: string;
  'padding-right'?: string;
  'border-color'?: string;
}
export class Options {
  style: {};
  header: HeaderOptions;
  constructor(
    header: HeaderOptions = new HeaderOptions()) {
    this.header = new HeaderOptions(header.border, header.padding);
  }
}
