import {User} from "../../../app/Models/User";

export interface AuthPageStateContract {
  // title: string,
  // icon?: string,
  // description?: string,
  currentComponent?: any
  user?: User,
  company?: Object
}
