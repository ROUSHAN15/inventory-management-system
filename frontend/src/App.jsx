import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Root from './components/Root'
import Login from './pages/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root/>} />
        <Route path="/admin-dashboard" element={
           <ProtectedRoutes requireRole={["admin"]}>
            <Dashboard/>
        </ProtectedRoutes> } >
        {/* NESTED SUMMARY ROUTE */}
          
          <Route
            path='categories'
            element={<h1>Summary of categories</h1>}
          />
          <Route
            path='products'
            element={<h1>Summary of dashboard</h1>}
          />
          <Route
            path='suppliers'
            element={<h1>Summary of suppliers</h1>}
          />
          <Route
            path='orders'
            element={<h1>Summary of orders</h1>}
          />
          <Route
            path='users'
            element={<h1>Summary of users</h1>}
          />
        
        </Route>
        <Route path="/employee/dashboard" element={<h1>employee</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/unauthorized" element={<p className='font-bold-text-3xl mt-20 ml-20'>Unauthorized</p>} />

      </Routes>
    </Router>
  )
}

export default App;
