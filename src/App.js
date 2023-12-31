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
  let [winers, setWiners] = useState([]);

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
     
      avg: 0
    };

    if (activePlayers.length === 0) {
      currentPlayer = gamer;
      setQueue(currentPlayer);
    } else {
      currentPlayer = activePlayers[0];
    }
    setPlayers([...players, gamer]);
    localStorage.setItem(gamer.name, JSON.stringify(gamer));

    setActivePlayers([...activePlayers, gamer]);
  };
  function testLocalStorage() {
    let name = prompt("הכנס שם משתמש");
    let localStor = JSON.parse(localStorage.getItem(name));
    if (localStor) {
      setActivePlayers((prevActivePlayers) => [
        ...prevActivePlayers,
        localStor,
      ]);
      if (activePlayers.length === 0) {
        currentPlayer = localStor;
        setQueue(currentPlayer);
      } else {
        currentPlayer = activePlayers[0];
      }
    } else {
      alert("המשתמש לא קים");
    }
  }

  const upDateQueue = () => {
    index = (index + 1) % activePlayers.length;
    currentPlayer = activePlayers[index];
    setQueue(currentPlayer);
  };

  const upDateQueue2 = () => {
    index = (index + 2) % activePlayers.length;
    currentPlayer = activePlayers[index];
    setQueue(currentPlayer);
  };

  return (
    <div className="App">
      <div className={style.title}>
        <Winers winers={winers}setWiners={setWiners} />
        <Panel
          addPlayer={addPlayer}
          start={start}
          testLocalStorage={testLocalStorage}
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
            upDateQueue2={upDateQueue2}
            setWiners={setWiners}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
