import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import { useState } from "react";


// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
// loader
import { Dna } from "react-loader-spinner";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [isLoading, setLoading] = useState(false);

  const url = "https://nodejsworkoutappapi.onrender.com";

  const handleClick = async () => {
    if (!user) {
      return;
    }
    setLoading(true);

    const response = await fetch(url + "/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      setLoading(false);
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </>
      ) : (
        <></>
      )}
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
    </>
  );
};

export default WorkoutDetails;
