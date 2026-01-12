import {createBrowserRouter , redirect} from 'react-router-dom'
import HomePage from '../views/HomePage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import Layout from '../components/Layout'
import ListingPage from '../views/ListingPage'
import ComparePage from '../views/ComparePage'
import CarsDetailPage from '../views/CarsDetailPage'
import DealerPage from "../views/DealerPage"
import AddCar from "../views/AddCar"
import DealerCarSpecification from "../views/DealerCarSpecification"


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
            },
            {
                path:"/dealer",
                element  :<DealerPage/>
            },
            {
                path:"/addcar",
                element  :<AddCar/>
            },
            {
                path:"/dealer/cars/:id",
                element:<DealerCarSpecification/>,
            },
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