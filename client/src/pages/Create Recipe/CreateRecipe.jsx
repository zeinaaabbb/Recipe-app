import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from "./CreateRecipe.module.css"
import { useGetUserID} from '../../hooks/useGetUserID'

function CreateRecipe() {
  const navigate = useNavigate();
  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    name : "",
    descriptions: "" ,
    ingredients: [],
    instruction: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  }

  const handleIngredientChange = (event, index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = event.target.value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/recipes/createrecipe", recipe)
      alert("recipe created!");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.createcontainer}>
      <form onSubmit={handleSubmit} className={styles.createform}>
      <div className={styles.groupinput}>
        <h2>Create your Recipe</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" onChange={handleChange}/>

        <label htmlFor="descriptions">Descriptions:</label>
        <textarea name="descriptions" id="descriptions" onChange={handleChange}></textarea>

        <label htmlFor="ingredients">Ingredients:</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key ={index}
            type="text"
            name="ingredients"
            value ={ingredient}
            onChange={ (event) => handleIngredientChange(event, index) }
          />
        ))}
        <button type="button" onClick={handleAddIngredient} className={styles.createbtn}>+</button>

        <label htmlFor="instructions">Instructions:</label>
        <input type="text" name="instructions" id="instructions" onChange={handleChange}/>

        <label htmlFor="imageUrl">Image Url:</label>
        <input type="text" name="imageUrl" id="imageUrl" onChange={handleChange}/>

        <label htmlFor="cookingTime">Cooking Time (mins):</label>
        <input type="number" name="cookingTime" id="cookingTime" onChange={handleChange}/>

        <button type="submit" className={styles.createbtn} >Create</button>
      </div>
      </form>
    </div>
  );
}

export default CreateRecipe
