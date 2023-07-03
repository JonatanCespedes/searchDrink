import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const getRecipeService = async (bebidaId) => {
  try {
    const url = `${apiUrl}lookup.php?i=${bebidaId}`;
    const { data } = await axios(url);
    return data.drinks[0];
  } catch (error) {
    console.log(error);
    throw new Error('Hubo un error al obtener la receta.'); // Opcional: relanza el error para que pueda ser capturado por el componente que lo llama.
  }
};

const filterDrinksService = async (name, category) => {
  try {
    const url = `${apiUrl}filter.php?i=${name}&c=${category}`;
    const { data } = await axios(url);
    return data.drinks;
  } catch (error) {
    console.log(error);
     throw new Error('Hubo un error al obtener las bebidas.'); // Opcional: relanza el error para que pueda ser capturado por el componente que lo llama.
  }
};

export { getRecipeService, filterDrinksService };
