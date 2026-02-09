import { Outlet } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddFeatureCategory from "./AddFeatureCategory";
import { fetchFeatureCategory } from "../store/action/actionCreator.js";
import FeatureCategoryTable from "../components/FeatureCategoryTable";

function FeatureCategoryPage(){
    const data = useSelector((state)=>{
        return state.featureCategoryReducer.featureCategories
    })

    const dispatch = useDispatch()
    
    useEffect(()=>{
       dispatch(fetchFeatureCategory())
    },[dispatch])

    const [modalShow, setModalShow] = useState(false);

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
            maxWidth: '1000px',
            width: '100%',
            backgroundColor: 'white',
            padding: '25px 30px',
            borderRadius: '5px',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)'}}>
            <h1 className="d-flex justify-content-center text-align-center" >Feature Category List</h1>
            <div className="d-flex justify-content-center text-align-center">
              <Button variant="outline-primary" onClick={() => setModalShow(true)}>
                Add New Category
              </Button>
            </div>
            <AddFeatureCategory show={modalShow} onHide={() => setModalShow(false)} />
            <div className="container">
              {/* BaseCard */}
              <div className=" row container d-flex grid gap-3 mt-4 row mx-auto ">
                <Table striped bordered hover>
                  <thead >
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  {(
                    data.map((el , index) => {
                      return <FeatureCategoryTable el={el} index={++index} key={el.id} />;
                    })
                  )}
                </Table>
              </div>
            </div>
            <Outlet/>
          </div>
        </div>
    );
}

export default FeatureCategoryPage;