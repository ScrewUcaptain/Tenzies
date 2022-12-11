import React from "react";
import Dice from "./Components/Dice";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
    
    const [dice, setDice] = React.useState(allNewDice())

    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld)
        if (allHeld) {
            const heldValue = dice[0].value
            const allValue = dice.every(die => die.value === heldValue)
            if(allValue) {
                setTenzies(true)
            }
        } 
    }, [dice])

    function generateNewDie() {
        return {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
                }
    }
    function allNewDice(){
        const diceArray = []
        for(let i = 0; i < 10; i++){
            diceArray.push(generateNewDie())
        }
        return diceArray;
    }
    const setOfDice = dice.map( die => <Dice
            key={die.id}
            id={die.id}
            isHeld={die.isHeld}
            value={die.value}
            holdDice={holdDice}
         />)

    function holdDice(id){
        setDice(oldState => oldState.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    function rollDice(){
        setDice(oldState => oldState.map(die => {
            return die.isHeld ? die : generateNewDie()
        }))
    }

    function newGame() {
        window.location.reload();
    }

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="diceList">
                {setOfDice}
            </div>
            <button 
                className="reroll" 
                onClick={tenzies ? newGame : rollDice}
            >
                {tenzies ? 'New Game' : 'Roll'}
            </button>
        </main>
    )
}