import { createStore } from "redux";
import reducers from "./reducers/index"


function configureStore(state = { employees:[], projects:[] }) {
    return createStore(reducers, state);
  }
  
export default configureStore;








