import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../Pages/characterPage/characterPage";
// import ItemList from "../itemList";
// import ItemDetails from "../itemDetails";
import GotService from "../../services/gotService";
import BooksPage from "../Pages/booksPage/booksPage";
import HousesPage from "../Pages/housesPage/housesPage";
import BooksItem from "../Pages/booksItem/booksItem";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./app.css";

function Page() {
  const params = useParams();
  const pageId = params.id;
  //console.log(pageId);
  return <BooksItem bookId={pageId}></BooksItem>;
}

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
      <Router>
        <div className="app">
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

            <Routes>
              <Route
                path="/"
                exact
                element={<h1 class="welcome">Welcome to GOT DB</h1>}
              ></Route>
              <Route
                path="/characters"
                element={<CharacterPage></CharacterPage>}
              ></Route>
              <Route path="/houses" element={<HousesPage></HousesPage>}></Route>
              <Route
                path="/books"
                exact
                element={<BooksPage></BooksPage>}
              ></Route>
              <Route path="/books/:id" element={<Page></Page>}></Route>
            </Routes>
          </Container>
        </div>
      </Router>
    );
  }
}
