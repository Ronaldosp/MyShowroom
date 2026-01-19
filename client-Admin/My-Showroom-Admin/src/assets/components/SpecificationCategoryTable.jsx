import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteScpecificationCategory } from '../store/action/actionCreator';



function SpecificationCategoryTable({el , index}) {
  const dispatch = useDispatch()
  const handleDelete=(event)=>{
    event.preventDefault()
    const id = el.id
    dispatch(deleteScpecificationCategory(id))
    Swal.fire("Specification Category Successfully Deleted");
  }

  return (
      <tbody>
        <tr>
          <td>{index}</td>
          <td>{el.name}</td>
          <td >
            <div style={{ display: "flex" , gap: 2 }} >
           <Button onClick={handleDelete} variant="danger">Delete</Button>
            </div>
          </td>
        </tr>
      </tbody>
  );
}

export default SpecificationCategoryTable;