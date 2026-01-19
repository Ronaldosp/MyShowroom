const BASE_URL = 'http://localhost:3000'

export function brandsFetchSuccess(payload){
    return{
        type:"brands/get",
        payload
    }
}

export function categoriesFetchSuccess(payload){
    return{
        type:"categories/get",
        payload
    }
}

export function carsFetchSuccess(payload){
    return{
        type:"cars/get",
        payload
    }
}

export function featureCategoriesFetchSuccess(payload){
    return{
        type:"featurecategories/get",
        payload
    }
}

export function specificationCategoriesFetchSuccess(payload){
    return{
        type:"specificationcategories/get",
        payload
    }
}

export const register = (body) =>{
    return async (dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/registerAdmin`,{
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
            throw error;
        }
    }
}

export const registerDealer = (body) =>{
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
            throw error;
        }
    }
}

export const login = (body) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/loginAdmin`,{
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
            throw error;
        }
    }
}

//Brands Logic Section
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
            throw error;
        }
    }
}

export const createBrands = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body , "data");
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
            throw error;
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
            throw error;
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
            throw error;
        }
    }
}

//Category Logic Section

export const fetchCategory = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/categories`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            console.log(response , "category response");
            const data = await response.json()
            console.log(data , "category data");
            
            const categories = Array.isArray(data) ? data : data.categories || []
            dispatch(categoriesFetchSuccess(categories))
       
            
            //const action = categoriesFetchSuccess(data)
            //dispatch(action)
       
        } catch (error) {
            console.log(error);
            throw error;
            
        }
    }
}

export const createCategory = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/categories`,{
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
            dispatch(fetchCategory())
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const editCategory = (id , body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/categories/${id}`,{
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
            dispatch(fetchCategory())
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const deleteCategory= (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/categories/${id}`,{
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
            dispatch(fetchCategory())
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

//Car Logic Section

export const fetchCar = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/cars`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json()
       
            
            const action = carsFetchSuccess(data)
            dispatch(action)
       
        } catch (error) {
            console.log(error);
            throw error;
            
        }
    }
}

export const createCar = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/cars`,{
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
            dispatch(fetchCar())
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const editCar = (id , body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/cars/${id}`,{
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
            dispatch(fetchCar())
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const deleteCar= (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/cars/${id}`,{
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
            dispatch(fetchCar())
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

// Feature Category Logic Section
export const fetchFeatureCategory = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/featurecategories`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            console.log(response,"response feature category");
            const data = await response.json()
       
            console.log(data,"data feature category");
            
            const action = featureCategoriesFetchSuccess(data)
            dispatch(action)
       
        } catch (error) {
            console.log(error);
            throw error;
            
        }
    }
}

export const createFeatureCategory = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body , "feature category body");
            const response = await fetch(BASE_URL+`/featurecategories`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            console.log(response , "feature category response create");
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchFeatureCategory())
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const editFeatureCategory = (id , body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/featurecategories/${id}`,{
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
            dispatch(fetchFeatureCategory())
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const deleteFeatureCategory= (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/featurecategories/${id}`,{
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
            dispatch(fetchFeatureCategory())
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

// Specification Category Logic Section
export const fetchScpecificationCategory = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/specificationcategories`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            console.log(response,"response feature category");
            const data = await response.json()
       
            console.log(data,"data feature category");
            
            const action = specificationCategoriesFetchSuccess(data)
            dispatch(action)
       
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const createScpecificationCategory = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body , "feature category body");
            const response = await fetch(BASE_URL+`/specificationcategories`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            console.log(response , "feature category response create");
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchScpecificationCategory())
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const editScpecificationCategory = (id , body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/specificationcategories/${id}`,{
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
            dispatch(fetchScpecificationCategory())
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const deleteScpecificationCategory= (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/specificationcategories/${id}`,{
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
            dispatch(fetchScpecificationCategory())
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}