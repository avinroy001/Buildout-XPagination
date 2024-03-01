import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [apiData, setApiData] = useState([]);
  const [start,setStart] = useState(1);
  const [totalPage,setTotalPage]=useState(null);


  useEffect(()=>{
    axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
    .then((res)=>{setApiData(res.data)
      setTotalPage(Math.ceil((res.data).length/10))
    })
    .catch((err)=>console.log(err))
  },[])
  console.log(apiData);
  console.log(totalPage);

  const incre=()=>{
    setStart(start+1);
  }

  const decre=()=>{
    setStart(start-1);
  }

  const startIndex= (start-1)*10;
  const endIndex=startIndex+10;
  const fragment=apiData.slice(startIndex,endIndex);
  console.log(fragment);

  return (
    <div>
      <h3 className='heading'>Employee Data Table</h3>
      <div>
        <table cellSpacing='0' cellPadding='0' border='0'>
          <thead>
          <tr className='strip'>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
          </thead>

          <tbody>
            {fragment.map((el,i)=>(
              <tr key={i}>
              <td>{el.id}</td>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.role}</td>
            </tr>
              
            ))
            
            }
          </tbody>
        </table>
        <div className='butt'>
          <button disabled={start===1} onClick={decre}>Previous</button>
          <span>{start}</span>
          <button disabled={start===totalPage} onClick={incre}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default App
