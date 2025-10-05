import { NavLink, Outlet } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";




function HomePage() {
    //const data = useSelector((state)=>{
    //  return state.itemReducer.items
    //})
    console.log(data);
    const dispatch = useDispatch()
    
    //useEffect(()=>{
    //    dispatch(fetchItems())
    //},[])
  const [modalShow, setModalShow] = useState(false);

  return (
    <div style={{
      backgroundImage: 'url("https://images7.alphacoders.com/109/1097602.jpg")',
      backgroundSize: "cover",
      // backgroundColor: '#20B2AA',
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
      <h1 className="d-flex justify-content-center text-align-center" style={{fontFamily:'Times New Roman' , fontStyle:'italic'}}>Food List</h1>
      <div className="d-flex justify-content-center text-align-center">
        <Button variant="outline-primary" onClick={() => setModalShow(true)}>
          Add New Food
        </Button>
      </div>
      <AddFood show={modalShow} onHide={() => setModalShow(false)} />
      <div className="container">
        {/* BaseCard */}
        <div className=" row container d-flex grid gap-3 mt-4 row mx-auto ">
          <Table striped bordered hover>
            <thead >
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Image</th>
                <th>Ingredients</th>
                <th>Price</th>
                <th>Created By</th>
                <th></th>
              </tr>
            </thead>
            {(
              data.map((el , index) => {
                return <FoodTable el={el} index={++index} key={el.id} />;
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

export default HomePage;
