import React, {useState} from 'react'

function Modificador({ initial, max, onAdd }) {
    const [value, setValue] = useState(initial);
  
    const btnPlus = () => {
      if (value < max) {
        setValue((prevValue) => prevValue + 1);
      }
    };
  
    const btnMinus = () => {
      if (value > initial) {
        setValue((prevValue) => prevValue - 1);
      }
    };
  
    const handleAddToCart = () => {
      onAdd(value);
    };
  
    return (
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <button onClick={btnMinus} className="btn btn-dark">
            -
          </button>
          <h3 className="m-3">{value}</h3>
          <button onClick={btnPlus} className="btn bg-info text-white">
            +
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={handleAddToCart} className="btn bg-primary text-white">Añadir </button>
        </div>
      </div>
    );
  }
  
  export default Modificador;