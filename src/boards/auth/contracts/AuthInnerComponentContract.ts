import {BehaviorSubject} from "rxjs";

export type AuthStateEventTypes = "init" | "success" | "fail" | "proceed";
export type AuthStateBoxSizeTypes = "small" | "normal" | "wide";

export interface AuthStateEvent {
  type: AuthStateEventTypes,
  size?: AuthStateBoxSizeTypes,
  color?: string
}

export interface AuthInnerComponentContract {
  stateBus:BehaviorSubject<AuthStateEvent>;
}
