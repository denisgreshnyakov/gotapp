import React, { Component } from "react";
import ItemList from "../../itemList";
import ItemDetails, { Field } from "../../itemDetails";
import ErrorMessage from "../../errorMessage";
import GotService from "../../../services/gotService";
import RowBlock from "../../rowBlock";

export default class BooksPage extends Component {
  gotService = new GotService();

  state = {
    selectedBook: 1,
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({
      selectedBook: id,
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
        getData={this.gotService.getAllBooks}
        renderItem={({ name, numberOfPages }) => `${name} (${numberOfPages})`}
      />
    );

    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedBook}
        getItem={this.gotService.getBook}
      >
        <Field field="name" label="BookName"></Field>
        <Field field="numberOfPages" label="NumberOfPages"></Field>
        <Field field="publisher" label="Publisher"></Field>
        <Field field="released" label="Released"></Field>
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={charDetails}></RowBlock>;
  }
}
