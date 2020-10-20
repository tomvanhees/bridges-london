import mapboxgl, { Map, Point } from "mapbox-gl";
import { Bridge } from "@/classes/Bridge";
import { BridgeMarker } from "@/classes/MapTools/BridgeMarker";
import { BridgeLine } from "@/classes/MapTools/BridgeLine";
import store from "@/store/index";

export class MapBoxGlMap {
  map: Map;
  static instance: MapBoxGlMap;

  private constructor() {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API;
    const mapTag = document.getElementById("map");

    if (mapTag) {
      this.map = new mapboxgl.Map({
        container: "map",
        center: [-0.09832070000000004, 51.5116521],
        zoom: 16,
        style: process.env.VUE_APP_MAPBOX_COLOR_SCHEME
      });
    } else {
      throw "No Map ID found";
    }
  }

  /**
   * Add a collection of bridges to the map
   * @param bridges
   */
  addBridgesToMap(bridges: Bridge[]) {
    if (!this.map.loaded()) {
      setTimeout(() => {
        this.addBridgesToMap(bridges);
      }, 300);
    } else {
      bridges.forEach((bridge: Bridge) => {
        this.addBridgeToMap(bridge);
      });
    }
  }

  /**
   * Add a single bridge to the map
   * @param bridge
   */
  addBridgeToMap(bridge: Bridge) {
    this.addBridgeMarker(bridge);
    this.addBridgeLine(bridge);
  }

  /**
   * Draw the line over the bridge
   * @param bridge
   */
  addBridgeLine(bridge: Bridge) {
    const lineClass = new BridgeLine(bridge);
    this.map.addSource(`bridge_${bridge.id}`, lineClass.createGeoJson());
    this.map.addLayer(lineClass.createLayer(`bridge_${bridge.id}`));
  }

  /**
   * Brings the selected bridge into focus
   * @param coordinates
   * @param zoom
   */
  flyTo(coordinates: [number, number], zoom = 16) {
    this.map.flyTo({
      center: coordinates,
      offset: this.calculateOffset(),
      zoom: zoom
    });
  }

  /**
   * Calculates the offsets, adjusting for mobile, smaller screens and larger screens
   * @private
   */
  private calculateOffset(): Point {
    let offsetX = -400;
    const offsetY = -100;
    const container = this.map.getContainer();
    const offsetWith = container.offsetWidth;
    switch (true) {
      case offsetWith < 1016: {
        offsetX = 0;
        break;
      }
      case offsetWith < 1496: {
        offsetX = -200;
        break;
      }
    }
    return new mapboxgl.Point(offsetX, offsetY);
  }

  /**
   * Add the bridge marker
   * @param bridge
   */
  addBridgeMarker(bridge: Bridge) {
    const bridgemarker = new BridgeMarker(bridge).process();
    this.addMarkerToMap(bridgemarker, bridge);
    this.addEventListenerToMarker(bridge);
  }

  /**
   * @param bridgemarker
   * @param bridge
   */
  addMarkerToMap(bridgemarker: HTMLElement, bridge: Bridge) {
    new mapboxgl.Marker({
      element: bridgemarker as HTMLElement,
      offset: new mapboxgl.Point(0, 0)
    })
      .setLngLat([bridge.long, bridge.lat])
      .addTo(this.map);
  }

  /**
   * Adding click events to the markers
   * @param bridge
   */
  addEventListenerToMarker(bridge: Bridge) {
    const el = this.getMarker(`bridge_${bridge.id}`) as HTMLElement;

    el.addEventListener("click", () => {
      bridge.flyTo();
      bridge.setActive();
    });
  }

  /**
   * Sets the marker as active
   * @param bridge
   */
  setActiveMarker(bridge: Bridge) {
    this.removeActiveMarker();
    this.activeMarker = bridge;
    const marker = this.getMarker(`bridge_${bridge.id}`);
    marker.classList.add("active");
  }

  get activeMarker() {
    // @ts-ignore
    return store.state.connections.activeConnection;
  }

  set activeMarker(bridge: Bridge) {
    store.commit("connections/activeConnection", bridge);
  }

  /**
   * deactivates the current selected marker
   */
  removeActiveMarker() {
    if (this.activeMarker !== null) {
      const marker = this.getMarker(`bridge_${this.activeMarker.id}`);
      marker.classList.remove("active");
    }
  }

  /**
   * Finds the marker ID
   * @param markerId
   */
  getMarker(markerId: string): HTMLElement {
    return document.getElementById(markerId) as HTMLElement;
  }

  static getInstace() {
    if (!this.instance) {
      this.instance = new MapBoxGlMap();
    }
    return this.instance;
  }
}
