import { GraphQLClient } from "graphql-request";
import isPlainObject from "lodash/isPlainObject";
import map from "lodash/map";
import isString from "lodash/isString";

function stringifyParameters(parameters) {
  return map(parameters, (value, key) => {
    return isPlainObject(value)
      ? `${key}: { ${stringifyParameters(value)} }`
      : isString(value)
        ? `${key}: "${value}"`
        : `${key}: ${value}`;
  }).join(" ");
}

function stringifySelections(selections) {
  return map(selections, (value, key) => {
    return isPlainObject(value)
      ? `${key} { ${stringifySelections(value)} }`
      : `${value}`;
  }).join(" ");
}

function buildRequestPayload({ type, field, parameters, selections }) {
  if (!graphQLRequestTypes.hasOwnProperty(type)) {
    throw new Error(`"${type}" type is not a valid request type.`);
  }
  if (!graphQLRequestFields[type].hasOwnProperty(field)) {
    throw new Error(`"${field}" field is not a valid request field.`);
  }
  if (!isPlainObject(parameters)) {
    throw new Error(`parameters are invalid.`);
  }
  if (!isPlainObject(selections)) {
    throw new Error(`selections are invalid.`);
  }

  return `${type} { ${field} ( ${stringifyParameters(
    parameters
  )} ) { ${stringifySelections(selections)} } }`;
}

export const graphQLRequestTypes = {
  mutation: "mutation",
  query: "query",
  subscription: "subscription"
};

export const graphQLRequestFields = {
  mutation: {
    login: "login",
    post: "post",
    signup: "signup",
    vote: "vote"
  },
  query: {
    feed: "feed"
  },
  subscription: {
    newLink: "newLink", // @todo: rename once api is changed
    newVote: "newVote"
  }
};

// export const graphQLRequestSelection

export default function graphQLRequest(endpoint, requestOptions) {
  const graphQLClient = new GraphQLClient(endpoint);
  const requestPayload = buildRequestPayload(requestOptions);
  return graphQLClient
    .request(requestPayload)
    .then(response => response)
    .catch(error => error.response);
}
