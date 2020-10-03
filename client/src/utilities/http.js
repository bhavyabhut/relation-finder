import axios from "axios";

const RequestMethod = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Delete: "DELETE",
  Options: "OPTIONS",
  Head: "HEAD",
  Patch: "PATCH",
};

function doDelay(duration = 250) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
async function doRequest(restRequest, config, isAuthenticated = true) {
  if (!restRequest.url) {
    console.log(
      `Received ${restRequest.url} which is invalid for a endpoint url`
    );
  }

  try {
    const axiosRequestConfig = {
      method: restRequest.method,
      url: restRequest.url,
      data: config?.config,
    };
    const [axiosResponse] = await Promise.all([
      axios(axiosRequestConfig),
      doDelay(),
    ]);
    return {
      ...axiosResponse.data,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function get(endpoint, payload) {
  const config = payload || null;
  return doRequest(
    {
      method: RequestMethod.Get,
      url: endpoint,
    },
    config
  );
}

export async function post(endpoint, payload) {
  const config = payload || null;
  return doRequest(
    {
      method: RequestMethod.Post,
      url: endpoint,
    },
    { config }
  );
}

export async function patch(endpoint, payload) {
  const config = payload || null;
  return doRequest(
    {
      method: RequestMethod.Patch,
      url: endpoint,
    },
    { config }
  );
}
