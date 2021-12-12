import { combineReducers, Reducer } from "redux";

import { coreReducer } from "&features/core/core.slice";
import { employeesReducer } from "&features/employees/employees.slice";

/**
 * Combines reducers of all slices and router into one root reducer
 *
 * @param routerReducer router reducer for redux first history
 */
const createRootReducer = (routerReducer: Reducer) =>
  combineReducers({
    router: routerReducer,
    core: coreReducer,
    employees: employeesReducer,
  });
export default createRootReducer;
