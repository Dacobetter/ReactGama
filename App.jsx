import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar';
import ItemListContainer from './components/Item/ItemListContainer';
import ItemDetailContainer from './components/Item/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Error404 from './Error404';
import CartContextProvider from './components/cart/CartContext';
import './App.css'
import Checkout from './components/checkout';
import { Footer } from './components/Footer';



function App() {

	return (
		<CartContextProvider>
			<BrowserRouter>
				<div className="App">
					<NavBar />

					<Routes>
						<Route exact path="/" element={<ItemListContainer />} />
						<Route exact path="/categoria/:idCategory" element={<ItemListContainer />} />
						<Route exact path="/detalle/:idProduct" element={<ItemDetailContainer />} />
						<Route exact path="/cart" element={<Cart />} />
						<Route exact path="/checkout" element={<Checkout />} />
						<Route path="*" element={<Error404 />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</CartContextProvider>
	);
}

export default App;