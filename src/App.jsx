import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import MyPage from "./pages/MyPage.jsx";
import Product from "./pages/Product.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NoFound.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
