import React, { Component } from "react";
import ItemDetails, { Field } from "../../itemDetails";
import GotService from "../../../services/gotService";

export default class BooksItem extends Component {
  gotService = new GotService();

  state = {
    selectedBook: this.props.bookId,
    error: false,
  };

  render() {
    return (
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
  }
}
