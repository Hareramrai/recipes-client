import axios from "axios";
import AuthHeader from "./AuthHeader";
import AuthService from "./AuthService";

const API_URL = process.env.REACT_APP_API_URL;

const getRecipes = (title, page, perPage) => {
  return axios
    .get(API_URL + "/recipes", {
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

const getRecommendedRecipes = (page, perPage) => {
  const user = AuthService.getCurrentUser();
  return axios
    .get(API_URL + `/users/${user?.id}/recipe_recommendations`, {
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

const RecipeService = {
  getRecipes,
  getRecommendedRecipes,
};

export default RecipeService;
