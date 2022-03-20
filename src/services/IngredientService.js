import axios from "axios";
import AuthHeader from "./AuthHeader";
import AuthService from "./AuthService";
const API_URL = "http://localhost:3000/api/v1";

const getIngredients = (title, page, perPage) => {
  return axios
    .get(API_URL + "/ingredients", {
      params: {
        page,
        perPage,
        title,
      },
      headers: AuthHeader(),
    })
    .then((response) => {
      const totalCount = response.headers.total;
      return { data: response.data, totalCount };
    });
};

const addUserIngredient = (ingredient_id) => {
  const user = AuthService.getCurrentUser();
  return axios
    .post(
      API_URL + `/users/${user.id}/user_ingredients`,
      {
        user_ingredient: {
          ingredient_id,
        },
      },
      { headers: AuthHeader() }
    )
    .then((response) => {
      return response.data;
    });
};

const removeUserIngredient = (ingredient_id) => {
  const user = AuthService.getCurrentUser();
  return axios
    .delete(API_URL + `/users/${user.id}/user_ingredients/${ingredient_id}`, {
      headers: AuthHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const getMyIngredients = (page, perPage) => {
  const user = AuthService.getCurrentUser();

  return axios
    .get(API_URL + `/users/${user.id}/user_ingredients`, {
      params: {
        page,
        perPage,
      },
      headers: AuthHeader(),
    })
    .then((response) => {
      const totalCount = response.headers.total;
      return { data: response.data, totalCount };
    });
};

const IngredientService = {
  getIngredients,
  addUserIngredient,
  removeUserIngredient,
  getMyIngredients,
};

export default IngredientService;
