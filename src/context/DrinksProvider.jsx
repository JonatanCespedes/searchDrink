import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import { filterDrinksService, getRecipeService } from "../services/drinks.service";

const DrinksContext = createContext();

function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [modal, setModal] = useState(false);
  const [drinkId, setDrinkId] = useState(null);
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRecipe();
  }, [drinkId]);

  const getRecipe = async () => {
    if (!drinkId) return;

    try {
      setLoading(true);
      const recetaData = await getRecipeService(drinkId);
      setRecipe(recetaData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getDrink = async (data) => {
    try {
      setLoading(true);

      const drinksData = await filterDrinksService(data.name, data.category);
      setDrinks(drinksData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClick = () => {
    setModal((prevModal) => !prevModal);
  };

  const handleDrinkIdClick = (id) => {
    setDrinkId(id);
  };

  const contextValue = {
    getDrink,
    drinks,
    handleModalClick,
    modal,
    handleDrinkIdClick,
    recipe,
    loading,
  };

  return (
    <DrinksContext.Provider value={contextValue}>
      {children}
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DrinksProvider, DrinksContext };
