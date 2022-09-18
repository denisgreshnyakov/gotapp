import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../characterPage";

import "./app.css";

export default class App extends Component {
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
        </Container>
      </>
    );
  }
}
