import React from 'react'
import { useAppContext } from '../context/ContextProvider'

function Nav() {
    const {auth1}=useAppContext()
    console.log(auth1)
    return (
        <div>
            <p></p>
        </div>
    )
}

export default Nav
