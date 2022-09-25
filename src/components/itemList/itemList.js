import React, { useState, useEffect } from "react";
import "./itemList.css";
import { Spinner } from "reactstrap";

function ItemList({ getData, onItemSelected, renderItem }) {
  const [itemList, updateList] = useState([]);

  //получаем список персонажей
  useEffect(() => {
    getData().then((data) => {
      updateList(data);
    });
  });

  function renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;
      const label = renderItem(item);
      //console.log(id);
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  if (!itemList) {
    return <Spinner></Spinner>;
  }

  const items = renderItems(itemList);

  return <ul className="item-list list-group">{items}</ul>;
}

export default ItemList;
