import { useEffect,useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

// loader
import { Dna } from "react-loader-spinner";


const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [isLoading, setLoading] = useState(false);


  const url = "https://nodejsworkoutappapi.onrender.com";

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true)
      const response = await fetch(url + "/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        setLoading(false)
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
      {isLoading ? (
          <>
            {" "}
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
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
