import { useState } from "react";
import tape_recorder from "../assets/tape_recorder.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/auth/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login successful");
      // navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-screen bg-amber-100 relative">
      {/* 🎧 Spotify Embed (Top-left, subtle) */}

      <iframe
        src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM"
        width="300"
        height="80"
        frameBorder="0"
        allow="encrypted-media; autoplay"
        loading="lazy"
        className=" shadow-md absolute top-10 left-[65%]"
      />

      {/* LEFT */}
      <div className="flex flex-col gap-6 bg-gray-100 w-1/2 items-center justify-center">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-blue-500">Login</h3>
          <p className="text-gray-600 mt-1">
            Control the vibe. Vote the next track.
          </p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-80 h-10 rounded-sm bg-gray-200 text-sm pl-3 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-80 h-10 rounded-sm bg-gray-200 text-sm pl-3 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 transition text-white w-80 h-10 rounded-sm mt-4 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="pl-10 text-sm">
            Don’t have an account?
            <Link to="/register" className="text-blue-600 underline pl-1">
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex items-center justify-center">
        <img
          src={tape_recorder}
          alt="Tape Recorder"
          className="h-96 rounded-md shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Login;
