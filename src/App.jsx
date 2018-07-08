import React, { Component } from "react";
import "./App.css";
import Form from "./components/Form";
import Recipes from "./components/Recipes";

const API_KEY = "e79743444a86e4dab300359a468862af";

class App extends Component {
  state = {
    recipes: []
  };
  getRecipe = async e => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(
      `http://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=5`
    );

    const data = await api_call.json();

    this.setState({ recipes: data.recipes });
    console.log(this.state.recipes);
  };

  getAllRecipes = async()=> {
 
    const api_call = await fetch(
      `http://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}`
    );

    const data = await api_call.json();

    this.setState({ recipes: data.recipes });
 
  };

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  };

  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    if(json){
      const recipes = JSON.parse(json);
      this.setState({ recipes });
    }else{
      this.getAllRecipes();
    }
  
  };

  render() {
    const { recipes } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />

        <Recipes recipes={recipes} />
      </div>
    );
  }
}

export default App;
