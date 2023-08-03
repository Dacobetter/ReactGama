import {useState, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import ItemList from './Itemlist'
import Loader from '../Loader'
import { Hero } from '../Hero';



function ItemListContainer({ greeting }) {
  const [datosProductos, setDatosProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idCategory } = useParams();
  const location = useLocation();

  const isHeroVisible = () => {
    const pathsToShowHero = ['/', '/categoria/:idCategory'];
    return pathsToShowHero.some((path) =>
      location.pathname.startsWith(path.replace(':idCategory', ''))
    );
  };
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const db = getFirestore();
        let consultaProductos;
        if (idCategory) {
          consultaProductos = query(collection(db, 'items'), where('category', '==', idCategory));
        } else {
          consultaProductos = collection(db, 'items');
        }

        const datosConsulta = await getDocs(consultaProductos);
        const productos = datosConsulta.docs.map((prod) => ({ id: prod.id, ...prod.data() }));
        setDatosProductos(productos);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [idCategory]);

  return (
    <>
      {isHeroVisible() && <Hero />}
    <div>
      <h2 className="text-center">{greeting}</h2>
      <div className="container">
        <div className="row">
          {loading ? <Loader /> : <ItemList products={datosProductos} />}
        </div>
      </div>
    </div>
    </>
    );
}

export default ItemListContainer;