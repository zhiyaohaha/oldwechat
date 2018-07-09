import {__newGuid} from "../util/viewportWidth"
export default {
  key(){
    return __newGuid()
  },
  get_time(state){
    return state.time
  }
}
