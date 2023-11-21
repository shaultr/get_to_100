import "./App.css";
import { useState } from "react";
import style from "./components/components.module.css";
import GameBoard from "./components/gameBoard";
import Panel from "./components/panel";
import Winers from "./components/winers";
let index = 0;
function App() {
  const [players, setPlayers] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  let currentPlayer = {};
  let [queue, setQueue] = useState({});
  const start = () => {
    setIsStarted(true);
  };
  const addPlayer = (e) => {
    let name = prompt("הכנס שם");
    let gamer = {
      name: name,
      number: 0,
      steps: 0,
      score: [],
    };

    if (activePlayers.length === 0) {
      currentPlayer = gamer;
      setQueue(currentPlayer);
    } else {
      currentPlayer = activePlayers[0];
    }
    setPlayers([...players, gamer]);
    // let getItem = localStorage.getItem("players");

    // const updatedPlayers = [getItem, gamer];

    // const localStor = JSON.stringify(updatedPlayers);

    // localStorage.setItem("players", localStor);

    setActivePlayers([...activePlayers, gamer]);
  };
  // function testLocalStorage() {
  //   let name = prompt("הכנס שם");
  //   let localStor = [];
  //   localStorage.getItem("players");
  //   localStor = JSON.parse(localStor);
  //   localStor.map((player, index) => {
  //     let updatedPlayers = player;
  //     if (updatedPlayers.name === name) {
  //       setActivePlayers([...activePlayers, updatedPlayers]);
  //     } else alert("המשתמש לא קים");
  //   });
  // }

  const upDateQueue = () => {
    index = (index + 1) % activePlayers.length;
    currentPlayer = activePlayers[index];
    setQueue(currentPlayer);
  };

  return (
    <div className="App">
      <div className={style.title}>
        <Winers />
        <Panel
          addPlayer={addPlayer}
          // testLocalStorage={testLocalStorage}
          start={start}
          isStarted={isStarted}
        />
      </div>

      <div className={style.container}>
        {activePlayers.map((player, index) => (
          <GameBoard
            player={player}
            index={index}
            setActivePlayers={setActivePlayers}
            activePlayers={activePlayers}
            isStarted={isStarted}
            upDateQueue={upDateQueue}
            queue={queue}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
