import React, { Component } from "react";
import "./itemList.css";
import { Spinner } from "reactstrap";
import PropTypes from "prop-types";
import GotService from "../../services/gotService";

class ItemList extends Component {
  static defaultProps = {
    onItemSelected: () => {
      console.log("error");
    },
  };

  static propTypes = {
    onItemSelected: PropTypes.func,
  };

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      //console.log(id);
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    const { data } = this.props;
    const items = this.renderItems(data);

    return <ul className="item-list list-group">{items}</ul>;
  }
}

const withData = (View, getData) => {
  return class extends Component {
    //получаем список персонажей
    componentDidMount() {
      getData().then((data) => {
        this.setState({
          data,
        });
      });
    }

    state = {
      data: null,
    };

    render() {
      const { data } = this.state;

      if (!data) {
        return <Spinner></Spinner>;
      }
      return <View {...this.props} data={data}></View>;
    }
  };
};
const { getAllCharacters } = new GotService();
export default withData(ItemList, getAllCharacters);
