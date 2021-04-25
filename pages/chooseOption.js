import React from 'react'
import { withRouter } from 'next/router';
import { useAppContext } from '../context/ContextProvider';
function chooseOption(props) {
    // const {auth1}=useAppContext()
    // console.log(auth1)
    return (
        <div>
            <button onClick={() => props.router.push('/joinRide')}>JOIN RIDE</button>
            <button onClick={() => props.router.push('/createRide')}>CREATE RIDE</button>
        </div>
    )
}

export default withRouter(chooseOption)
