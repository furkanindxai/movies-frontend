const URL = `http://localhost:3000/api/v1/users`

export const getUserMoviesService = async (token) => {
    try {
        let postedList = await fetch(URL+"/me/movies?type=posted",{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
        }})
        let ratedList = await fetch(URL+"/me/movies?type=rated",{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
        }})
        postedList = await postedList.json()
        ratedList = await ratedList.json()
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
        let result = await fetch(URL+"/me/password", {
            method: "PATCH", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                password,
                newPassword,
                confirmPassword
            }),
        });
        const responseCode = result.status
        if (responseCode === 204) result = {message: "Password updated!"}
        else result = await result.json()
        return {
            responseCode,
            result
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const handleEmailChangeService = async (token, email) => {
    try {
        let result = await fetch(URL+"/me", {
            method: "PUT", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({email}),
        });
        const responseCode = result.status;
        if (responseCode === 204) result = {message: "Email updated!"}
        else result = await result.json();
        return {
            responseCode,
            result
        }

    }
    catch (e) {
        console.log(e)
    }
}

export const handleDeleteService = async (token) => {
    try {
        let result = await fetch("http://localhost:3000/api/v1/users/me", {
            method: "DELETE", // or 'PUT'
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    
        const responseCode = result.status;
        if (responseCode === 204) result = {message: "Deleted!"}
        else result = await result.json()
        return {
            responseCode,
            result
        }
    }
    catch (e) {
        console.log(e)
    }
}