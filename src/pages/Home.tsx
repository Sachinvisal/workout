import React, { useEffect } from 'react';
import { useWorkoutContext } from '../Hooks/useWorkoutsContext';

// Components
import WorkoutDetails from '../component/WorkoutDetails'
import WorkoutForm from '../component/WorkOutForm';

// Define the Workout type
interface Workout {
  _id: string;
  title: string;
  load: number;
  reps: number;
  createdAt: string;
}

const Home: React.FC = () => {
  const { state: { workouts }, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUT', payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]); // Empty dependency array so that the component will render only once

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout: Workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
