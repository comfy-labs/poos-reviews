import graphQLRequest from "../graphQLRequest";

// @todo: centralize this configuration
const endpoint = "https://app.prisma.io/mark-dhillon-d38778/services/prisma-us1/poos-reviews/dev/";

export default function getAllShitholes() {
    console.log('Hey!!!!!!!');
    const requestOptions = {
        type: 'query',
        field: 'shitholes',
        parameters: {},
        selections: {}
    };
    return graphQLRequest(endpoint, requestOptions);
};