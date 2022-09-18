import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../characterPage";
import ItemList from "../itemList";
import ItemDetails from "../itemDetails";
import GotService from "../../services/gotService";

import "./app.css";

export default class App extends Component {
  gotService = new GotService();
  constructor() {
    super();
    this.state = {
      toggleButton: true,
      error: false,
    };
    this.toggleButton = this.toggleButton.bind(this);
  }

  componentDidCatch() {
    console.log("error");
    this.setState({
      error: true,
    });
  }

  toggleButton() {
    this.setState(({ toggleButton }) => {
      return {
        toggleButton: !toggleButton,
      };
    });
  }

  render() {
    const toggleRandomChar = this.state.toggleButton ? (
      <RandomChar></RandomChar>
    ) : null;

    if (this.state.error) {
      return <ErrorMessage></ErrorMessage>;
    }

    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {toggleRandomChar}
              <button className="toggleButton" onClick={this.toggleButton}>
                Toggle random character
              </button>
            </Col>
          </Row>
          <CharacterPage></CharacterPage>
          <Row>
            <Col md="6">
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => item.name}
              />
            </Col>
            <Col md="6">
              <ItemDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={(item) => `${item.name}`}
              />
            </Col>
            <Col md="6">
              <ItemDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
