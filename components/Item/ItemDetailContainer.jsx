import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import ItemDetail from './ItemDetail'
import Loader from '../Loader'
import { Hero } from '../Hero'

function ItemDetailContainer() {
  const { idProduct } = useParams();
  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState({});
  const location = useLocation();
  
  const isHeroVisible = () => {
    const pathsToShowHero = ['/', '/categoria/:idCategory'];
    return pathsToShowHero.some((path) =>
      location.pathname.startsWith(path.replace(':idCategory', ''))
    );
  };

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const db = getFirestore();
        const queryDb = doc(db, 'items', idProduct);
        const productoDatos = await getDoc(queryDb);
        setProducto({ id: productoDatos.id, ...productoDatos.data() });
      } catch (error) {
        console.error('Error en el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [idProduct]);

  return (
    <>
      {isHeroVisible() && <Hero />}
    <div>
      {loading ? <Loader /> : <ItemDetail product={producto} />}
    </div>
    </>
  );
}

export default ItemDetailContainer;