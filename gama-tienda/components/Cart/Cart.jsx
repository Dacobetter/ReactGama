
import { Link } from 'react-router-dom'
import { CartContext } from '../Cart/CartContext'
import CartList from '../Cart/CartList'
import React, {useContext} from 'react'

function Cart() {
  const { cartList } = useContext(CartContext);

  const renderEmptyCart = (
    <div className="container mt-5">
      <div className="row text-center justify-content-center">
        <h3 className="my-5"><strong>No hay productos en tu carrito</strong></h3>
        <h4 className="my-5">¡Agrega algo!</h4>
        <Link className="btn btn-primary w-25" to="/">
          Ir a comprar
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {cartList.length === 0 ? renderEmptyCart : <CartList />}
    </>
  );
}

export default Cart;