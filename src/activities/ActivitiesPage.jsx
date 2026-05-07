import { useEffect, useState } from "react";
import { createActivity, getActivities } from "../api/activities";
import { useAuth } from "../auth/AuthContext";
import ActivityList from "./ActivityList";

/** Form for a user to create a new activity with a name and description. */
function ActivityForm({ syncActivities }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  const tryCreateActivity = async (event) => {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const description = formData.get("description");

    try {
      await createActivity(token, { name, description });
      syncActivities();
      form.reset();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>Add a new activity</h2>
      <form onSubmit={tryCreateActivity}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Description
          <input type="text" name="description" />
        </label>
        <button>Add activity</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
}

export default function ActivitiesPage() {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const syncActivities = async () => {
    try {
      setError(null);
      const result = await getActivities();
      setActivities(Array.isArray(result) ? result : (result.activities ?? []));
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    syncActivities();
  }, []);

  return (
    <section>
      <h1>Activities</h1>
      {token ? <ActivityForm syncActivities={syncActivities} /> : null}
      {error ? <p role="alert">{error}</p> : null}
      <ActivityList activities={activities} />
    </section>
  );
}
