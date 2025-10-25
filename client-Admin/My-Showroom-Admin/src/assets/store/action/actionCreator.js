const BASE_URL = 'http://localhost:3000'

export function brandsFetchSuccess(payload){
    return{
        type:"brands/get",
        payload
    }
}

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

export const fetchBrands = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/brands`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json()
       
            
            const action = brandsFetchSuccess(data)
            dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const createBrands = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/brands`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            console.log(response);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchBrands())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const editBrand = (id , body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/brands/${id}`,{
                method:"PUT",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            console.log(response);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchBrands())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteBrand= (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/brands/${id}`,{
                method:"DELETE",
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token

                }
            }) 
            console.log(response);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchBrands())
            
        } catch (error) {
            console.log(error);
        }
    }
}