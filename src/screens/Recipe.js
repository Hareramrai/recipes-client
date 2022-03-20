import React, { useState, useEffect } from "react";
import RecipeService from "../services/RecipeService";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import AuthService from "../services/AuthService";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const getRecipes = async (currentPage) => {
    const perPage = 10;

    await RecipeService.getRecipes(title, currentPage, perPage).then(
      (response) => {
        setRecipes(response.data);
        setPageCount(Math.ceil(response.totalCount / perPage));
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  };
  const handlePageClick = async (event) => {
    let currentPage = event.selected + 1;

    await getRecipes(currentPage);
  };

  useEffect(async () => {
    await getRecipes(0);
  }, [title]);

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="float-start mb-4">
            <h2>Recipes </h2>
          </div>
          <div className="float-end mb-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Search"
            />
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Author</th>
                <th scope="col">Ratings</th>
                <th scope="col">Ingredients</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={`recipes-row-${recipe.id}`}>
                  <th className="align-middle" scope="row">
                    {recipe.id}
                  </th>
                  <td className="align-middle">{recipe.title}</td>
                  <td className="align-middle">{recipe.category}</td>
                  <td className="align-middle">{recipe.author.name}</td>
                  <td className="align-middle">{recipe.ratings}</td>
                  <td className="align-middle">
                    {recipe.ingredients
                      .map((ingredient) => ingredient.title)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
};

export default Recipe;
