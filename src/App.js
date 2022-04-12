import { useState } from 'react'
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


const initialData = [
  { id: uuidv4(), name: "Rohan", rank: 2, pref1: "IIT Kanpur", pref2: "IIT Madras", pref3: "IIT Hyderabad" },
  { id: uuidv4(), name: "Roshan", rank: 1, pref1: "IIT Bombay", pref2: "IIT Kanpur", pref3: "IIT Hyderabad" },
  { id: uuidv4(), name: "Ankit", rank: 4, pref1: "IIT Roorkee", pref2: "IIT Bombay", pref3: "IIT Hyderabad" },
];

const initialCollegeName = [
  { "id": 1, "name": "IIT Madras", "noOfSeats": 4 },
  { "id": 2, "name": "IIT Kanpur", "noOfSeats": 2 },
  { "id": 3, "name": "IIT Bombay", "noOfSeats": 1 },
  { "id": 4, "name": "IIT Hyderabad", "noOfSeats": 3 },
  { "id": 5, "name": "IIT Roorkee", "noOfSeats": 1 },
  { "id": 6, "name": "IIM Ahemedabad", "noOfSeats": 2 },
]

const studData = {
  id: uuidv4(),
  name: "",
  rank: "",
  pref1: "",
  pref2: "",
  pref3: "",
}

function App() {

  const [collegeData, setCollegeData] = useState(initialCollegeName)
  const [userData, setUserData] = useState([...initialData])
  const [defaultSelect, setDefault] = useState([])
  const [formData, setFormData] = useState(studData)
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
    const arr = [];
    for (let key in el) {
      if (key === "pref1" || key === "pref2" || key === "pref3") {
        arr.push(el[key])
      }
    }
    setDefault([...defaultSelect, ...arr])

  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    const newEditFormData = { ...editData, [name]: value }
    setEditData(newEditFormData)
    setCollegeData(initialCollegeName)
  }

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


  const handleChange = e => {
    // e.preventDefault();
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    //for disabling the selections
    if (name === "pref1" || name === "pref2" || name === "pref3") {
      setDefault([...defaultSelect, value])
    }
  };

  const handleSaveData = (e) => {
    e.preventDefault()
    const rankExist = userData.filter((el) => (
      Number(el.rank) === Number(formData.rank)
    ))
    if (formData.name === "" || formData.rank === "" || formData.pref1 === "" || formData.pref2 === "" || formData.pref3 === "") {
      toast.warning("Enter all fields")
      return
    }
    else if (rankExist.length) {
      toast.error("Rank already Exist")
      return;
    } else {
      setUserData(prev => ([...prev, formData]))
      setFormData(studData)
    }
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



  // function for handling result
  const handleResult = () => {
    setOk(true);
    const result=[]
    const resData = [...userData];
    resData.sort((a, b) => a.rank - b.rank)
    let res = false;
    const instData=initialCollegeName
    
    for (let i = 0; i < resData.length; i++) {
      for (let k = 1; k < 4; k++) {
        for (let j = 0; j < instData.length; j++) {
          if(k===1){
            if (resData[i].pref1=== instData[j].name && instData[j].noOfSeats > 0) {
              instData[j].noOfSeats = instData[j].noOfSeats - 1;
              const newRes = { name: resData[i].name, rank: resData[i].rank, allotSeat: instData[j].name }
              result.push(newRes)
              res = true;
              
            }
          }else if(k===2){
            if (resData[i].pref2=== instData[j].name && instData[j].noOfSeats > 0) {
              instData[j].noOfSeats = instData[j].noOfSeats - 1;
              const newRes = { name: resData[i].name, rank: resData[i].rank, allotSeat: instData[j].name }
              result.push(newRes)
              res = true;
              
            }
          }else if(k===3){
            if (resData[i].pref3=== instData[j].name && instData[j].noOfSeats > 0) {
              instData[j].noOfSeats = instData[j].noOfSeats - 1;
              const newRes = { name: resData[i].name, rank: resData[i].rank, allotSeat: instData[j].name }
              result.push(newRes)
              res = true;
              
            }
          }

          if (res) break;

        }
        if (res) {
          break;
        } 
      }
if(!res){
    const newRes = { name: resData[i].name, rank: resData[i].rank, allotSeat: "Not Alloted" }
    result.push(newRes)
}
res=false



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
                el.id === editId ? <EditableRow  handleSave={handleSave} defaultSelect={defaultSelect} handleEditChange={handleEditChange} el={editData} collegeData={collegeData} /> :
                  <>
                    <StudList el={el} handleEditId={handleEditId} setUserData={setUserData} />

                    {/* <Result userData={userData} setUserData={setUserData}/> */}
                  </>

              )}
            </tbody>
          </table>

        </form>
        <Dialog editId={editId} handleSaveData={handleSaveData} collegeData={collegeData} formData={formData} handleChange={handleChange} defaultSelect={defaultSelect} handleResult={handleResult} />
        <button disabled={editId} onClick={handleResult} id='btn' className="btn btn-primary">Get Results</button>
      </div>
      {ok ? <Result setResultData={setResultData} resultData={resultData} /> : null}
    </div>
  );
}

export default App;