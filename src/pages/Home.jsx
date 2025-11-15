

import React, { use } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Home() {

    let {user}=useAuth()
    let {items , addItem} = useCart()

    return (
        <div>
            Home <br />
            hi {user &&user.name}
            <br />
            cart {items&& JSON.stringify(items) }
            <br />
            <button onClick={()=>addItem({id :"2"})}>add</button>
            {}
        </div>
    )
}
