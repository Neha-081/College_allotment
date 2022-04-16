import {  useState } from 'react'
import './App.css';
import StudList from './components/StudList';
import Dialog from './components/Dialog';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Result from './components/Result';
import EditableRow from './components/EditableRow';
import { HiOutlineHashtag } from 'react-icons/hi';
import { AiOutlineAlignLeft, AiFillCaretDown } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';


let initialData = [
  { id: uuidv4(), name: "Rohan", rank: 2, pref1: "IIT Kanpur", pref2: "IIT Madras", pref3: "IIT Hyderabad" },
  { id: uuidv4(), name: "Roshan", rank: 1, pref1: "IIT Bombay", pref2: "IIT Kanpur", pref3: "IIT Hyderabad" },
  { id: uuidv4(), name: "Ankit", rank: 4, pref1: "IIT Roorkee", pref2: "IIT Bombay", pref3: "IIT Hyderabad" },
];



let studData = {
  id: uuidv4(),
  name: "",
  rank: "",
  pref1: "",
  pref2: "",
  pref3: "",
}

function App() {
  var initialCollegeName = [
    { "id": uuidv4(), "name": "IIT Kanpur", "noOfSeats": 2 },
    { "id": uuidv4(), "name": "IIT Bombay", "noOfSeats": 1 },
    { "id": uuidv4(), "name": "IIT Madras", "noOfSeats": 4 },
    { "id": uuidv4(), "name": "IIT Hyderabad", "noOfSeats": 3 },
    { "id": uuidv4(), "name": "IIT Roorkee", "noOfSeats": 1 },
    { "id": uuidv4(), "name": "IIT Ahemedabad", "noOfSeats": 2 },
  ]

  const [collegeData, setCollegeData] = useState(initialCollegeName)
  const [userData, setUserData] = useState([...initialData])
  const [defaultSelect, setDefault] = useState([])
  const [formData, setFormData] = useState(studData)
  const [check,setCheck]=useState({})
  const [editId, setEditId] = useState(null)
  const [ok, setOk] = useState(false)
  const [resultData, setResultData] = useState([])
  const [editData, setEditData] = useState({
    name: "",
    rank: "",
    pref1: "",
    pref2: "",
    pref3: "",
  })



  //function to edit the row
  const handleEditId = (id, el) => {
    setEditId(id)
    setEditData({ ...editData, ...el })
  }

  //handling edit changes

  const handleEditChange = (e,rowData) => {

    const { name, value } = e.target;
    const newEditFormData = { ...editData, [name]: value }
    
    check.pref1=rowData.pref1
    check.pref2=rowData.pref2
    check.pref3=rowData.pref3
    if(name==="pref1" || name==="pref2" || name==="pref3" ){
      check[name]=value;
      const filterEditArr=Object.values(check);
      setDefault(filterEditArr)
    }

    setEditData(newEditFormData)
    setCollegeData(initialCollegeName)
  }

  //handling saving data after edit
  const handleSave = (e) => {
    e.preventDefault()
    const newUserData = [...userData]
    for (let i = 0; i < newUserData.length; i++) {
  
      if (newUserData[i].id === editId) {
        newUserData[i] = editData
      }
    }
  
    setUserData(newUserData)
    setEditId(null)
    setDefault([])

  }

//handling changing formdata
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
//for disabling the selections
    if (name === "pref1" || name === "pref2" || name === "pref3") {
      if (check.pref1 !== undefined || check.pref2 !== undefined|| check.pref3 !== undefined) {   //checking if preferences exist
        check[name] = value       // overwriting the existing preferneces
        const filterArr = Object.values(check)  //return an array of selected preferneces values
        setDefault(filterArr)
        
      } else {
        check[name] = value;
        const filterArr = Object.values(check)
      setDefault(filterArr)
      }
      setCheck(check)
    }

  };

  const handleSaveData = (e) => {
    const rankExist = userData.filter((el) => (
      Number(el.rank) === Number(formData.rank)
    ))
    if (formData.name === "" || formData.rank === "" || formData.pref1 === "" || formData.pref2 === "" || formData.pref3 === "") {
      toast.warning("Enter all fields")
    }
    else if (rankExist.length) {
      toast.error("Rank already Exist")
    } else {
      setUserData(prev => ([...prev, formData]))
      
    }
    setFormData(studData)
    setDefault([])
  }

  //sorting for rank
  const handleRank = () => {
    setUserData(() => {
      return [...userData.sort((a, b) => {
        return +a.rank - +b.rank
      })]
    })
  }


  function strings(a, b) {
    a = a.toLowerCase()
    b = b.toLowerCase()
    return (a < b) ? -1 : (a > b)
  }

  //sorting for name
  const handleName = () => {
    setUserData(() => {
      return [...userData.sort((a, b) => {
        return strings(a.name, b.name)
      }
      )]
    })
  }

  //sorting for prefernce 1
  const handlePref1 = () => {
    setUserData(() => {
      return [...userData.sort((a, b) => {
        return strings(a.pref1, b.pref1)
      }
      )]
    })
  }
  //sorting for prefernce 2
  const handlePref2 = () => {
    setUserData(() => {
      return [...userData.sort((a, b) => {
        return strings(a.pref2, b.pref2)
      }
      )]
    })
  }
  //sorting for prefernce 3
  const handlePref3 = () => {
    setUserData(() => {
      return [...userData.sort((a, b) => {
        return strings(a.pref3, b.pref3)
      }
      )]
    })
  }


  const hideResults=()=>{
    setOk(false)
  }


  // function for handling result
  let handleResult = () => {
    setOk(true);
    let result = [];
    const resData = [...userData];
    resData.sort((a, b) => a.rank - b.rank)

    for (let i = 0; i < resData.length; i++) {
      
      let checkPref1 = initialCollegeName.filter((el) => el.name === resData[i].pref1);
      let checkPref2 = initialCollegeName.filter((el) => el.name === resData[i].pref2);
      let checkPref3 = initialCollegeName.filter((el) => el.name === resData[i].pref3);

      if (checkPref1[0].noOfSeats >= 1) {
        checkPref1[0].noOfSeats = checkPref1[0].noOfSeats - 1;
        result.push({ name: resData[i].name, rank: resData[i].rank, allotedSeat: checkPref1[0].name });
      } else if (checkPref2[0].noOfSeats >= 1) {
        checkPref2[0].noOfSeats = checkPref2[0].noOfSeats - 1;
        result.push({ name: resData[i].name, rank: resData[i].rank, allotedSeat: checkPref2[0].name });
      } else if (checkPref3[0].noOfSeats >= 1) {
        checkPref3[0].noOfSeats = checkPref3[0].noOfSeats - 1;
        result.push({ name: resData[i].name, rank: resData[i].rank, allotedSeat: checkPref3[0].name });
      }else{
        result.push({ name: resData[i].name, rank: resData[i].rank, allotedSeat: "NA" });
      }

    }
    setResultData(result)

  }



  return (

    <div className="App">
      <ToastContainer />
      <div>
        <h1>College Allotment System</h1>
        <form>
          <table className="table table-bordered">
            <caption>Students List</caption>
            <tbody>

              <tr id='mainrow'>
                <td><AiOutlineAlignLeft /><span>Student  Name</span><AiFillCaretDown onClick={handleName} /></td>
                <td><HiOutlineHashtag /><span>Rank</span><AiFillCaretDown onClick={handleRank} /></td>
                <td><IoIosArrowDropdown /><span>College preference 1</span><AiFillCaretDown onClick={handlePref1} /></td>
                <td><IoIosArrowDropdown /><span>College preference 2</span><AiFillCaretDown onClick={handlePref2} /></td>
                <td><IoIosArrowDropdown /><span>College preference 3</span><AiFillCaretDown onClick={handlePref3} /></td>
                <td>Edit</td>
              </tr>
              {userData.map((el) =>
                el.id === editId ? <EditableRow key={el.id} handleSave={handleSave} handleEditChange={handleEditChange} el={editData} collegeData={collegeData} /> :

                  <StudList el={el} key={el.id} handleEditId={handleEditId} />

              )}
            </tbody>
          </table>

        </form>
        <Dialog editId={editId} handleSaveData={handleSaveData} collegeData={collegeData} formData={formData} handleChange={handleChange} defaultSelect={defaultSelect} handleResult={handleResult} />
        
        {ok?<button id='btn' className='btn btn-primary' onClick={hideResults}>Hide Results</button>:
        <button disabled={editId} onClick={handleResult} id='btn' className="btn btn-primary">Get Results</button>
              }
        </div>
      {ok ? <Result hideResults={hideResults} setResultData={setResultData} resultData={resultData} /> : null}
    </div>
  );
}

export default App;
