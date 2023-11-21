import React from "react";
import style from "./components.module.css";
import { useState, useEffect } from "react";

export default function Winers(props) {
  let allPlayers = [];

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let player = JSON.parse(localStorage.getItem(key));
   if(player.avg>0)
     allPlayers.push(player) ;
  }

  allPlayers.sort((a, b) => a.avg - b.avg);

  useEffect(() => {
    props. setWiners(allPlayers.slice(0, 3));
  }, []);

  return (
    <div className={style.winers}>
      <h3>מנצח 1: { props.winers[0] ? props. winers[0].name : ""}</h3>
      <h3>מנצח 2: { props.winers[1] ? props. winers[1].name : ""}</h3>
      <h3>מנצח 3: { props.winers[2] ? props. winers[2].name : ""}</h3>
    </div>
  );
}
