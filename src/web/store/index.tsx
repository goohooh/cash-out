import React, { createContext, useReducer } from "react";
import Expenditure, { ExpenseType } from "../../entity/model/expenditure";

/**
 * Todo: 상태/로직/액션이 더 복잡해지면 파일 분리
 */
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

interface InitialValue {
  expenditures?: Expenditure[],
  filteredExpenditures?: Expenditure[],
  filters?: ExpenseType[],
}

export const storeContext = createContext({ state: initialAppState, dispatch: (action: AppAction) => {} });

const { Provider } = storeContext;

export const StoreProvider = ({
  children, initialValue = {}
}: {
  children: React.ReactNode,
  initialValue?: InitialValue,
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initialAppState, ...initialValue });
  return (
      <Provider value={{ state, dispatch }}>
        {children}
      </Provider>
  );
}
