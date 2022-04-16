import '../styles/table.css';


function EditableRow({ defaultSelect,el,handleEditChange,collegeData,handleSave }) {



    return (
<>

                <tr id='table-row'>
                    <td><input name='name'    type='text' value={el.name} onChange={handleEditChange}/></td>
                    <td><input name='rank' value={el.rank} onChange={handleEditChange}/></td>
                    <td><span className='cols'><select name='pref1' onChange={handleEditChange}>    
                        <option >{el.pref1}</option>
                        {collegeData.map((e) => (
                            <option    value={e.name} >{e.name}</option>

                        ))}</select></span></td>
               <td><span className='cols'><select name='pref2' onChange={handleEditChange}>    
                        <option >{el.pref2}</option>
                        {collegeData.map((e) => (
                            <option    value={e.name} >{e.name}</option>

                        ))}</select></span></td>
                            <td><span className='cols'><select name='pref3' onChange={handleEditChange}>    
                        <option  >{el.pref3}</option>
                        {collegeData.map((e) => (
                            <option  value={e.name} >{e.name}</option>

                        ))}</select></span></td>
                        <td><button onClick={handleSave} className='btn btn-warning btn-sm'>Save</button></td>


                </tr>
        

</>
    )
}

export default EditableRow