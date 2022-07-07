import { useState } from "react";

import axios from "axios";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, username, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, isSignUp);
    const { data } = isSignUp
      ? await axios.post("http://localhost:4000/signup", formData)
      : await axios.post("http://localhost:4000/signin", formData);

    data && localStorage.setItem("reddit-user", JSON.stringify(data));

    window.location.href = "/";
  };

  return (
    <div className="dark:bg-neutral-800 h-screen grid place-content-center space-y-8">
      {/* logo */}
      <img
        src="https://avatars.githubusercontent.com/u/75943412?v=4"
        alt="logo"
        className="w-16 aspect-square rounded-md object-cover mx-auto"
      />
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            type="email"
            className="input-style"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        )}
        <input
          type="text"
          className="input-style"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <input
          type="password"
          className="input-style border-b dark:border-gray-600"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button type="submit"> {isSignUp ? "Sign in" : "Sign up"}</button>
        <p
          className="text-center text-xs dark:text-gray-100"
          onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Sign up" : "Sign in"}
        </p>
      </form>
    </div>
  );
};

export default Auth;
