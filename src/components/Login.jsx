import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Login = () => {

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8011/api/v1/user/signin', data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      window.location = '/';
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }


  };

  return (
    <div >
      <div >
        <div >
          <form onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required

            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required

            />
            {error && <div >{error}</div>}
            <button type="submit" >
              Sing In
            </button>
          </form>
        </div>
        <div >
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button">
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;