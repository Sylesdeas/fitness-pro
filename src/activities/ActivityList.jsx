import { Link } from "react-router";

export default function ActivityList({ activities }) {
  const safeActivities = Array.isArray(activities) ? activities : [];
  return (
    <ul id="activities-list">
      {safeActivities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}

function ActivityListItem({ activity }) {
  return (
    <li>
      <Link to={`/activities/${activity.id}`}>
        <p>{activity.name}</p>
      </Link>
      {activity.description ? <p>{activity.description}</p> : null}
    </li>
  );
}
