import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  fetchURL = url => {
    fetch(url)
      .then(resp => resp.json())
      .then(pets => this.setState({ pets: pets }));
  };

  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  filterChange = event => {
    this.setState({
      filters: {
        type: event.target.value
      }
    });
  };

  findPetsClick = () => {
    let filter = this.state.filters.type;

    if (filter === "all") {
      fetch(`/api/pets`);
    } else {
      this.fetchURL(`/api/pets?type=${filter}`);
    }
  };

  adoptPet = id => {
    const pets = this.state.pets.map(pet =>
      pet.id === id ? { ...pet, isAdopted: true } : pet
    );
    this.setState({
      pets: pets
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.filterChange}
                onFindPetsClick={this.findPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
