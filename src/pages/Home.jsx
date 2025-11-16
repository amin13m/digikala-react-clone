

import React, { use } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useCartDetails } from '../hooks/useCartDetails'

export default function Home() {

    let {user}=useAuth()
    let { addItem} = useCart()
    let  { cartDetails, isLoading } = useCartDetails()

    return (
        <div>
            Home <br />
            hi {user &&user.name}
            <br />
            cart {cartDetails&& JSON.stringify(cartDetails) }
            <br />
            <button onClick={()=>addItem({id :"2"})}>add</button>
            {}
        </div>
    )
}
