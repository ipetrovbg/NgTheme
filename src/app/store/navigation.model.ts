export class NavigationItem {
  public name: string;
  public state: boolean;
}

export class NavigationStore {
  data: Array<NavigationItem>;
  fullScreen: boolean;
}
