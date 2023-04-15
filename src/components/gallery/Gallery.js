// Displays all uploaded images in a grid
// • Retrieves data from /images
// • Has some way of retrieving further pages of results where appropriate
// • As the page narrows either the size of the images, or the number of items per row, can be scaled
// accordingly

import { useState, useEffect } from "react";
import FavoriteCat from "./FavoriteCat";
import VoteCat from "./Vote";
import "./Gallery.css";
import "../upload/Upload.css";

const SUB_ID = "kATERYNA";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [votes, setVotes] = useState([]);

  // res - ответ от fetch.
  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/?limit=10&page=0", {
      method: "GET",
      headers: {
        "x-api-key":
          "live_dYHf3iFyok61AqOdlGNYnmK0d1YmYFaIfgRiFaK1D8j4chgYykRaBrpCyruYSCmF",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setImages(result);
        setIsLoaded(true);
      })
      .catch(() => setError(true));
  }, []);
  // [] - пустой массив, чтобы сделать один запрос

  useEffect(() => {
    fetch(`https://api.thecatapi.com/v1/votes?sub_id=${SUB_ID}`, {
      method: "GET",
      headers: {
        "x-api-key":
          "live_dYHf3iFyok61AqOdlGNYnmK0d1YmYFaIfgRiFaK1D8j4chgYykRaBrpCyruYSCmF",
      },
    })
      .then((res) => res.json())
      .then((res) => setVotes(res))
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/favourites", {
      method: "GET",
      headers: {
        "x-api-key":
          "live_dYHf3iFyok61AqOdlGNYnmK0d1YmYFaIfgRiFaK1D8j4chgYykRaBrpCyruYSCmF",
      },
    })
      .then((res) => res.json())
      .then((res) => setFavorites(res))
      .catch(() => setError(true));
  }, []);

  // image.length/10 = 1. сначала мы грузим page 0, затем 1, 2 и тд.
  // setImages - к старому массиву добавляем новый массив
  function getMoreCats(e) {
    e.preventDefault();
    setIsLoaded(false);
    const page = images.length / 10;
    fetch(`https://api.thecatapi.com/v1/images/?limit=10&page=${page}`, {
      method: "GET",
      headers: {
        "x-api-key":
          "live_dYHf3iFyok61AqOdlGNYnmK0d1YmYFaIfgRiFaK1D8j4chgYykRaBrpCyruYSCmF",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setImages([...images, ...result]);
        setIsLoaded(true);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoaded(true));
  }
  // УДАЛИТЬ КОТА
  function deleteCat(imageId) {
    fetch(`https://api.thecatapi.com/v1/images/${imageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_dYHf3iFyok61AqOdlGNYnmK0d1YmYFaIfgRiFaK1D8j4chgYykRaBrpCyruYSCmF",
      },
    }).then(() => {
      const updatedImages = images.filter((image) => image.id !== imageId);
      setImages(updatedImages);
    });
    // удаление котика
    // const index = data.findIndex(elem => elem.imageId === imageId);
    // const before = data.slice(0, index);
    // const after = data.slice(index + 1);
    // const newArr = [...before, ...after];
    // return {
    //   data: newArr
    // }
  }

  // map - создает новый массив из данных
  const items = images.map((image) => {
    return (
      <div key={image.id} className="gallery_wrapper">
        <div className="gallery_item">
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteCat(image.id);
            }}
            className="delete_button"
          >
            Delete cat
          </button>
          <img className={"grey"} src={image.url} alt={image.id} />

          {/* <img className="grey" src={image.url} alt={image.id} /> */}
          <FavoriteCat img_id={image.id} favs={favorites} />
          <VoteCat img_id={image.id} subId={SUB_ID} votes={votes} />
        </div>
      </div>
    );
  });
  

  return (
    <>
      <h1 className="gallery_main_text">Gallery</h1>
      <div className={error ? "show red" : "hidden"}>Fetch Error!</div>
      <div className="container">{items}</div>
      <div className={!isLoaded ? "show green" : "hidden"}>
        Loading your cats...
      </div>
      <div className="gallery_button">
        <button onClick={getMoreCats} className="upload_button">
          Get more cats!
        </button>
      </div>
    </>
  );
};

export default Gallery;
