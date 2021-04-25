import React from 'react'
import { withRouter } from 'next/router';
import Nav from '../Components/Nav';



function Index(props) {
    return (
        <div>
            <Nav/>
            <p>Bhairav</p>
            <button onClick={() => props.router.push('/login')}>Login</button>
            <button onClick={() => props.router.push('/register')}>REGISTER</button>
        </div>
    )
}

export default withRouter(Index)