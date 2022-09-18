export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }
  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource("/characters?page=5&pageSize=10");
    return res.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  };

  getAllHouses = async () => {
    const res = await this.getResource(`/houses/`);
    return res.map(this._transformHouse);
  };

  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}`);
    return this._transformHouse(house);
  };

  getAllBooks = async () => {
    const res = await this.getResource(`/books/`);
    return res.map(this._transformBook);
  };

  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBook(book);
  };

  _extractId(item) {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  }

  _ifEmptyProp(prop) {
    if (!prop) {
      return "not found :(";
    } else if (Array.isArray(prop) && prop[0] === "") {
      return "not found :(";
    } else {
      return prop;
    }
  }

  _transformCharacter = (char) => {
    return {
      id: this._ifEmptyProp(this._extractId(char)),
      name: this._ifEmptyProp(char.name),
      gender: this._ifEmptyProp(char.gender),
      born: this._ifEmptyProp(char.born),
      died: this._ifEmptyProp(char.died),
      culture: this._ifEmptyProp(char.culture),
    };
  };

  _transformHouse = (house) => {
    return {
      id: this._ifEmptyProp(this._extractId(house)),
      name: this._ifEmptyProp(house.name),
      region: this._ifEmptyProp(house.region),
      words: this._ifEmptyProp(house.words),
      titles: this._ifEmptyProp(house.titles),
      overlord: this._ifEmptyProp(house.overlord),
      ancestralWeapons: this._ifEmptyProp(house.ancestralWeapons),
    };
  };

  _transformBook = (book) => {
    return {
      id: this._ifEmptyProp(this._extractId(book)),
      name: this._ifEmptyProp(book.name),
      numberOfPages: this._ifEmptyProp(book.numberOfPages),
      publisher: this._ifEmptyProp(book.publisher),
      released: this._ifEmptyProp(book.released),
    };
  };
}
