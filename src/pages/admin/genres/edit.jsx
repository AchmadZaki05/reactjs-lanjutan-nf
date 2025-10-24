import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showGenre, updateGenre } from "../../../_services/genres"

export default function EditGenre() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: "", description: "" })

  useEffect(() => {
    const fetchData = async () => {
      const data = await showGenre(id)
      setFormData({
        name: data.name || "",
        description: data.description || "",
      })
    }
    fetchData()
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateGenre(id, formData)
      alert("Genre berhasil diupdate!")
      navigate("/admin/genres")
    } catch (error) {
      console.log(error)
      alert("Terjadi kesalahan saat mengupdate genre.")
    }
  }

  return (
    <section className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Edit Genre
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg"
          >
            Update
          </button>
        </form>
      </div>
    </section>
  )
}
