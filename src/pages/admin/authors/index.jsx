import { useEffect, useState } from "react";
import { getAuthors, deleteAuthor } from "../../../_services/authors";
import { Link } from "react-router-dom";

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);
  const [openDropdown, setOpenDropdownId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const authorsData = await getAuthors();
      setAuthors(authorsData);
    } catch (error) {
      console.error("❌ Error fetching authors:", error);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdown === id ? null : id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus author ini?");
    if (!confirmDelete) return;

    try {
      await deleteAuthor(id);
      alert("Author berhasil dihapus!");
      fetchData(); // refresh data setelah delete
    } catch (error) {
      console.error("❌ Gagal menghapus author:", error);
      alert("Gagal menghapus author.");
    }
  };

  return (
    <section className="bg-gray-50 p-3 sm:p-5">
      <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 
                        1110.89 3.476l4.817 4.817a1 1 0 
                        01-1.414 1.414l-4.816-4.816A6 6 
                        0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2"
                  placeholder="Search authors..."
                />
              </div>
            </form>
          </div>

          <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center justify-end md:space-x-3">
            <Link
              to={"/admin/authors/create"}
              className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 
                focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              <svg
                className="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 
                    110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 
                    0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Add Author
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-4 py-3">Name</th>
                <th scope="col" className="px-4 py-3">Birth Year</th>
                <th scope="col" className="px-4 py-3">Nationality</th>
                <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 ? (
                authors.map((author) => (
                  <tr key={author.id} className="border-b">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {author.name}
                    </th>
                    <td className="px-4 py-3">{author.birth_year || "-"}</td>
                    <td className="px-4 py-3">{author.nationality || "-"}</td>
                    <td className="px-4 py-3 flex items-center justify-end relative">
                      <button
                        onClick={() => toggleDropdown(author.id)}
                        className="inline-flex items-center p-0.5 text-sm font-medium text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 
                            2 0 014 0zM12 10a2 2 0 
                            11-4 0 2 2 0 014 0zM16 
                            12a2 2 0 100-4 2 2 0 000 
                            4z" />
                        </svg>
                      </button>
                      {openDropdown === author.id && (
                        <div
                          className="absolute right-0 mt-2 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow"
                          style={{ top: "100%", right: "0" }}
                        >
                          <ul className="py-1 text-sm text-gray-700">
                            <li>
                              <Link
                                to={`/admin/authors/edit/${author.id}`}
                                className="block py-2 px-4 hover:bg-gray-100"
                              >
                                Edit
                              </Link>
                            </li>
                          </ul>
                          <div className="py-1">
                            <button
                              onClick={() => handleDelete(author.id)}
                              className="block py-2 px-4 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    Data Tidak Ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
