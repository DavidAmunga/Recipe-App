import React, { Component } from "react";
import "./App.css";
import Form from "./components/Form";

const API_KEY = "e79743444a86e4dab300359a468862af";

class App extends Component {
  state={
    recipes:[]
  }
  getRecipe = async e => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(
      `http://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=shredded%20chicken&count=5`
    );

    const data = await api_call.json();

    this.setState({recipes:data});
    
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
      </div>
    );
  }
}

export default App;
