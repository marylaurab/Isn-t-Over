import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import reducers from "../reducers/index";
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));


