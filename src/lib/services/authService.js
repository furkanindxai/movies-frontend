const URL = 'http://localhost:3000/api/v1/auth'

export const signInService = async (email, password) => {
    try {
        const user = {email, password}
        let result = await fetch(`${URL}/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const responseCode = result.status
        result = await result.json()
        return {
            responseCode,
            result
        }
        
    }
    catch (e) {
        console.log(e)
    }
}

export const signUpService = async (email, password) => {
    try {
        const user = {email, password}
        let result = await fetch(`${URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const responseCode = result.status;
        result = await result.json();
        return {
            responseCode,
            result
        }
    }
    catch (e) {
        console.log(e)
    }
   
}
