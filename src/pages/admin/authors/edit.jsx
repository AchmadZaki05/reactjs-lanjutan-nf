import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showAuthor, updateAuthor } from "../../../_services/authors";

export default function EditAuthor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    birth_year: "",
    nationality: "",
  });

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await showAuthor(id);
        setFormData({
          name: data.name || "",
          birth_year: data.birth_year || "",
          nationality: data.nationality || "",
        });
      } catch (error) {
        console.error("Gagal mengambil data author:", error);
        alert("Gagal memuat data author.");
      }
    };

    fetchAuthor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateAuthor(id, formData);
      alert("Author berhasil diperbarui!");
      navigate("/admin/authors");
    } catch (error) {
      console.error("Gagal memperbarui author:", error);
      alert("Gagal memperbarui author.");
    }
  };

  return (
    <section className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Author</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Masukkan nama author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          />
        </div>

        {/* Input Birth Year */}
        <div>
          <label
            htmlFor="birth_year"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Birth Year
          </label>
          <input
            type="number"
            id="birth_year"
            name="birth_year"
            value={formData.birth_year}
            onChange={handleChange}
            placeholder="Masukkan tahun lahir"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          />
        </div>

        {/* Input Nationality */}
        <div>
          <label
            htmlFor="nationality"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nationality
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder="Masukkan kebangsaan author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate("/admin/authors")}
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Batal
          </button>
          <button
            type="submit"
            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Simpan
          </button>
        </div>
      </form>
    </section>
  );
}
