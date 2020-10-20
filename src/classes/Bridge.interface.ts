import { ConnectionEndInterface } from "@/classes/ConnectionEnd.interface";

export interface BrideInterface {
  readonly id: number;
  readonly stateId: number;
  readonly name: string;
  readonly connectionEnds: ConnectionEndInterface[];
  readonly currentInfo: string;
  readonly lat: number;
  readonly long: number;
  readonly accessibility: Array<{
    id: number;
    name: string;
    possible: boolean;
  }>;
}

export interface BrideResponseInterface {
  readonly id: number;
  readonly state_id: number;
  readonly name: string;
  readonly connection_ends: ConnectionEndInterface[];
  readonly current_info: string;
  readonly lat: number;
  readonly long: number;
  readonly accessibility: Array<{
    id: number;
    name: string;
    possible: boolean;
  }>;
}

export interface BridgeAndServicesInterface {
  [index: string]: Array<{ id: number; name: string; shore: string }>;
}
