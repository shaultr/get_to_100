import style from "./components.module.css";
import { useState, useEffect } from "react";

function GameBoard(props) {
  useEffect(() => {
    let number = Math.floor(Math.random(0, 99) * 100);
    props.player.number = number;
  }, []);
  function upDateWiner() {
    props.player.score = [...props.player.score, props.player.steps];
    props.setActivePlayers(props.activePlayers);
    let avg = () => {
      let sum = 0;

      for (let i = 0; i < props.player.score.length; i++) {
        sum += props.player.score[i];
      }
      let hasScore = props.player.score.length > 0;

      return hasScore ? sum / props.player.score.length : 0;
    };
    props.player.avg = avg();
    let localStor = JSON.parse(localStorage.getItem(props.player.name));
    localStor.score = props.player.score;
    localStor.avg = props.player.avg;
    localStor = JSON.stringify(localStor);
    localStorage.setItem(props.player.name, localStor);
    props.player.steps = 0;
    props.setActivePlayers(props.activePlayers);
    let allPlayers = [];

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let player = JSON.parse(localStorage.getItem(key));
      if (player.avg > 0) allPlayers.push(player);
    }

    allPlayers.sort((a, b) => a.avg - b.avg);

    props.setWiners(allPlayers.slice(0, 3));
  }
  props.setActivePlayers(props.activePlayers);
  const activeButten =
    props.player.number !== 100 &&
    props.isStarted &&
    props.queue.name === props.player.name;
  let [theEnd, setTheEnd] = useState(false);
  function startAgain() {
    props.player.number = Math.floor(Math.random(0, 99) * 100);

    upDateWiner();
  }
  return (
    <div className={style.board} style={theEnd ? { display: "none" } : null}>
      <h1>name: {props.player.name}</h1>
      {props.player.number !== 100 ? (
        <h1>number: {props.player.number}</h1>
      ) : (
        <div>
          <h1>Game Over! </h1>
          <h2> steps: {props.player.steps}</h2>
          <div className={style.endButton}>
            <div
              className={style.reset}
              onClick={() => {
                setTheEnd(true);
                upDateWiner();
              }}
            >
              Exit
            </div>
            <div
              className={style.stareAgain}
              onClick={() => {
                startAgain();
              }}
            >
              Start Again
            </div>
          </div>
        </div>
      )}

      <div
        className={style.buttons}
        style={!activeButten ? { visibility: "hidden" } : null}
      >
        <div
          className={style.button}
          onClick={
            activeButten
              ? () => {
                  props.player.number = props.player.number + 1;
                  props.player.steps = props.player.steps + 1;
                  props.setActivePlayers(props.activePlayers);
                  let nextQueue =
                    (props.index + 1) % props.activePlayers.length;
                  props.activePlayers[nextQueue].number !== 100
                    ? props.upDateQueue()
                    : props.upDateQueue2();
                }
              : null
          }
        >
          +1
        </div>
        <div
          className={style.button}
          onClick={
            activeButten
              ? () => {
                  props.player.number = props.player.number - 1;
                  props.player.steps = props.player.steps + 1;
                  props.setActivePlayers(props.activePlayers);
                  let nextQueue =
                    (props.index + 1) % props.activePlayers.length;

                  props.activePlayers[nextQueue].number !== 100
                    ? props.upDateQueue()
                    : props.upDateQueue2();
                }
              : null
          }
        >
          -1
        </div>
        <div
          className={style.button}
          onClick={
            activeButten
              ? () => {
                  props.player.number = props.player.number * 2;
                  props.player.steps = props.player.steps + 1;
                  props.setActivePlayers(props.activePlayers);
                  let nextQueue =
                    (props.index + 1) % props.activePlayers.length;
                  props.activePlayers[nextQueue].number !== 100
                    ? props.upDateQueue()
                    : props.upDateQueue2();
                }
              : null
          }
        >
          *2
        </div>
        <div
          className={style.button}
          onClick={
            activeButten
              ? () => {
                  props.player.number = Math.floor(props.player.number / 2);
                  props.player.steps = props.player.steps + 1;
                  props.setActivePlayers(props.activePlayers);
                  let nextQueue =
                    (props.index + 1) % props.activePlayers.length;
                  props.activePlayers[nextQueue].number !== 100
                    ? props.upDateQueue()
                    : props.upDateQueue2();
                }
              : null
          }
        >
          /2
        </div>
      </div>
    </div>
  );
}
export default GameBoard;
