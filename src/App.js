import { Layout } from "./components/Layout";
import { Main } from "./pages/Main";
import { Posts } from "./pages/Posts";
import { Post } from "./pages/Post";
import { AddPost } from "./pages/AddPost";
import { EditPost } from "./pages/EditPost";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/posts" element={<Posts></Posts>}></Route>
        <Route path="/:id" element={<Post></Post>}></Route>
        <Route path="/:id/edit" element={<EditPost></EditPost>}></Route>
        <Route path="/new" element={<AddPost></AddPost>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>

      <ToastContainer position="bottom-right"></ToastContainer>
    </Layout>
  );
}

export default App;
