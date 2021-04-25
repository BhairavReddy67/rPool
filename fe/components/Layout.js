import Nav from './Nav'

import React from 'react'

const Layout = (props) => {
    return (
        <>
            <Nav />
            <div>

                <h3>welocm</h3>
                {props.children}
            </div>
        </>
    )
}

export default Layout
