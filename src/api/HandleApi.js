import axios from 'axios'

const Url="https://todo-be-ldmc.onrender.com";

const getAllTodo=(setTodo)=>{
    axios.get(Url)
    .then(({data})=>{
        console.log(data);
        setTodo(data);
    })
}

const addTodo=(text,setText,setTodo)=>{

    axios.post(`${Url}/save`,{text})
    .then(data=>{        
        setText("")
        getAllTodo(setTodo)
    })
    .catch(err=>console.error(err));
}

const updateTodo=(todoId,text,setTodo,setText,setIsUpdating)=>{

    axios.post(`${Url}/update`,{_id:todoId,text})
    .then(data=>{
        setText("")
        setIsUpdating(false)
        getAllTodo(setTodo)
    })
    .catch(err=>console.error(err));
}

const deleteTodo=(_id,setTodo)=>{

    axios.post(`${Url}/delete`,{_id})
    .then(data=>{        
        getAllTodo(setTodo)
    })
    .catch(err=>console.error(err));
}

export {getAllTodo,addTodo,updateTodo,deleteTodo}