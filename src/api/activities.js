const API = import.meta.env.VITE_API;

function getApiUrl() {
  if (!API) {
    throw Error("Missing VITE_API. Add it to your .env file.");
  }

  return API;
}

/** Fetches an array of activities from the API. */
export async function getActivities() {
  try {
    const response = await fetch(getApiUrl() + "/activities");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/** Fetches one activity from the API by ID. */
export async function getActivityById(activityId) {
  try {
    const response = await fetch(getApiUrl() + "/activities/" + activityId);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Sends a new activity to the API to be created.
 * A valid token is required.
 */
export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await fetch(getApiUrl() + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Requests the API to delete the activity with the given ID.
 * A valid token is required.
 */
export async function deleteActivity(token, activityId) {
  if (!token) {
    throw Error("You must be signed in to delete an activity.");
  }

  const response = await fetch(getApiUrl() + "/activities/" + activityId, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
