
import React, {useContext} from 'react'
import { CartContext } from './CartContext';
import Badge from 'react-bootstrap/Badge';

function CartWidget() {
    const { cartList, cartCounter } = useContext(CartContext)

    return (
        <>
            <img className= "carrito" src="https://i.postimg.cc/SRGCQ7Dj/carrito-de-compras.png" alt="Carrito"></img>
            {cartList.length === 0 
            ?
                <span></span>
            :
                <Badge pill bg="info">{cartCounter()}</Badge>}
        </>
    )
}

export default CartWidget;