// Every image displayed in the list in R2 has options to “upvote” and “downvote” the image
// • Submits the vote to /votes
// Every image displayed in the list in R2 has a score displayed
// • The data for the score can be retrieved from /votes
// • The score is calculated as [upvote count] – [downvote count]

// Каждое изображение, отображаемое в списке в R2, имеет опции «проголосовать за» и «проголосовать против».
// • Отправляет голос /votes
// Каждое изображение, отображаемое в списке в R2, имеет отображаемую оценку.
// • Данные для оценки можно получить из /votes.
// • Оценка рассчитывается как [количество положительных голосов] – [количество отрицательных голосов]

import { useState } from "react";
import "./Gallery.css";
import "../upload/Upload.css";

const VoteCat = (props) => {
  // votes - это массив объектов
  const [votes, setVotes] = useState(props.votes);
  // фильтруем votes по полю image_id
  // после фильтрации получаем: 
  // если item.image_id = props.img_id - массив с одним объектом,
  // или пустой массив [], если условие не выполняется
  // достаем из полученного объекта поле value, например [0, 1, 0, -1, -1] 
  // с помощью reduce складываем все значения массива
  const scoreFromVotes = votes
  .filter((item) => item.image_id === props.img_id)
  .map((item) => item.value)
  .reduce((acc, next) => acc + next, 0);
  const [score, setScore] = useState(scoreFromVotes);
  // делаем POST запрос с положительным результатом +1
  const voteUpHandler = (e) => {
    e.preventDefault();
    setScore(score + 1);
    const body = {
      image_id: props.img_id,
      sub_id: props.subId,
      value: score + 1,
    };
    fetch("https://api.thecatapi.com/v1/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_dYHf3iFyok61AqOdlGNYnmK0d1YmYFaIfgRiFaK1D8j4chgYykRaBrpCyruYSCmF",
      },
      body: JSON.stringify(body),
    });
  };

  // делаем POST запрос с отрицательным результатом -1
  const voteDownHandler = (e) => {
    e.preventDefault();
    setScore(score - 1);
    const body = {
      image_id: props.img_id,
      sub_id: props.subId,
      value: score - 1,
    };
    fetch("https://api.thecatapi.com/v1/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_dYHf3iFyok61AqOdlGNYnmK0d1YmYFaIfgRiFaK1D8j4chgYykRaBrpCyruYSCmF",
      },
      body: JSON.stringify(body),
    });
  };

  return (
    <div>
        <button className="vote_score">{score}❤</button>
      <button onClick={voteUpHandler} className="vote_btn vote_up">
        Vote up
      </button>
      <button onClick={voteDownHandler} className="vote_btn vote_down">
        Vote down
      </button>
    </div>
  );
};

export default VoteCat;
