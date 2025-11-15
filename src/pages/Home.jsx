

import React, { use } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Home() {

    let {user}=useAuth()

    return (
        <div>
            Home <br />
            hi {user &&user.name}
     
        </div>
    )
}
