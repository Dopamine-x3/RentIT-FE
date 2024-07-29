import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import MyPage from "./pages/MyPage.jsx";
import Product from "./pages/Product.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NoFound.jsx";
import Join from "./pages/Join.jsx";
import Search from "./pages/Search.jsx";
import Intro from "./pages/Intro.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:userName/:roomName" element={<Chat />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/join" element={<Join />} />
        <Route path="/search" element={<Search />} />
        <Route path="/intro" element={<Intro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
