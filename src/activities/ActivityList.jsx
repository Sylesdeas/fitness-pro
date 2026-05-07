import { useState } from "react";
import { deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";

export default function ActivityList() {
  return (
    <ul id="activities-list">
      {activities.map((activity) => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
          syncActivities={syncActivities}
        />
      ))}
    </ul>
  );
}

function ActivityListItem({ activity, syncActivities }) {
  const { token } = useAuth();

  const [error, setError] = useState(null);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <li>
      <Link to={"/activities/${activity.id}"}>
        <p>{activity.name}</p>
      </Link>
      {token ? <button onClick={tryDelete}>Delete</button> : null}
      {error ? <p role="alert">{error}</p> : null}
    </li>
  );
}
