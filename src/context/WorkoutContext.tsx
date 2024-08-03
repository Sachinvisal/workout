import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

// Define the Workout type
interface Workout {
  _id: string;
  title: string;
  load: number;
  reps: number;
  createdAt: string;
}

// Define the state type
interface WorkoutsState {
  workouts: Workout[] | null;
}

// Define the action types
type WorkoutsAction =
  | { type: 'SET_WORKOUT'; payload: Workout[] }
  | { type: 'CREATE_WORKOUT'; payload: Workout }
  | { type: 'DELETE_WORKOUT'; payload: Workout };

// Define the context type
interface WorkoutsContextType {
  state: WorkoutsState;
  dispatch: Dispatch<WorkoutsAction>;
}

// Initial state
const initialState: WorkoutsState = {
  workouts: null,
};

// Create context with the defined type
export const WorkoutsContext = createContext<WorkoutsContextType | undefined>(undefined);

// Reducer function
export const workoutsReducer = (state: WorkoutsState, action: WorkoutsAction): WorkoutsState => {
  switch (action.type) {
    case 'SET_WORKOUT':
      return {
        workouts: action.payload,
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: state.workouts ? [action.payload, ...state.workouts] : [action.payload],
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts ? state.workouts.filter((w) => w._id !== action.payload._id) : null,
      };
    default:
      return state;
  }
};

// Provider component props
interface WorkoutsContextProviderProps {
  children: ReactNode;
}

// Provider component
export const WorkoutsContextProvider: React.FC<WorkoutsContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, initialState);

  return (
    <WorkoutsContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
