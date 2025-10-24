import { useEffect, useState } from "react";
import { getGenres, deleteGenre } from "../../../_services/genres";
import { Link, useNavigate } from "react-router-dom";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const result = await getGenres();
      setGenres(result || []);
    } catch (error) {
      console.error("Failed to fetch genres:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah kamu yakin ingin menghapus genre ini?")) return;

    try {
      await deleteGenre(id);
      alert("Genre berhasil dihapus!");
      fetchGenres();
    } catch (error) {
      console.error("Failed to delete genre:", error);
      alert("Gagal menghapus genre.");
    }
  };

  return (
    <section className="p-6 bg-white text-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-700"> Genres</h1>
        <Link
          to={"/admin/genres/create"}
          className="flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-4 py-2 shadow-md transition-all"
        >
          <svg
            className="h-4 w-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            />
          </svg>
          Add Genre
        </Link>
      </div>

      <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="border-b border-indigo-200 px-4 py-3 text-left">#</th>
              <th className="border-b border-indigo-200 px-4 py-3 text-left">Name</th>
              <th className="border-b border-indigo-200 px-4 py-3 text-left">Description</th>
              <th className="border-b border-indigo-200 px-4 py-3 text-center w-24">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {genres.length > 0 ? (
              genres.map((genre, index) => (
                <tr
                  key={genre.id}
                  className="hover:bg-indigo-50 transition-colors"
                >
                  <td className="border-b px-4 py-3">{index + 1}</td>
                  <td className="border-b px-4 py-3 font-medium text-gray-700">
                    {genre.name}
                  </td>
                  <td className="border-b px-4 py-3 text-gray-600">
                    {genre.description}
                  </td>
                  <td className="border-b px-4 py-3 text-center relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === genre.id ? null : genre.id)
                      }
                      className="p-1 text-gray-600 hover:text-indigo-600"
                    >
                      ⋮
                    </button>

                    {openDropdown === genre.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <ul className="py-1 text-sm text-gray-700">
                          <li>
                            <button
                              onClick={() => navigate(`/admin/genres/edit/${genre.id}`)}
                              className="block w-full text-left px-4 py-2 hover:bg-indigo-50"
                            >
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleDelete(genre.id)}
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
                  colSpan="4"
                  className="text-center p-6 text-gray-500 bg-white"
                >
                  No genres found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
