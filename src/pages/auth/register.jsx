import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email tidak boleh kosong";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Format email tidak valid";

    if (!formData.name) newErrors.name = "Nama tidak boleh kosong";
    if (!formData.username) newErrors.username = "Username tidak boleh kosong";
    if (!formData.password) newErrors.password = "Password tidak boleh kosong";
    if (!formData.terms)
      newErrors.terms = "Anda harus menyetujui Terms and Conditions";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert("Form berhasil dikirim ✅");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@gmail.com"
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Achmad Zaki Al Akbar"
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="zaki_28"
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-150"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="terms"
              className="ml-3 text-sm text-gray-600 dark:text-gray-300"
            >
              I agree to the{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:underline"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
          )}

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:ring-4 focus:ring-indigo-300"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Already have an account?{" "}
            <a
              href="login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
