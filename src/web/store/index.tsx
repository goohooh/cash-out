import React, { createContext, useReducer } from "react";
import Expenditure, { ExpenseType } from "../../entity/model/expenditure";

export enum ActionTypes {
  ToggleFilter,
  SetExpenditures,
  SetFilteredExpenditures,
}

type AppAction = {
  type : ActionTypes.ToggleFilter
  payload : ExpenseType,
}
| {
  type : ActionTypes.SetExpenditures,
  payload: Expenditure[],
}
| {
  type : ActionTypes.SetFilteredExpenditures,
}

interface AppReducer {
  (state: AppState, action: AppAction): AppState;
}

function expendituresFilter(expenditures: Expenditure[], filters: string[]) {
  return expenditures.filter(expenditure =>
    !filters.some(filter => filter === expenditure.type)
  );
}


const reducer: AppReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ToggleFilter:
      const filter = action.payload;
      const { filters } = state;
      const index = filters.indexOf(filter);

      let newFilters = [...filters];
      if (index === -1) {
        newFilters.push(filter);
      } else {
        newFilters.splice(index, 1);
      }
      return {
        ...state,
        filters: newFilters,
      };
    case ActionTypes.SetExpenditures:
      const newExpenditures = action.payload;
      return {
        ...state,
        expenditures: newExpenditures,
      }
    case ActionTypes.SetFilteredExpenditures:
      return {
        ...state,
        filteredExpenditures: expendituresFilter(
          state.expenditures,
          state.filters
        ),
      }
    default:
      return state;
  }
}

interface AppState {
  expenditures: Expenditure[],
  filteredExpenditures: Expenditure[],
  filters: ExpenseType[],
}

const initialAppState: AppState = {
  expenditures: [],
  filteredExpenditures: [],
  filters: [],
}

export const storeContext = createContext({ state: initialAppState, dispatch: (action: AppAction) => {} });

const { Provider } = storeContext;

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialAppState);
  return (
      <Provider value={{ state, dispatch }}>
        {children}
      </Provider>
  );
}
