import { Link } from "react-router-dom";


const Item = ({ prod }) => {
  return (
    <div className="col-md-4">
      <div className="card col-sm-10">
        <img src={prod.img} className="card-img-top" alt={prod.name} />
        <div className="card-body text-center">
          <h4 className="card-title">{prod.name}</h4>
          <h5 className="card-text">${prod.price}</h5>
        </div>
        <div className="card-footer text-center">
          <Link to={`/detalle/${prod.id}`}><button className="btn btn-primary">Detalle</button></Link>
        </div>
      </div>
    </div>

  );
};

export default Item;