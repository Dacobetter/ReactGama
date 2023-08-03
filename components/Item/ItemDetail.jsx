import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { CartContext } from '../Cart/CartContext';
import Modificador from './Modificador'


function ItemDetail({ product }) {
    const [goToCart, setGoToCart] = useState(false);
    const { addToCart } = useContext(CartContext);

    const onAdd = (quantity) => {
        setGoToCart(true);
        addToCart({ ...product, quantity: quantity });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center text-center align-items-center">
                <div className="col-lg-5 col-md-11 col-sm-12 pb-4">
                    <img src={product.img} alt={product.name} className="itemDetail-img" />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                    <h2 className="fw-bold">{product.name}</h2>
                    <p>{product.description}</p>
                    <h5>Disponible: {product.stock}</h5>
                    <h4>${product.price}</h4>

                    {!goToCart ? (
                        <Modificador initial={1} max={product.stock} onAdd={onAdd} />
                    ) : (
                        <div className="">
                            <Link to={`/`}><button className="btn btn-primary bg-gradient ms-3 mt-3">Seguir comprando</button></Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemDetail;