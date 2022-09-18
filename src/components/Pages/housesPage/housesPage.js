import React, { Component } from "react";
import ItemList from "../../itemList";
import ItemDetails, { Field } from "../../itemDetails";
import ErrorMessage from "../../errorMessage";
import GotService from "../../../services/gotService";
import RowBlock from "../../rowBlock";

export default class HousesPage extends Component {
  gotService = new GotService();

  state = {
    selectedHouse: 1,
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({
      selectedHouse: id,
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
        getData={this.gotService.getAllHouses}
        renderItem={({ name, region }) => `${name} (${region})`}
      />
    );

    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedHouse}
        getItem={this.gotService.getHouse}
      >
        <Field field="name" label="HouseName"></Field>
        <Field field="region" label="Region"></Field>
        <Field field="words" label="Words"></Field>
        <Field field="titles" label="Titles"></Field>
        <Field field="overlord" label="Overlord"></Field>
        <Field field="ancestralWeapons" label="AncestralWeapons"></Field>
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={charDetails}></RowBlock>;
  }
}
