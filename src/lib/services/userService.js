import graphqlResponseParser from "../../helpers/graphqlResponseParser"

const URL = 'http://172.25.176.79:4002/graphql'

export const getUserMoviesService = async (token) => {
    try {

        let postedList = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          
            body: JSON.stringify({
              query: `query UserMovies {
                userMovies(type: "posted") {
                    ... on Movie {
                        id
                        poster
                        title
                        directors
                        producers
                        genres
                        releaseYear
                        description
                        averageRating
                        imageThumbnail
                        image
                        createdAt
                        updatedAt
                        deletedAt
                    }
                }
            }`
            })
        })

        postedList = await postedList.json()
        postedList = graphqlResponseParser(postedList, 200, "userMovies")
        postedList = postedList.result
        // let postedList = await fetch(URL+"/me/movies?type=posted",{
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`
        // }})
        // postedList = await postedList.json()
        // let ratedList = await fetch(URL+"/me/movies?type=rated",{
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`
        // }})
        // ratedList = await ratedList.json()


        let ratedList = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          
            body: JSON.stringify({
              query: `query UserMovies {
                userMovies(type: "rated") {
                    ... on RatedMovie {
                        id
                        userId
                        rating
                        review
                        createdAt
                        updatedAt
                        deletedAt
                        Movie {
                            id
                            poster
                            title
                            directors
                            producers
                            genres
                            releaseYear
                            description
                            averageRating
                            imageThumbnail
                            image
                            createdAt
                            updatedAt
                            deletedAt
                        }
                    }
                }
            }`
            })
        })

        ratedList = await ratedList.json()
        ratedList = graphqlResponseParser(ratedList, 200, "userMovies")
        ratedList = ratedList.result

        return {
            postedList,
            ratedList
        }
    }
    catch (e) {
        console.log(e)
    }   
}

export const handlePasswordChangeService = async (token, password, newPassword, confirmPassword) => {
    try {

        let result = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          
            body: JSON.stringify({
              query: `mutation UpdatePassword {
                updatePassword(password: "${password}", newPassword: "${newPassword}", confirmPassword: "${confirmPassword}")
            }
            `
            })
        })

        // let result = await fetch(URL+"/me/password", {
        //     method: "PATCH", // or 'PUT'
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`,
        //     },
        //     body: JSON.stringify({
        //         password,
        //         newPassword,
        //         confirmPassword
        //     }),
        // });
        result = await result.json()
        const parsedResult = graphqlResponseParser(result, 200, "updatePassword")
        if (parsedResult.responseCode === 204) parsedResult.result = {message: "Password updated!"}
        return {
            responseCode: parsedResult.responseCode,
            result: parsedResult.result
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const handleEmailChangeService = async (token, email) => {
    try {

        let result = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          
            body: JSON.stringify({
              query: `mutation UpdateUser {
                updateUser(email: "${email}")
            }`
            })
        })

        result = await result.json()
        const parsedResult = graphqlResponseParser(result, 200, "updateUser")
        if (parsedResult.responseCode === 204) parsedResult.result = {message: "Email updated!"}
        return {
            responseCode: parsedResult.responseCode,
            result: parsedResult.result
        }



        // let result = await fetch(URL+"/me", {
        //     method: "PUT", // or 'PUT'
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`,
        //     },
        //     body: JSON.stringify({email}),
        // });
        // const responseCode = result.status;
        // if (responseCode === 204) result = {message: "Email updated!"}
        // else result = await result.json();
        // return {
        //     responseCode,
        //     result
        // }

    }
    catch (e) {
        console.log(e)
    }
}

export const handleDeleteService = async (token) => {
    try {

        let result = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          
            body: JSON.stringify({
              query: `mutation DeleteUser {
                deleteUser
            }
            `
            })
        })

        result = await result.json()
        const parsedResult = graphqlResponseParser(result, 200, "deleteUser")
        if (parsedResult.responseCode === 204) parsedResult.result = {message: "Deleted!"}
        return {
            responseCode: parsedResult.responseCode,
            result: parsedResult.result
        }



        // let result = await fetch("http://localhost:3000/api/v1/users/me", {
        //     method: "DELETE", // or 'PUT'
        //     headers: {
        //         "Authorization": `Bearer ${token}`,
        //     },
        // });
    
        // const responseCode = result.status;
        // if (responseCode === 204) result = {message: "Deleted!"}
        // else result = await result.json()
        // return {
        //     responseCode,
        //     result
        // }
    }
    catch (e) {
        console.log(e)
    }
}