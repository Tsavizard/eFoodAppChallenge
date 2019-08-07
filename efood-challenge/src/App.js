import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar"
import FoodMenu from "./components/menuComponents/foodMenu"
import SideMenu from './components/sideMenuComponents/sideMenu'
import ShoppingCart from './components/shoppingCart'
import LandingPage from "./components/landingPage"
import Checkout from './components/checkoutForm'
 
function App() {
  return ( 
  <Router>
    <Navbar />
    <div>
        <Route path="/" exact component={LandingPage} />
    </div>
    <div className="row">
      <div className="col-3">
      <Route path="/menu" exact component={SideMenu} />
      </div>
      <div className="col-7">  
        <Route path="/menu" exact component={FoodMenu} />
      </div>
      <div className="col-2">
        <Route path="/menu" exact component={ShoppingCart} />
      </div>
    </div>
    <div className="row">
      <div className="col-8">
        <Route path="/checkout" exact component={Checkout} />
      </div>
      <div className="col">
        <Route path="/checkout" exact component={ShoppingCart} />
      </div>
    </div>

</Router>
 );
}
export default App;