import style from "./components.module.css";
import { useEffect, useState } from "react";

function GameBoard(props) {
  useEffect(() => {
    let randomNumber = Math.floor(Math.random(0, 99) * 100);
    props.player.number = randomNumber;
  }, []);
  function startAgain() {
    props.player.number = Math.floor(Math.random(0, 99) * 100);
    props.player.score = [...props.player.score, props.player.steps];
    // let localStor =[]
    // localStor = localStorage.getItem("players");
    // localStor = JSON.parse(localStor);
    // localStor.map((player, index) => {
    //   if (player.name === props.player.name) {
    //     player.score =props.player.score;
        
    //   }
    //   localStor=JSON.stringify(localStor);
    //   localStorage.setItem("players", localStor);
    // });
    props.player.steps = 0;
    props.setActivePlayers(props.activePlayers);
  }

  props.setActivePlayers(props.activePlayers);
  const activeButten =
    props.player.number !== 100 &&
    props.isStarted &&
    props.queue.name === props.player.name;
  let [isEnd,setIsEnd]=useState(false);
  return (
    <div
      className={style.board}
      style={isEnd ? { visibility: "hidden" } : null}
    >
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
               
                setIsEnd(true)
              }}
            >
              Exit
            </div>
            <div className={style.stareAgain} onClick={() => startAgain()}>
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
                  props.upDateQueue();
                  // alert( props.activePlayers[props.index + 1].number);
                  // props.activePlayers[props.index + 1].number !== 100 ? props.upDateQueue() : <>props.upDateQueue(); props.upDateQueue() </>;
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
                  props.upDateQueue();
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
                  props.upDateQueue();
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
                  props.upDateQueue();
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
