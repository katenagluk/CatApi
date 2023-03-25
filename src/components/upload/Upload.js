// Allows the user to select an image from their PC
// Uploads to /images/upload
// Upon completion
// On success: display a message, return to “/” if not already there
// On failure: display any error messages

import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";
import cat from "./cat.jpg";

const Upload = () => {
  // file - переменная (в которой есть файл или его нет), setFile - функция которая записывает в переменную file что передаешь

  // статус загрузки
  const [uploadStatus, setUploadStatus] = useState();
  // окно загрузки
  const [loading, setLoading] = useState(false);
  // ссылка на hidden инпут. используем ref
  const hiddenFileInput = useRef(null);
  // редирект на home page
  const navigate = useNavigate();

  // обработчик событий клика
  // setUploadStatus и setFile изначально undefined чтобы изначально не было окон error или success
  const handleClick = (event) => {
    event.preventDefault();
    setUploadStatus(undefined);
    hiddenFileInput.current.click();
  };
  // проверка есть ли файл. если файла нету, то выходим из функции (fileForUploaded)
  // если есть file, то я заполняю форм дату для аплоада.
  // new formData - создание объекта от класса formData (поля, методы). чтоб соответствовало определенной структуре
  // append метод formDate. создает поле file и записывает значение переменной file
  // url - это куда мы отправляем запрос с файлом
  const handleChange = (event) => {
    const fileForUpload = event.target.files[0];
    if (!fileForUpload) return;
    const data = new FormData();
    data.append("file", fileForUpload);
    const url = "https://api.thecatapi.com/v1/images/upload";
    const options = {
      method: "POST",
      headers: {
        "x-api-key":
          "live_dYHf3iFyok61AqOdlGNYnmK0d1YmYFaIfgRiFaK1D8j4chgYykRaBrpCyruYSCmF",
      },
      body: data,
    };
    // ставим окно загрузки в true
    setLoading(true);
    // options - это опции fetch, необходимые для запроса
    // 201 - это статус код от сервера что картинка загружена
    fetch(url, options)
      .then((res) => {
        if (res.status === 201) {
          setUploadStatus(true);
        } else {
          setUploadStatus(false);
        }
      })
      .catch(() => {
        setUploadStatus(false);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      })
  };
  // setTimeout для редиректа и удаления окна error
  if (uploadStatus) {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }
  if(typeof uploadStatus === "boolean" && !uploadStatus) {
    setTimeout(() => {
      setUploadStatus(undefined)
    }, 3000);
  }

  return (
    <>
      <div className="upload_wrapper">
        <h1 className="upload_main_text">Upload</h1>
        <div className="upload_text">
          <p>Please, upload a photo of the cat.</p>
          <p>You can only upload cat photos.</p>
          <p>If the upload is successful, you will be redirected to the Home page.</p>
          <p>Otherwise, the download will give an "Error!"</p>
        </div>
        <div className="upload_img">
          <img src={cat} alt="cat" />
        </div>
        <button className="upload_button" onClick={handleClick}>
          Upload a photo of cat
        </button>
        <input
          type="file"
          accept='image/*'
          ref={hiddenFileInput}
          onChange={handleChange}
          className="hidden"
        />
        <div
          className={
            typeof uploadStatus === "boolean" && !uploadStatus
              ? "show upload_text red"
              : "hidden"
          }
        >
          Error!
        </div>
        <div
          className={
            typeof uploadStatus === "boolean" && uploadStatus
              ? "show upload_text green"
              : "hidden"
          }
        >
          Success!
        </div>
        <div className={loading ? "show upload_text" : "hidden"}>
          Loading...
        </div>
      </div>
    </>
  );
};
export default Upload;
