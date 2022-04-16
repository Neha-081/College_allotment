import '../styles/table.css';
import {BsPencilSquare} from 'react-icons/bs'


function StudList({ handleEditId,el }) {
  return (
 <>
      <tr id='table-row' >
        <td>{el.name}</td>
        <td>{el.rank}</td>
      <td><span className='cols'>{el.pref1}</span></td>
      <td><span className='cols2'>{el.pref2}</span></td>
      <td><span className='cols3'>{el.pref3}</span></td>
      <td onClick={()=>handleEditId(el.id,el)}><BsPencilSquare/></td>
      </tr>

</>
  )
}

export default StudList