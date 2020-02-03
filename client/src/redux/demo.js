import { DEMO } from "../actions/actionType";

const IN_IT = {
  project: "socket"
};
const demo = function(state = IN_IT, action) {
  switch (action) {
    case DEMO: {
      return { ...state, ...action.payload };
    }
    default:
      return { ...state };
  }
};

export default demo;
