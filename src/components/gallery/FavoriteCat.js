// Every image displayed in the list in R2 has an indicator of whether a cat is favourited or not
// • Clicking the indicator causes the state to change:
// o When not favourited, clicking should favourite via POST /favourites
// o When favourited, clicking should unfavourite via DELETE /favourites/{favourite_id}


import { useState } from "react";
import React from "react";
import "./Gallery.css";
import "../upload/Upload.css";

//
const FavoriteCat = (props) => {
  // в props передается два поля img_id, favs (пропс - это объект)
  // props.img_id - это айди одной картинки котика (строка)
  // props.favs -  это массив объектов избранных котиков
  // Массив favs я могу фильтрую по полю image_id,
  // чтобы это поле совпадало с props.img_id
  // после фильтрации получаем:
  // если item.image_id = props.img_id - массив с одним объектом,
  // или пустой массив [], если условие не выполняется
  const [favorite] = props.favs.filter(
    (item) => item.image_id === props.img_id
  );
  const [status, setStatus] = useState(favorite ? true : false);
  const [favId, setFavId] = useState(favorite ? favorite.id : 0);


  const setFavHandler = (e) => {
    e.preventDefault();
    setStatus(true);
    toogleClass(props.img_id);
    fetch("https://api.thecatapi.com/v1/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_dYHf3iFyok61AqOdlGNYnmK0d1YmYFaIfgRiFaK1D8j4chgYykRaBrpCyruYSCmF",
      },
      body: JSON.stringify({ image_id: props.img_id }),
    }).then((res) => setFavId(res.id));
  };

  const delFavHandler = (e) => {
    e.preventDefault();
    setStatus(false);
    toogleClass(props.img_id);
    fetch(`https://api.thecatapi.com/v1/favourites/${favId}`, {
      method: "DELETE",
      headers: {
        "x-api-key":
          "live_dYHf3iFyok61AqOdlGNYnmK0d1YmYFaIfgRiFaK1D8j4chgYykRaBrpCyruYSCmF",
      },
    });
  };

  const toogleClass = (id) => {
    const elem = React.findDOMNode(id);
    console.log(elem);
  }

  return (
      <div>
        <button
          onClick={setFavHandler}
          className={!status ? "fav_button show" : "hidden"}
        >
          Add fav
        </button>
        <button
          onClick={delFavHandler}
          className={status ? "del_button show" : "hidden"}
        >
          Delete fav
        </button>
      </div>
  );
};

export default FavoriteCat;
