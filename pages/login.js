import axios from 'axios'
import React from 'react'
import { withRouter } from 'next/router';
import chooseOption from '../pages/chooseOption'
import Nav from '../Components/Nav';
import { useAppContext } from '../context/ContextProvider';
function login(props) {
    console.log(props)
    const [name1,setNmae]=React.useState("")
    const [password,setpassword]=React.useState("")
    const {auth1,setAuth1,user_details,setUser_details,settrip_data}=useAppContext()
    const handleChange=(e)=>{
        const {name,value}=e.target
        if(name=="password"){
            setpassword(value)
        }
        else{
            setNmae(value)
        }
    }
    console.log(name1,password)
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.get(`http://localhost:3011/users?name=${name1}&password=${password}`)
        .then((res) =>{
            var dat=res.data
            if(dat.length==1){
                setUser_details(dat)
                // settrip_data(user_details[0].create_ride)
                setAuth1(true)
                props.router.push('/chooseOption')
            }
        })
        // settrip_data(user_details[0].create_ride)

    }
    const handleLogout=()=>{
        setUser_details({})
        setAuth1(false)
    }
    return (!auth1?
        <div>
            <form onSubmit={handleSubmit}> 
            <input type="text" placeholder="name" value={name1} name="name" onChange={handleChange}/>
            <input type="password" placeholder="password" value={password} name="password" onChange={handleChange}/>
            <input type="submit" value="login"/>
            </form>
            
        </div>:<button onClick={handleLogout}>Logout</button>
    )
}

export default withRouter(login)
