import React, { Component } from "react";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class CharacterPage extends Component {
  gotService = new GotService();

  state = {
    selectedChar: 130,
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({
      selectedChar: id,
    });
  };

  componentDidCatch() {
    console.log("error");
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage></ErrorMessage>;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllCharacters}
        renderItem={({ name, gender }) => `${name} (${gender})`}
      />
    );

    const charDetails = (
      <ItemDetails charId={this.state.selectedChar}>
        <Field field="gender" label="Gender"></Field>
        <Field field="born" label="Born"></Field>
        <Field field="died" label="Died"></Field>
        <Field field="culture" label="Culture"></Field>
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={charDetails}></RowBlock>;
  }
}
