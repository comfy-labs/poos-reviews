import graphQLRequest from "../graphQLRequest";

// @todo: centralize this configuration
const endpoint = "http://127.0.0.1:4000/";

export default function singUp(name, email, password) {
  const requestOptions = {
    type: "mutation",
    field: "signup",
    parameters: { name, email, password },
    selections: { user: { id: "id", name: "name" }, token: "token" }
  };

  return graphQLRequest(endpoint, requestOptions);
}
