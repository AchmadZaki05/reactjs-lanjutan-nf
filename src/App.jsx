import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/public"
import PublicLayout from './layouts/public';
import Books from './pages/public/books/index';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import AdminLayout from './layouts/admin';
import Dashboard from './pages/admin/index';
import AdminBooks from './pages/admin/books/index';
import BookCreate from './pages/admin/books/create';


import AdminGenres from './pages/admin/genres/index';
import GenreCreate from './pages/admin/genres/create';
import AuthorCreate from "./pages/admin/authors/create";
import AdminAuthors from "./pages/admin/authors";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
        </Route>

        {/* Auth */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Admin */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="books">
            <Route index element={<AdminBooks />} />
            <Route path="create" element={<BookCreate />} />
          </Route>

          
          <Route path="genres">
            <Route index element={<AdminGenres />} />
            <Route path="create" element={<GenreCreate />} />
          </Route>

          <Route path="authors">
            <Route index element={<AdminAuthors />} />
            <Route path="create" element={<AuthorCreate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
