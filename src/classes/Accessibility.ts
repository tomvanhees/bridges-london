interface AccessibilityInterface {
  readonly id: number;
  readonly name: string;
  readonly possible: boolean;
}

export class Accessibility implements AccessibilityInterface {
  readonly id: number;
  readonly name: string;
  readonly possible: boolean;

  constructor(id: number, name: string, possible: boolean) {
    this.id = id;
    this.name = name;
    this.possible = possible;
  }
}
