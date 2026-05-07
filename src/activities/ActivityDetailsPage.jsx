import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteActivity, getActivityById } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetailsPage() {
  const { activityId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        setError(null);
        const result = await getActivityById(activityId);
        setActivity(result?.activity ?? result);
      } catch (e) {
        setError(e.message);
      }
    };

    loadActivity();
  }, [activityId]);

  const tryDelete = async () => {
    try {
      setDeleteError(null);
      await deleteActivity(token, activityId);
      navigate("/activities");
    } catch (e) {
      setDeleteError(e.message);
    }
  };

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!activity) {
    return <p>Loading activity...</p>;
  }

  return (
    <section>
      <Link to="/activities">Back to all activities</Link>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>Created by: {activity.creatorName}</p>
      {token ? <button onClick={tryDelete}>Delete activity</button> : null}
      {deleteError ? <p role="alert">{deleteError}</p> : null}
    </section>
  );
}
