import React, { Component } from "react";
import ItemList from "../../itemList";
import ErrorMessage from "../../errorMessage";
import GotService from "../../../services/gotService";
import { useNavigate } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    return <Component {...props} router={{ navigate }} />;
  }

  return ComponentWithRouterProp;
}

class BooksPage extends Component {
  gotService = new GotService();

  state = {
    error: false,
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

    return (
      <ItemList
        onItemSelected={(itemId) => {
          this.props.router.navigate(`/books/${itemId}`, { replace: true });
        }}
        getData={this.gotService.getAllBooks}
        renderItem={({ name, numberOfPages }) => `${name} (${numberOfPages})`}
      />
    );
  }
}

export default withRouter(BooksPage);
