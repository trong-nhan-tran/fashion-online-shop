import 'bootstrap-icons/font/bootstrap-icons.css';

import { Route, Routes } from "react-router-dom";
import { Public, Home, ProductDetail, Register, Shop, Login } from "./pages/Public";
import { Member, Cart, Orders, Profile } from './pages/Member';
import { AdminLayout, CreateProduct, OrderManager,ProductManager, 
  UserManager, ProductColors, Variants, CreateUser, UpdateProduct, OrderDetail, UserDetail } from './pages/Admin';
import { publicRoute, memberRoute,  adminRoute} from "./routes";

function App() {
  return (
    <>
      <Routes>
            <Route path={publicRoute.PUBLIC} element={<Public/>}>
                <Route path={publicRoute.HOME} element={<Home/>} ></Route>
                <Route path={publicRoute.REGISTER} element={<Register/>} ></Route>
                <Route path={publicRoute.LOGIN} element={<Login/>} ></Route>
                <Route path={publicRoute.SHOP} element={<Shop/>} ></Route>
                <Route path={publicRoute.PRODUCT_DETAIL} element={<ProductDetail/>} ></Route>
            </Route>
            <Route path={memberRoute.MEMBER_HOME} element={<Member/>}>
                <Route path={memberRoute.PROFILE} element={<Profile/>} ></Route>
                <Route path={memberRoute.ORDERS} element={<Orders/>} ></Route>
                <Route path={memberRoute.CART} element={<Cart/>} ></Route>
            </Route>
            <Route path={adminRoute.ADMIN_HOME} element={<AdminLayout/>}>
                <Route path={adminRoute.ORDER_MANAGER} element={<OrderManager/>} ></Route>
                <Route path={adminRoute.PRODUCT_MANAGER} element={<ProductManager/>} ></Route>
                <Route path={adminRoute.USER_MANAGER} element={<UserManager/>} ></Route>
                <Route path={adminRoute.ADD_PRODUCT} element={<CreateProduct/>} ></Route>
                <Route path={adminRoute.ADD_USER} element={<CreateUser/>} ></Route>
                <Route path={adminRoute.PRODUCT_COLORS} element={<ProductColors/>} ></Route>
                <Route path={adminRoute.PRODUCT_VARIANTS} element={<Variants/>} ></Route>
                <Route path={adminRoute.UPDATE_PRODUCT} element={<UpdateProduct/>} ></Route>
                <Route path={adminRoute.ORDER_DETAIL} element={<OrderDetail/>} ></Route>
                <Route path={adminRoute.USER_DETAIL} element={<UserDetail/>} ></Route>
            </Route>
        </Routes>  

    </>
  )
}

export default App;
