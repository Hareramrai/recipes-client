import React, { useState, useEffect } from "react";
import IngredientService from "../../services/IngredientService";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import AuthService from "../../services/AuthService";

const MyIngredient = () => {
  const [ingredients, setIngredients] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const navigate = useNavigate();

  const getIngredients = async (currentPage) => {
    const perPage = 10;

    await IngredientService.getMyIngredients(currentPage, perPage).then(
      (response) => {
        setIngredients(response.data);
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

    await getIngredients(currentPage);
  };

  useEffect(async () => {
    await getIngredients(0);
  }, []);

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="mb-4">
            <h2>Ingredients </h2>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient) => (
                <tr key={`recipes-row-${ingredient.id}`}>
                  <th className="align-middle" scope="row">
                    {ingredient.id}
                  </th>
                  <td className="align-middle">{ingredient.title}</td>
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

export default MyIngredient;
