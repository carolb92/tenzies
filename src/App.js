import React from "react"
import './App.css';
import Dice from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {

  function generateNewDie(){
    return { 
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid(), 
    }
  }

  function allNewDice(){
    const newDice = []
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  // an array of dice
  const [dice, setDice] = React.useState(allNewDice())

  // represents whether or not the user has won the game
  const [tenzies, setTenzies] = React.useState(false)

  // side effect that runs every time the state of the dice array changes
  // keeps our two pieces of state in sync
  React.useEffect(() => {
    // check if all dice are held AND all dice have the same value
    if(dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)) {
      setTenzies(true)
    }
  }, [dice])

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      if(die.id === id) {
        return { ...die, isHeld: !die.isHeld}
      } else {
        return die
      }
    }))
  }

  const diceElements = dice.map(die => (
    <Dice 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)} />
  ))

  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        if(die.isHeld){
          return die
        } else {
          return generateNewDie()
        }
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  let buttonText = tenzies ? "New Game" : "Roll"

  return (
    <main>
      {/* render a confetti component if the user wins */}
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-button" onClick={rollDice}>{buttonText}</button>
    </main>
  );
}

export default App;
