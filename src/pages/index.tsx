import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-style';
import { HomePage } from './HomePage';
// import { NotFoundPage } from './pages/NotFoundPage/Loadable';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}
