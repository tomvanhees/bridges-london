import { Bridge } from "@/classes/Bridge";
import { AnySourceData } from "mapbox-gl";
import { Layer } from "mapbox-gl";

export class BridgeLine {
  private bridge: Bridge;
  lineColor = "#3EC7FF";

  constructor(bridge: Bridge) {
    this.bridge = bridge;
  }

  createGeoJson(): AnySourceData {
    return {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: this.bridge.coordinates
        }
      }
    };
  }

  createLayer(source: string): Layer {
    return {
      id: source,
      type: "line",
      source: source,
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": this.lineColor,
        "line-width": 8
      }
    };
  }
}
