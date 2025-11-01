import {createBrowserRouter , redirect} from 'react-router-dom'
import HomePage from '../views/HomePage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import Layout from '../components/Layout'
import CategoryPage from '../views/CategoryPage'
import CarPage from '../views/CarPage'

export default createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        loader:()=>{
            console.log(localStorage.access_token);
            //if(!localStorage.access_token) return redirect('/login')
           // return null
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
                path:"/cars",
                element  :<CarPage/>
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