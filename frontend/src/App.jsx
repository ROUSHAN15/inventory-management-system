import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Root from './utils/Root';
import Login from './pages/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';

// ADMIN PAGES
import Dashboard from './pages/Dashboard';
import Categories from './components/Categories';
import Suppliers from './components/Suppliers';
import Products from './components/Product';
import UsersManagement from './components/UsersManagement';

// CUSTOMER PAGES
import CustomerProduct from "./components/CustomerProduct";
import Orders from './components/OrderList';
import Logout from './components/Logout';
import Profile from './components/Profile';
import AdminOrders from './components/AdminOrder';
import Summary from './components/Summary';

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Root />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoutes requireRole={["admin"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Summary/>}/>
          <Route path="categories" element={<Categories/>}/>
          <Route path="products" element={<Products/>}/>
          <Route path="suppliers" element={<Suppliers/>}/>
          <Route path="users" element={<UsersManagement/>}
          
          />
        <Route path="orders" element={<AdminOrders />} />
          <Route path="logout" element={<Logout />} />
           <Route path="profile" element={<Profile />} />
        </Route>

        {/* CUSTOMER DASHBOARD */}
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoutes requireRole={["customer"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route index element={<CustomerProduct />} />
          <Route path="my-orders" element={<Orders />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* UNAUTHORIZED */}
        <Route
          path="/unauthorized"
          element={<p className="font-bold text-3xl mt-20 ml-20">Unauthorized</p>}
        />

      </Routes>
    </Router>
  );
}

export default App;
