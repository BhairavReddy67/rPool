import React from 'react'
import Link from 'next/link'
import styles from '../styles/Nav.module.css'

const Nav = () => {

    return (
        <div className={styles.container}>
            <Link href='/'>
                <h2 className ={styles.h2}>@rideIn</h2>
            </Link>
            <ul>

                <li>
                    <Link href="/register">Register</Link>
                </li>

                <li>
                    <Link href="/login">Login</Link>
                </li>

                <li>
                    <Link href="/about">About</Link>
                </li>
            </ul>
            <h4></h4>
        </div>
    )
}

export default Nav
