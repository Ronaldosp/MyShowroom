import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand } from '../store/action/actionCreator';



function FoodTable({el , index}) {
  const dispatch = useDispatch()
  const handleDelete=(event)=>{
    event.preventDefault()
    const id = el.id
    dispatch(deleteBrand(id))
    Swal.fire("Brand Successfully Deleted");
  }

  return (
      <tbody>
        <tr>
          <td>{index}</td>
          <td>{el.name}</td>
          <td>{el.country}</td>
          <td ><img src={el.logo} style={{width: 150 }} /></td>
          <td >
            <div style={{ display: "flex" , gap: 2 }} >
           <Button onClick={handleDelete} variant="danger">Delete</Button>
            </div>
          </td>
        </tr>
      </tbody>
  );
}

export default FoodTable;