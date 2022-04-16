import '../styles/table.css';


function EditableRow({ el,handleEditChange,collegeData,handleSave }) {



    return (
<>

                <tr id='table-row'>
                    <td><input name='name'    type='text' value={el.name} onChange={(e)=>handleEditChange(e,el)}/></td>
                    <td><input name='rank' value={el.rank} onChange={(e)=>handleEditChange(e,el)}/></td>
                    <td><span className='cols'><select className='bg-secondary text-white'  name='pref1' onChange={(e)=>handleEditChange(e,el)}>    
                        <option className='bg-secondary'>{el.pref1}</option>
                        {collegeData.map((data) => (
                            <option key={data.id} disabled={data.name===el.pref2 || data.name===el.pref3 || data.name===el.pref1} hidden={data.name===el.pref1} value={data.name} >{data.name}</option>

                        ))}</select></span></td>
               <td><span className='cols'><select name='pref2' onChange={(e)=>handleEditChange(e,el)}>    
                        <option >{el.pref2}</option>
                        {collegeData.map((data) => (
                            <option  key={data.id} disabled={data.name===el.pref1 || data.name===el.pref3 || data.name===el.pref2} hidden={data.name===el.pref2}     value={data.name} >{data.name}</option>

                        ))}</select></span></td>
                            <td><span className='cols'><select name='pref3' onChange={(e)=>handleEditChange(e,el)}>    
                        <option  >{el.pref3}</option>
                        {collegeData.map((data) => (
                            <option key={data.id}  disabled={data.name===el.pref1 || data.name===el.pref2 || data.name===el.pref3} hidden={ data.name===el.pref3}  value={data.name} >{data.name}</option>

                        ))}</select></span></td>
                        <td><button onClick={handleSave} className='btn btn-warning btn-sm'>Save</button></td>


                </tr>
        

</>
    )
}

export default EditableRow