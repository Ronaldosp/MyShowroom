import {createBrowserRouter , redirect} from 'react-router-dom'
import HomePage from '../views/HomePage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import Layout from '../components/Layout'
import ListingPage from '../views/ListingPage'
import ComparePage from '../views/ComparePage'
import CarsDetailPage from '../views/CarsDetailPage'

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
                path:"/",
                element:<HomePage/>,
            },
            {
                path:"/register",
                element  :<RegisterPage/>
            },
            {
                path:"/cars",
                element  :<CarsPage/>
            },
            {
                path:"/listing",
                element  :<ListingPage/>
            },
            {
                path:"/compare",
                element  :<ComparePage/>
            },
            {
                path:"/detail",
                element  :<CarsDetailPage/>
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