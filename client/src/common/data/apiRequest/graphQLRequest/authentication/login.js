import graphQLRequest from "../graphQLRequest";

// @todo: centralize this configuration
const endpoint = "http://127.0.0.1:4000/";

export default function login(email, password) {
  const requestOptions = {
    type: "mutation",
    field: "login",
    parameters: { email, password },
    selections: { user: { id: "id", name: "name" }, token: "token" }
  };

  return graphQLRequest(endpoint, requestOptions);
}