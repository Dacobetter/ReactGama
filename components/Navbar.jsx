
import CartWidget from "./Cart/CartWidget";
import { Link } from "react-router-dom";


const Navbar = ({cartCount}) =>{
    return(
        <header className="navbar">
            <div className="">
            <Link to="/"><h1>Gama</h1></Link>
            </div>
            <div className="link">
                <nav>
                    <Link className="li" to="/categoria/componentes">Componentes</Link>
                    <Link className="li" to="/categoria/grafica">Graficas</Link>
                    <Link className="li" to="/categoria/periferico"> Periferocos </Link>
                    
                </nav>
            </div>
            <Link to="/cart"><CartWidget cartCount={cartCount} /></Link>
        </header>
    )
}
export default Navbar;
