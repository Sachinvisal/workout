import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

interface Workout {
  _id: string;
  title: string;
  load: number;
  reps: number;
  createdAt: string;
}

interface WorkoutsState {
  workouts: Workout[];
}

interface WorkoutsAction {
  type: string;
  payload?: any;
}

const initialState: WorkoutsState = {
  workouts: [],
};

const workoutsReducer = (state: WorkoutsState, action: WorkoutsAction): WorkoutsState => {
  switch (action.type) {
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(workout => workout._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkoutsContext = createContext<WorkoutsContextType | undefined>(undefined);

interface WorkoutsContextProviderProps {
  children: ReactNode;
}

export interface WorkoutsContextType {
  state: WorkoutsState;
  dispatch: Dispatch<WorkoutsAction>;
}

export const WorkoutsContextProvider: React.FC<WorkoutsContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, initialState);

  return (
    <WorkoutsContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
