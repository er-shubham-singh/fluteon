// import { Route, Routes, useLocation } from 'react-router-dom';
// import './App.css';
// import CustomerRoutes from './Routers/CustomerRoutes';

// import api from '../src/config/api';

// import ScrollToTop from './customer/Components/ScrollTop';
// function App() {
//   const isAdmin=true;
//   return (
//     <>
    
//       <ScrollToTop />
//       {/* <ContactSidebar /> */}
//       <Routes>
//         <Route path="/*" element={<CustomerRoutes />} />
//       </Routes>
//     </>
//   );
// }

// export default App;


import { Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerRoutes from './Routers/CustomerRoutes';
import ScrollToTop from './customer/Components/ScrollTop';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromToken } from './Redux/Auth/Action'; // ✅ Make sure path is correct

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromToken()); // 🔐 Auto-login from localStorage JWT token
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>
    </>
  );
}

export default App;
