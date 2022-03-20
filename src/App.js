import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthService from "./services/AuthService";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Recipe from "./screens/Recipe";
import Ingredient from "./screens/Ingredient";
import Home from "./screens/Home";
import NavBar from "./components/NavBar";
import MyIngredient from "./screens/users/MyIngredient";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <>
      <NavBar currentUser={currentUser}></NavBar>
      <div className="wrapper flex-grow-1 container py-5">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/ingredients" element={<Ingredient />} />
          <Route path="/my_ingredients" element={<MyIngredient />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
