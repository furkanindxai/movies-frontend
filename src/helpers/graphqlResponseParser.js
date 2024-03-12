const querySuccessResponseCodeMap = {
    signIn: 200,
    signUp: 201,
    updatePassword: 204,
    updateUser: 204,
    deleteUser: 204,
    addPoster: 204,
    updateMovie: 204,
    addMovie: 201
}

const graphqlResponseParser = (graphqlResponse, responseCode, queryName) => {
    if (graphqlResponse.errors) {
        responseCode = graphqlResponse.errors[0].extensions.response.status
        graphqlResponse = graphqlResponse.errors[0].extensions.response.body
    }
    else {
        responseCode = querySuccessResponseCodeMap[queryName]
        graphqlResponse = graphqlResponse.data[queryName]
    }
    return {
        result: graphqlResponse,
        responseCode
    }
}

export default graphqlResponseParser