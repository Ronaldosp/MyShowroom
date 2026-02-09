import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { deleteBrand } from '../store/action/actionCreator';



function FoodTable({el , index}) {
  const dispatch = useDispatch()
  const handleDelete=(event)=>{
    event.preventDefault()
    const id = el.id
    dispatch(deleteBrand(id))
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      ext: "Brand has been deleted.",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  return (
    <tr>
      <td data-label="#">{index}</td>
      <td data-label="Name">{el.name}</td>
      <td data-label="Logo"><img src={el.logo} style={{width: 150 }} /></td>
      <td data-label="Country">{el.country}</td>
      <td >
        <div style={{ display: "flex" , gap: 2 }} >
          <Button onClick={handleDelete} variant="danger">Delete</Button>
        </div>
      </td>
    </tr>
  );
}

export default FoodTable;