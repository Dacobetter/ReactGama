import { useState, useContext } from 'react'
import { getFirestore, collection, writeBatch, addDoc, Timestamp, doc} from 'firebase/firestore'
import { CartContext } from './Cart/CartContext'
import { Link } from 'react-router-dom'
import Loader from './Loader'

function Checkout() {
    const [orderId, setOrderId] = useState('');
    const [creatingOrder, setCreatingOrder] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      emailConfirm: '',
      phone: '',
    });
    const { cartList, totalBuy, emptyCart } = useContext(CartContext);
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const createOrder = (e) => {
      e.preventDefault();
      setCreatingOrder(true);
      delete formData.emailConfirm;
      const order = {
        date: Timestamp.fromDate(new Date()),
        buyer: formData,
        total: totalBuy(),
        items: cartList.map((cartItem) => ({
          id: cartItem.id,
          name: cartItem.name,
          price: cartItem.price,
          quantity: cartItem.quantity,
          totalPrice: cartItem.price * cartItem.quantity,
        })),
      };
  
      const db = getFirestore();
      const orderCollection = collection(db, 'orders');
      addDoc(orderCollection, order)
        .then((resp) => setOrderId(resp.id))
        .catch((err) => console.log(err))
        .finally(() => {
          setCreatingOrder(false);
          updateStock();
          emptyCart();
          setFormData({
            name: '',
            email: '',
            emailConfirm: '',
            phone: '',
          });
        });
    };
  
    const updateStock = () => {
      const batch = writeBatch(db);
  
      order.items.forEach((el) => {
        const updateDoc = doc(db, 'items', el.id);
        const currentStock = cartList.find((item) => item.id === el.id).stock;
  
        batch.update(updateDoc, {
          stock: currentStock - el.quantity,
        });
      });
  
      batch.commit();
    };
  
    return (
      <>
        {creatingOrder ? (
          <>
            <h4 className="mt-5 text-center">Procesando compra....</h4>
            <Loader />
          </>
        ) : orderId ? (
          <div className="container">
            <div className="py-5 text-center mt-5">
            <h2 className="my-5">Tienda Gama</h2>
              <h2 className="my-5">La compra se ha realizado exitosamente.</h2>
              <strong>El numero de su compra es: {orderId}</strong>
              <br />
              <Link className="btn btn-primary " to={`/`}>
                <strong>Volver al inicio</strong>
              </Link>
            </div>
          </div>
        ) : (
          <div className="container mt-5 form__container d-flex">
            <div className="container align-self-center position-relative">
              <div className="row">
                <div className="col-12">
                  <form
                    className="d-flex flex-column"
                    onSubmit={createOrder}
                    onChange={handleChange}
                  >
                    <div className="mb-3 d-flex flex-column align-items-center">
                      <h2>Datos del comprador</h2>
                      <label className="form-label">Nombre y apellido</label>
                      <input
                        type="name"
                        className="form-control form-control--color"
                        name="name"
                        defaultValue={formData.name}
                        required
                      />
                    </div>
                    <div className="mb-3 d-flex flex-column align-items-center">
                      <label className="form-label">Celular</label>
                      <input
                        type="number"
                        className="form-control form-control--color"
                        name="phone"
                        placeholder="323 ******0"
                        defaultValue={formData.phone}
                        required
                      />
                    </div>
                    <div className="mb-3 d-flex flex-column align-items-center">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control form-control--color"
                        name="email"
                        placeholder="@ejemplo.com"
                        defaultValue={formData.email}
                        required
                      />
                    </div>
                    <div className="mb-3 d-flex flex-column align-items-center">
                      <label className="form-label">Confirmar Email</label>
                      <input
                        type="email"
                        className="form-control form-control--color"
                        name="emailConfirm"
                        placeholder="@ejemplo.com"
                        defaultValue={formData.emailConfirm}
                        required
                      />
                    </div>
                    <button
                      className="btn  btn-primary d-flex justify-content-center align-self-center "
                      disabled={
                        !formData.name ||
                        !formData.phone ||
                        !formData.email ||
                        formData.email !== formData.emailConfirm ||
                        cartList.length === 0
                      }
                    >
                      Comprar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  
  export default Checkout;