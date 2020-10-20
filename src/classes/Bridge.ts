import { ConnectionEndInterface } from "@/classes/ConnectionEnd.interface";
import {
  BrideInterface,
  BrideResponseInterface,
  BridgeAndServicesInterface
} from "@/classes/Bridge.interface";
import { MapBoxGlMap } from "@/classes/MapBoxGlMap";

export class Bridge implements BrideInterface {
  readonly connectionEnds: ConnectionEndInterface[];
  readonly currentInfo: string;
  readonly id: number;
  readonly lat: number;
  readonly long: number;
  readonly name: string;
  readonly stateId: number;
  readonly accessibility: Array<{
    id: number;
    name: string;
    possible: boolean;
  }>;

  constructor(bridge: BrideResponseInterface) {
    this.id = bridge.id;
    this.name = bridge.name;
    this.stateId = bridge.state_id;
    this.currentInfo = bridge.current_info;
    this.lat = bridge.lat;
    this.long = bridge.long;
    this.connectionEnds = bridge.connection_ends;
    this.accessibility = bridge.accessibility;
  }

  /**
   * Returns the services and the current state
   */
  get bridgeServicesAndState(): BridgeAndServicesInterface {
    const services: BridgeAndServicesInterface = {};

    this.connectionEnds.forEach(connectionEnd => {
      connectionEnd.services.forEach(service => {
        if (!services[service.type.name]) {
          services[service.type.name] = [];
        }
        services[service.type.name].push({
          id: service.state.id,
          name: service.state.name,
          shore: connectionEnd.shore.short_name
        });
      });
    });

    return services;
  }

  get coordinates(): any[] {
    const coordinates: any[] = [];

    this.connectionEnds.forEach(connectionEnd => {
      coordinates.push([
        connectionEnd.long as number,
        connectionEnd.lat as number
      ]);
    });

    return coordinates;
  }

  /**
   * Set this bridge as the active bridge
   */
  setActive() {
    const map = this.getMap();
    map.setActiveMarker(this);
  }

  /**
   * Fly to the bridge
   */
  flyTo() {
    const map = this.getMap();
    map.flyTo([this.long, this.lat]);
  }

  /**
   * Returns the instance of the MapboxGlClass
   */
  getMap(): MapBoxGlMap {
    return MapBoxGlMap.getInstace();
  }

  /**
   * Collects the information of the bridge and each bridgeservice
   */
  get currentInformation(): Array<{ title: string; information: string }> {
    const informationArray: Array<{ title: string; information: string }> = [];

    if (this.currentInfo.trim().length !== 0) {
      informationArray.push({
        title: "",
        information: this.currentInfo
      });
    }

    this.connectionEnds.forEach(end => {
      end.services.forEach(service => {
        if (service.current_info.trim().length !== 0) {
          informationArray.push({
            title: service.title,
            information: service.current_info
          });
        }
      });
    });

    return informationArray;
  }
}
