import { combineReducers } from "redux";
import {mainData} from './mainData';
import {paginate} from "./paginate";
import {settings} from './settings'
const reducers=combineReducers({mainData,paginate,settings})

export default reducers;
