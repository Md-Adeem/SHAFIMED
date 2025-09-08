

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login Successful ✅");

        // Save token + user info in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#135ec1] to-[#d7e9ff] p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Left Image Section */}
        <div className="md:w-1/2 bg-blue-600 flex items-center justify-center p-6">
          <img
            src="/_.jpeg" // 👉 use doctor image inside public/
            alt="Doctor"
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 w-full p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}











// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// function LoginPage() {
//   const { login } = useContext(AuthContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     // call backend and get token
//     const token = "dummy_token"; // replace with real token
//     login(token); // updates global state + localStorage
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       {/* login form */}
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Loginl;