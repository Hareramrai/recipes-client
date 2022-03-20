import React, { useState, useEffect } from "react";
import IngredientService from "../services/IngredientService";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from "react-toastify";

const Ingredient = () => {
  const [ingredients, setIngredients] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const getIngredients = async (currentPage) => {
    const perPage = 10;

    await IngredientService.getIngredients(title, currentPage, perPage).then(
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

  const handleAddUserIngredient = async (ingredient_id) => {
    await IngredientService.addUserIngredient(ingredient_id).then(
      () => {
        toast.success("Added ingredient to user kitchen.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
      (error) => {
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    );
  };
  const handleRemoveUserIngredient = async (ingredient_id) => {
    await IngredientService.removeUserIngredient(ingredient_id).then(
      () => {
        toast.success("Remove ingredient from user kitchen.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
      (error) => {
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    );
  };

  useEffect(async () => {
    await getIngredients(0);
  }, [title]);

  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col">
          <div className="float-start mb-4">
            <h2>Ingredients </h2>
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
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient) => (
                <tr key={`recipes-row-${ingredient.id}`}>
                  <th className="align-middle" scope="row">
                    {ingredient.id}
                  </th>
                  <td className="align-middle">{ingredient.title}</td>
                  <td className="align-middle">
                    <button
                      className="btn btn-primary me-3"
                      onClick={() => handleAddUserIngredient(ingredient.id)}
                    >
                      Add to my list
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveUserIngredient(ingredient.id)}
                    >
                      Remove from my list
                    </button>
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

export default Ingredient;
