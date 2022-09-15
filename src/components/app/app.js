import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";

import "./app.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      toggleButton: true,
    };
    this.toggleButton = this.toggleButton.bind(this);
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
          <Row>
            <Col md="6">
              <ItemList />
            </Col>
            <Col md="6">
              <CharDetails />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
