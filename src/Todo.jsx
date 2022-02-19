import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NoteAltIcon from '@mui/icons-material/NoteAlt';


const getLocal =() => {
  const listData = localStorage.getItem('todos');
  if (listData){
    return JSON.parse(listData);
  } else {
    return [];
  }
}

const Todo = () => {
  const [oldData, setData] = useState();
  const [item, setItem] = useState(getLocal());
  const [edit, setEdit] = useState("");
  const [toggle, settoggle] = useState(false);


  const addItem = () =>{
    if(!oldData){
      alert("Plz fill the data")
    } else if(oldData && toggle ){
      setItem(
        item.map((curElem) => {
          if ( curElem.id === edit){
            return {...curElem, name:oldData}
          }
            return curElem;
        })
      )
      setData("");
    
    settoggle(false);
    }
    else
    {
      const obj = {
        id : new Date().getTime().toString(),
        name: oldData,
      };
      setItem([...item, obj]);
      setData("");
    }
  }

  const delItem = (cur) => {
    const update = item.filter((elem) => {
      return elem.id !== cur ;

    })
    setItem(update);
  } 

  const editItem = (cur) => {
    const editUpdate = item.filter((elem) => {
      return elem.id === cur ;
    })
    const [showUpdate] = editUpdate
    setData(showUpdate.name);
    setEdit(cur);
    settoggle(true);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(item));
    
  }, [item])
  

  return (
    <>
    <div className='container-fluid'>
            <div className='col-sm-10 mx-auto text-center p-2'>
            <img src="Images/notes.png" alt="notes" width={100}/>
            <h1>🗒️ Todo - List 👍</h1>
    <div className="design ">
    <input type="text" 
    placeholder='✍️ Add Item'
    onChange={(event) => setData(event.target.value)}
    className="col-sm-6 text-center"
    name='tododata'
    value={oldData} />
    
    {toggle ? <button className='btn btn-success sam ' onClick={addItem}>
    <NoteAltIcon className='text-light bg-transparent p-n5' /></button> : 
    <button className='btn btn-success sam' onClick={addItem}> Add</button>}
    </div>
    <hr />

    
    {
      item.map((curElem)=> {
        return (
          <>
          <div key={curElem.id} className="design col-sm-8  mx-auto ">
            <p>{curElem.name}
            <NoteAltIcon onClick={() => editItem(curElem.id)} className="deco text-success bg-transparent " />
            <DeleteForeverIcon onClick={() => delItem(curElem.id)} className="deco text-danger bg-transparent " />
            </p>
            </div>
          </>
        )
      } )
    }
    </div>
    </div>
    </>
  )
   
}

export default Todo