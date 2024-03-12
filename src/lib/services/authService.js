import graphqlResponseParser from "../../helpers/graphqlResponseParser"

const URL = 'http://172.25.176.79:4002/graphql'

export const signInService = async (email, password) => {
    try {
        let result = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json"
            },
          
            body: JSON.stringify({
              query: `query SignIn {
                signIn(creds: { email: "${email}", password: "${password}" }) {
                    ... on SignInSuccess {
                        token
                        email
                        roles
                        id
                    }
                }
              }`
            })
        })
        
        let responseCode = result.status
        result = await result.json()

        return graphqlResponseParser(result, responseCode, "signIn")
        // if (result.errors) {
        //     responseCode = result.errors[0].extensions.response.status
        //     result = result.errors[0].extensions.response.body
        // }
        // else {
        //     result = result.data.signIn
        //     responseCode = 200
        // }
        // return {
        //     responseCode,
        //     result
        // }
        
    }
    catch (e) {
        console.log(e)
    }
}

export const signUpService = async (email, password) => {
    try {
        let result = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json"
            },
          
            body: JSON.stringify({
              query: `mutation SignUp {
                signUp(creds: { email: "${email}", password: "${password}" }) {
                    message
                }
            }`
            })
        })
       

        let responseCode = result.status;
        result = await result.json();
        return graphqlResponseParser(result, responseCode, "signUp")
        // if (result.errors) {
        //     responseCode = result.errors[0].extensions.response.status
        //     result = result.errors[0].extensions.response.body
        // }
        // else {
        //     result = result.data.signUp
        //     responseCode = 201
        // }
        // return {
        //     responseCode,
        //     result
        // }
    }
    catch (e) {
        console.log(e)
    }
   
}
