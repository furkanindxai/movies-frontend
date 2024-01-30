export const actions = {
	signup: async ({ cookies, request }) => {
		try {
			const data = await request.formData();
			const email = data.get('email')
			const password = data.get('password')
			const user = {email, password}
			const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
				method: "POST", // or 'PUT'
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			  });
		  
			  const result = await response.json();
			  console.log(response)
		}
		catch(e) {
			console.log(e)

		}

	},

	delete: async ({ cookies, request }) => {
		const data = await request.formData();
	}
};