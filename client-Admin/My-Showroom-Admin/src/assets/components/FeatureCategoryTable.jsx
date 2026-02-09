import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { deleteFeatureCategory } from '../store/action/actionCreator';

function FeatureCategoryTable({el , index}) {
  const dispatch = useDispatch()
  const handleDelete=(event)=>{
    event.preventDefault()
    const id = el.id
    dispatch(deleteFeatureCategory(id))
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      ext: "Feature Category has been deleted.",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  return (
      <tbody>
        <tr>
          <td>{index}</td>
          <td>{el.name}</td>
          <td>{el.description}</td>
          <td >
            <div style={{ display: "flex" , gap: 2 }} >
           <Button onClick={handleDelete} variant="danger">Delete</Button>
            </div>
          </td>
        </tr>
      </tbody>
  );
}

export default FeatureCategoryTable;