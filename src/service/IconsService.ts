enum Services {
  LIFT = require("../assets/images/lift.svg"),
  ROLTRAP = require("../assets/images/escalator.svg"),
  LIFT_BLUE = require("../assets/images/lift_blue.svg"),
  ROLTRAP_BLUE = require("../assets/images/escalator_blue.svg")
}

enum State {
  ACTIEF = require("@/assets/images/icon_on.svg"),
  INACTIEF = require("@/assets/images/icon_off.svg")
}

enum Accessebility {
  WALK = require("@/assets/images/acc_walk.svg"),
  WHEELCHAIR = require("@/assets/images/acc_weelchair.svg"),
  BIKE = require("@/assets/images/acc_bike.svg"),
  CARGO_BIKE = require("@/assets/images/acc_bakfiets.svg"),
  MOPED = require("@/assets/images/acc_scooter.svg")
}

enum Icons {
  ANGLE_UP = require("@/assets/images/angle-up-solid.svg"),
  ANGLE_DOWN = require("@/assets/images/angle-down-solid.svg"),
  ANGLE_RIGHT = require("@/assets/images/angle-right-solid.svg"),
  INFO = require("@/assets/images/icon_info.svg"),
  WARNING = require("@/assets/images/icon_warning.svg")
}

export class IconsService {
  static readonly Services: any = Services;
  static readonly State: any = State;
  static readonly Accessebility: any = Accessebility;
  static readonly Icons: any = Icons;

  static serviceIcon(serviceName: string): string {
    return IconsService.Services[IconsService.sanatizeName(serviceName)];
  }

  static StateIcon(stateName: string): string {
    return IconsService.State[IconsService.sanatizeName(stateName)];
  }

  static accessebilityIcon(iconName: string): string {
    return IconsService.Accessebility[IconsService.sanatizeName(iconName)];
  }

  static icons(iconName: string): string {
    return IconsService.Icons[iconName];
  }

  static sanatizeName(name: string): string {
    let sanatizedName = name.replace("-", "_");
    sanatizedName = sanatizedName.replace(" ", "");

    return sanatizedName.toUpperCase();
  }
}
