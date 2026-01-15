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

export function carsFetchIdSuccess(payload){
    return{
        type:"cars/getById",
        payload
    }
}

export function dealerProfilesFetchSuccess(payload){
    return{
        type:"dealerProfiles/get",
        payload
    }
}

export function dealerProfilesDetailSuccess(payload){
    return{
        type:"dealerProfiles/detail/get",
        payload
    }
}
export function dealerProfilesCarsSuccess(payload){
    return{
        type:"dealerProfiles/cars/get",
        payload
    }
}

export function carsDetailFetchSuccess(payload){
    return{
        type:"cars/detail/get",
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

export function featureFetchSuccess(payload){
    return{
        type:"features/get",
        payload
    }
}

export function specificationFieldsFetchSuccess(payload){
    return{
        type:"specificationfields/get",
        payload
    }
}

export function specificationFetchSuccess(payload){
    return{
        type:"specifications/get",
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
            localStorage.setItem("access_token", data.access_token);


        } catch (error) {
            console.log(error);
            
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
            const data = await response.json()
            const categories = Array.isArray(data) ? data : data.categories || []
            dispatch(categoriesFetchSuccess(categories))
       
            
            //const action = categoriesFetchSuccess(data)
            //dispatch(action)
       
        } catch (error) {
            console.log(error);
            
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
            
        }
    }
}

export const fetchCarId = (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/cars/${id}`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json()
       
            
            const action = carsFetchIdSuccess(data)
            dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const createCar = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body , "create car");
            const response = await fetch(BASE_URL+`/cars`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            console.log(response,"create car");
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchCar())
            
        } catch (error) {
            console.log(error);
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
        }
    }
}

//dealer profile
export const fetchDealer = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/dealerprofiles`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json()
            const dealerprofiles = Array.isArray(data) ? data : data.dealerprofiles || []
            dispatch(dealerProfilesFetchSuccess(dealerprofiles))
       
            
            //const action = dealerProfilesFetchSuccess(data)
            //dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchDealerId = (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/dealerprofiles/${id}`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json()
            const dealerprofiles = Array.isArray(data) ? data : data.dealerprofiles || []
            dispatch(dealerProfilesFetchSuccess(dealerprofiles))
       
            
            //const action = dealerProfilesFetchSuccess(data)
            //dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchDealerIdCars = (id) =>{
    return async(dispatch)=>{
        try {
            console.log("id response:", id);
            const response = await fetch(BASE_URL+`/dealerprofiles/${id}`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json();
            console.log("API response:", data);

            // Ambil cars
            const dealerCars = data.Cars || [];
            dispatch(dealerProfilesCarsSuccess(dealerCars));
       
            
            //const action = dealerProfilesFetchSuccess(data)
            //dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}
export const fetchDetailCars = (id) =>{
    return async(dispatch)=>{
        try {
            console.log("id response:", id);
            const response = await fetch(BASE_URL+`/cars/${id}`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json();
            console.log("API response:", data);

            // Ambil cars
            const dealerCars = data.Cars || [];
            dispatch(carsDetailFetchSuccess(dealerCars));
       
            
            //const action = dealerProfilesFetchSuccess(data)
            //dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}


export const fetchDealerUserProfile = (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/dealerprofilesuser/${id}`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json()
            const dealerprofiles = Array.isArray(data) ? data : [data];
            dispatch(dealerProfilesFetchSuccess(dealerprofiles))
       
            
            //const action = dealerProfilesFetchSuccess(data)
            //dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchDealerUserProfileDetail = (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/dealerprofilesuser/${id}`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json()
            const dealerprofiles = Array.isArray(data) ? data : [data];
            dispatch(dealerProfilesDetailSuccess(dealerprofiles))
       
            
            //const action = dealerProfilesFetchSuccess(data)
            //dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}



export const fetchDealerBrand = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/dealerprofilesbrand`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            const data = await response.json()
            const dealerprofiles = Array.isArray(data) ? data : data.dealerprofiles || []
            dispatch(dealerProfilesFetchSuccess(dealerprofiles))
       
            
            //const action = dealerProfilesFetchSuccess(data)
            //dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const createDealer = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/dealerprofiles`,{
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
            dispatch(fetchDealer())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const editDealer = (id , body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/dealerprofiles/${id}`,{
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
            dispatch(fetchDealer())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteDealer= (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/dealerprofiles/${id}`,{
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
            dispatch(fetchDealer())
            
        } catch (error) {
            console.log(error);
        }
    }
}

//feature Category
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
        }
    }
}

//feature 
export const fetchFeature = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/features`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            console.log(response,"response features");
            const data = await response.json()
       
            console.log(data,"data features");
            
            const action = featureFetchSuccess(data)
            dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const createFeature = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body , "feature body");
            const response = await fetch(BASE_URL+`/features`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            console.log(response , "feature response create");
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchFeature())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const editFeature = (id , body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/features/${id}`,{
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
            dispatch(fetchFeature())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteFeature = (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/features/${id}`,{
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
            dispatch(fetchFeature())
            
        } catch (error) {
            console.log(error);
        }
    }
}

//specification Category
export const fetchSpecificationCategory = () =>{
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
            
        }
    }
}

export const createSpecificationCategory = (body) =>{
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
            dispatch(fetchSpecificationCategory())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const editSpecificationCategory = (id , body) =>{
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
            dispatch(fetchSpecificationCategory())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteSpecificationCategory= (id) =>{
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
            dispatch(fetchSpecificationCategory())
            
        } catch (error) {
            console.log(error);
        }
    }
}

//specification fields
export const fetchSpecificationFields = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/specificationfields`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            console.log(response,"response specification fields");
            const data = await response.json()
       
            console.log(data,"data specification fields");
            
            const action = specificationFieldsFetchSuccess(data)
            dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const createSpecificationFields = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body , "feature specification fields");
            const response = await fetch(BASE_URL+`/specificationfields`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            console.log(response , "specification fields response create");
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchSpecificationFields())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const editSpecificationFields = (id , body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/specificationfields/${id}`,{
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
            dispatch(fetchSpecificationFields())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteSpecificationFields = (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/specificationfields/${id}`,{
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
            dispatch(fetchSpecificationFields())
            
        } catch (error) {
            console.log(error);
        }
    }
}

//specification
export const fetchSpecifications = () =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/specifications`,{
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            })
            if(!response.ok) throw new Error("Something wrong!")
            console.log(response,"response specification ");
            const data = await response.json()
       
            console.log(data,"data specification ");
            
            const action = specificationFetchSuccess(data)
            dispatch(action)
       
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const createSpecifications = (body) =>{
    return async(dispatch)=>{
        try {
            console.log(body , "feature specification ");
            const response = await fetch(BASE_URL+`/specifications`,{
                method:"POST",
                body: JSON.stringify(body),
                headers:{
                    'Content-Type':'application/json',
                    //access_token:localStorage.access_token
                }
            }) 
            console.log(response , "specification  response create");
            const data = await response.json(); 
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            dispatch(fetchSpecifications())
            console.log(data , "SPEC FIELDS DATA");
            
            return data; 
        } catch (error) {
            console.log(error);
        }
    }
}

export const editSpecifications = (id , body) =>{
    return async(dispatch)=>{
        try {
            console.log(body);
            const response = await fetch(BASE_URL+`/specifications/${id}`,{
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
            dispatch(fetchSpecifications())
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteSpecifications = (id) =>{
    return async(dispatch)=>{
        try {
            const response = await fetch(BASE_URL+`/specifications/${id}`,{
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
            dispatch(fetchSpecifications())
            
        } catch (error) {
            console.log(error);
        }
    }
}