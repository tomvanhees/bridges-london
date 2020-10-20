import {
  WarningItemInterface,
  WarningItemResponseInterface
} from "@/classes/Warnings/WarningItem.interface";

export class WarningItem implements WarningItemInterface {
  generalInfo: string;
  title: string;

  constructor(item: WarningItemResponseInterface) {
    this.title = item.title;
    this.generalInfo = item.general_info;
  }
}
