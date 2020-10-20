export interface ConnectionEndInterface {
  readonly id: number;
  readonly shore: ShoreInterface;
  readonly long: number;
  readonly lat: number;
  readonly image_url: string;
  readonly services: ServiceInterface[];
}

interface ShoreInterface {
  readonly id: number;
  readonly name: string;
  readonly short_name: string;
}

interface ServiceInterface {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly current_info: string;
  readonly type: ServiceTypeInterface;
  readonly state: ServiceStateInterface;
}

interface ServiceTypeInterface {
  readonly id: number;
  readonly name: string;
  readonly icon_url: string;
}

interface ServiceStateInterface {
  readonly id: number;
  readonly name: string;
  readonly icon_url: string;
}
