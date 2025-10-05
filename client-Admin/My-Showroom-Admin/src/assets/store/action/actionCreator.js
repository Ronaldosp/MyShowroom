const BASE_URL = 'http://localhost:3000'

export const register = (body) =>{
    return async (dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/register`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json'
                }
            }) 
            console.log(response);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const login = (body) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/login`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                }
            }) 
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json()
            localStorage.setItem("access_token", data.access_token)

        } catch (error) {
            console.log(error);
            
        }
    }
}