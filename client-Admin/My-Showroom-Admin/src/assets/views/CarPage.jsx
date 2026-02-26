import { Outlet } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCar } from "../store/action/actionCreator.js";
import CarTable from "../components/CarTable.jsx";

function CarPage(){
    const data = useSelector((state)=>{
      return state.carReducer.cars
    })

    const dispatch = useDispatch()
    
    useEffect(()=>{
      dispatch(fetchCar())
    },[dispatch])

    return (
        <div style={{
          backgroundImage: 'url("")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div className="container " style={{
            maxWidth: '1500px',
            width: '100%',
            backgroundColor: 'white',
            padding: '25px 30px',
            borderRadius: '5px',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)'}}>
            <h1 className="d-flex justify-content-center text-align-center">Car List</h1>
            <div className="container">
              {/* BaseCard */}
              <div className=" row container d-flex grid gap-3 mt-4 row mx-auto ">
                <Table striped bordered hover>
                  <thead >
                    <tr>
                      <th>#</th>
                      <th>Model Name</th>
                      <th>Brand</th>
                      <th>Model Image</th>
                      <th>Category</th>
                      <th>Action</th>
                      <th>AR Action</th>
                    </tr>
                  </thead>
                  {(
                    data.map((el , index) => {
                      return <CarTable el={el} index={++index} key={el.id} />;
                    })
                  )}
                </Table>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      );
}

export default CarPage;