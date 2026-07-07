import { Link } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      localStorage.setItem("role", res.data.role);

      navigate(res.data.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      console.log(error.response?.data || error);

      alert("Invalid Credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 id="fix1">Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <div
          style={{
            margin: "20px 0",
            textAlign: "center",
            color: "#777",
            fontWeight: "bold",
          }}
        >
          OR
        </div>

        <p style={{ marginTop: "20px" }}>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
