import { useEffect, useState } from 'react';
import { deleteBook, getBooks } from '../../../_services/books';
import { getGenres } from '../../../_services/genres';
import { Link } from 'react-router-dom';
import { getAuthors } from '../../../_services/authors';

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [openDropdown, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [booksData, genresData, authorsData] = await Promise.all([
        getBooks(),
        getGenres(),
        getAuthors(),
      ]);
      setBooks(booksData);
      setGenres(genresData);
      setAuthors(authorsData);
    };
    fetchData();
  }, []);

  const getGenreName = (id) => {
    const genre = genres.find((genre) => genre.id === id);
    return genre ? genre.name : 'Unknown Genre';
  };

  const getAuthorName = (id) => {
    const author = authors.find((author) => author.id === id);
    return author ? author.name : 'Unknown Author';
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdown === id ? null : id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  return (
    <section className="bg-white p-5 min-h-screen text-gray-800">
      <div className="bg-white relative shadow-lg rounded-xl overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between p-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-700"> Books</h1>

          <div className="flex items-center space-x-3 mt-3 md:mt-0">
            <div className="relative">
              <input
                type="text"
                id="simple-search"
                placeholder="Search..."
                className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none w-60"
              />
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <Link
              to="/admin/books/create"
              className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm px-4 py-2 shadow-md transition-all"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Add Book
            </Link>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-indigo-100 text-indigo-800 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Cover</th>
                <th className="px-4 py-3 text-left">Genre</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr
                    key={book.id}
                    className="border-b border-gray-200 hover:bg-indigo-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">{book.title}</td>
                    <td className="px-4 py-3">{book.price}</td>
                    <td className="px-4 py-3">{book.stock}</td>
                    <td className="px-4 py-3">{book.cover_photo}</td>
                    <td className="px-4 py-3">{getGenreName(book.genre_id)}</td>
                    <td className="px-4 py-3">{getAuthorName(book.author_id)}</td>
                    <td className="px-4 py-3 text-right relative">
                      <button
                        onClick={() => toggleDropdown(book.id)}
                        className="text-gray-600 hover:text-indigo-600 p-1"
                      >
                        ⋮
                      </button>

                      {openDropdown === book.id && (
                        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <ul className="py-1 text-sm">
                            <li>
                              <Link
                                to={`/admin/books/edit/${book.id}`}
                                className="block px-4 py-2 hover:bg-indigo-50 text-gray-700"
                              >
                                Edit
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDelete(book.id)}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 bg-white"
                  >
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex justify-between items-center p-4 text-sm text-gray-500">
          <span>
            Showing <span className="font-medium text-gray-800">1-10</span> of{' '}
            <span className="font-medium text-gray-800">100</span>
          </span>

          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded-md border text-gray-600 hover:bg-indigo-50 hover:text-indigo-700">
              ‹
            </button>
            <button className="px-3 py-1 rounded-md border bg-indigo-100 text-indigo-700 font-semibold">
              1
            </button>
            <button className="px-3 py-1 rounded-md border text-gray-600 hover:bg-indigo-50 hover:text-indigo-700">
              2
            </button>
            <button className="px-3 py-1 rounded-md border text-gray-600 hover:bg-indigo-50 hover:text-indigo-700">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
