const URL = 'http://localhost:3000/api/v1/auth'

export const signInService = async (email, password) => {
    try {
        const user = {email, password}
        let response = await fetch(`${url}/signin`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const responseCode = response.status
        response = await response.json()
        return {
            responseCode,
            response
        }
        
    }
    catch (e) {
        console.log(e)
    }
}

export const signUpService = async (email, password) => {
    try {
        const user = {email, password}
        let response = await fetch("http://localhost:3000/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const responseCode = response.status;
        response = await response.json();
        return {
            responseCode,
            response
        }
    }
    catch (e) {
        console.log(e)
    }
   
}
