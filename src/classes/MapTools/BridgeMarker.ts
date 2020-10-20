import { Bridge } from "@/classes/Bridge";
import { IconsService } from "@/service/IconsService";

export class BridgeMarker {
  bridge: Bridge;

  constructor(bridge: Bridge) {
    this.bridge = bridge;
  }

  public process(): HTMLElement {
    let container = `<section class="bridge-element-container" >`;
    container += this.createUtilities();
    container += this.createBridgeName();
    container += `</section>`;

    const el = document.createElement("div");
    el.innerHTML = container;
    return el.firstChild as HTMLElement;
  }

  private createUtilities() {
    let container = `<div class="utility-container">`;

    for (const [key, value] of Object.entries(
      this.bridge.bridgeServicesAndState
    )) {
      container += this.createUtility(key, value);
    }

    container += `</div>`;
    return container;
  }

  private createUtility(
    key: string,
    value: Array<{ id: number; name: string }>
  ) {
    let container = `<div class="utility-item">`;
    container += `<figure><img src="${IconsService.serviceIcon(
      key + "_BLUE"
    )} " alt="${key}"></figure>`;
    container += `<div class="state-container">`;
    value.forEach(item => {
      container += `<figure><img src="${IconsService.StateIcon(
        item.name
      )}" alt="${item.name}"></figure>`;
    });
    container += `</div></div>`;

    return container;
  }

  private createBridgeName() {
    return `<div class="bridge-name" id="bridge_${this.bridge.id}">${this.bridge.name}</div>`;
  }
}
