import React from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import AppContext from '../components/AppContext'

const register = () => {

//   const {userName,setUserName,password,setPassword,mobile,setMobile} = React.useContext(AppContext)

  const [userName,setUserName] = React.useState('')
  const [mobile,setMobile] = React.useState('')
  const [password, setPassword] = React.useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            userName,
            mobile,
            password
        }
        console.log(payload)

        axios.post('http://localhost:8071/register',payload)
    }

    return (
            <form onSubmit={handleSubmit}>
                <input value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter your full name"/>
                <br/>
                <input value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Enter mobile"/>
                <br/>
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter a Password"/>
                <br/>
            <input type="submit" value='Register' />
            </form>
    )
}

export default register
