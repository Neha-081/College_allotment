import React from 'react';
import { HiOutlineHashtag } from 'react-icons/hi';
import { AiOutlineAlignLeft,AiFillCaretDown } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';
import '../styles/table.css'


function Result({setResultData,resultData}) {

  //sorting for rank
  const ResultHandleRank = () => {
    setResultData(() => {
      return [...resultData.sort((a, b) => {
        return +a.rank - +b.rank
      })]
    })
  }
 
 
   function strings(a,b){
     a=a.toLowerCase()
     b=b.toLowerCase()
     return (a<b) ? -1 : (a>b)
 }
 
   //sorting for name
   const ResultHandleName = () => {
    setResultData(() => {
      return [...resultData.sort((a, b) => {
        return strings(a.name, b.name)
      }
      )]
    })
  }

  //sorting for alloted college
  const ResultHandleAllot = () => {
    setResultData(() => {
      return [...resultData.sort((a, b) => {
        return strings(a.allotSeat, b.allotSeat)
      }
      )]
    })
  }


  return (
    <div>
         <table className="table table-bordered">
  <caption>Students List</caption>

  <tbody>

  <tr id='mainrow'>
      <td><AiOutlineAlignLeft /><span>Student  Name</span><AiFillCaretDown onClick={ResultHandleName} /></td>
      <td><HiOutlineHashtag /><span>Rank</span><AiFillCaretDown onClick={ResultHandleRank}/></td>
      <td><IoIosArrowDropdown /><span>Alloted College</span><AiFillCaretDown onClick={ResultHandleAllot}/></td>
    </tr>
    {resultData.map((el)=>(
      <tr id='table-row' key={el.id}>
        <td>{el.name}</td>
        <td>{el.rank}</td>
      <td><span className='cols'>{el.allotSeat}</span></td>
      </tr>
    ))}


  </tbody>
</table>
    </div>
  )
}

export default Result