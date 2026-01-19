import {createBrowserRouter , redirect} from 'react-router-dom'
import HomePage from '../views/HomePage'
import BrandsPage from '../views/BrandsPage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import Layout from '../components/Layout'
import CategoryPage from '../views/CategoryPage'
import CarPage from '../views/CarPage'
import FeatureCategoryPage from '../views/FeatureCategoryPage'
import SpecificationCategoryPage from '../views/SpecificationCategoryPage'

export default createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        loader:()=>{
            console.log(localStorage.access_token);
            //if(!localStorage.access_token) return redirect('/login')
            //return null
        },
        children:[
            {
                index:true,
                element:<HomePage/>,
            },
            {
                path:"/register",
                element  :<RegisterPage/>
            },
            {
                path:"/categories",
                element  :<CategoryPage/>
            },
            {
                path:"/brands",
                element  :<BrandsPage/>
            },
            {
                path:"/cars",
                element  :<CarPage/>
            },
            {
                path:"/featurecategories",
                element  :<FeatureCategoryPage/>
            }
            ,
            {
                path:"/specificationcategories",
                element  :<SpecificationCategoryPage/>
            }
        ]
    },
    {
        path:"/login",
        element:<LoginPage/>,
        loader:()=>{
            console.log(localStorage.access_token);
            //if(localStorage.access_token) return redirect('/')
            //return null
        }
    },
    
])