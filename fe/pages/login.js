import React from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import AppContext from '../components/AppContext'

const login = () => {

    // const {password,setPassword,mobile,setMobile} = React.useContext(AppContext)

    const [userName,setUserName] = React.useState('')
    const [mobile,setMobile] = React.useState('')
    const [password, setPassword] = React.useState('')

    
    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            mobile,
            password
        }
        console.log(payload)

        axios.post("http://localhost:8071/login",payload).then(res => console.log("Success"))

    }
    return (
            <form onSubmit={handleSubmit}>
                <input value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Enter valid Mobile Number"/>
                <br/>
                <input value={password}  type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter a Password"/>
                <br/>
                <input type="submit" value='Login' />
            </form>
    )
}

export default login
