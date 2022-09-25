import React, { Component } from "react";
import GotService from "../../services/gotService";
import "./itemDetails.css";

const Field = ({ item, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Field };

export default class ItemDetails extends Component {
  gotService = new GotService();

  state = {
    item: null,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId } = this.props;
    //console.log(itemId);
    if (!itemId) {
      return;
    }

    const { getItem } = this.props;

    getItem(itemId).then((item) => {
      this.setState({ item });
    });
    //this.foo.bar = 0;
  }

  render() {
    if (!this.state.item) {
      return <span className="select-error">Please select an item</span>;
    }

    const { item } = this.state;

    let { name } = item;

    name = name || "not found";

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    );
  }
}
