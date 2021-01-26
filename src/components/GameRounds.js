import React, { useEffect, useState } from 'react';
import axios from "axios";
// var Twitter = require('twitter');
// var client = new Twitter({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     bearer_token: process.env.TWITTER_BEARER_TOKEN
//   });
  


const GameRounds = () => {
    // Set State
    const [answers, setAnswers] = useState(["Answer 1", "Answer 2", "Answer 3", "Answer 4"])
    const [randomTweet, setRandomTweet] = useState('This is a random tweet')
    const [gameRound, setGameRound] = useState(1)
    const [points, setPoints] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState('Answer 1')
    const [userAnswer, setUserAnswer] = useState('')
    const handleUserAnswer = (e) => {
        setUserAnswer(e.target.value)
        console.log(userAnswer)
    }
    const createAnswers = answers.map((answer) => {
        return <button value={answer} onClick={handleUserAnswer}>{answer}</button>
    }) 

    const handleSubmit = async (e) => {
        const setNewTweet = await axios
            .get("http://localhost:8000/api/calls/newtweet")
            .then(console.log(setNewTweet))
        //check if they have the right answer
        //add pints if the answer is correct
        // increase the round number (everytime)
        // Set a new random tweet
        // set the new correct answer
        // set the remainning random answers
        // check id round number is 10, if so end the game
        if (userAnswer === correctAnswer) {
            setPoints(points +100)
            setGameRound(gameRound +1)
            console.log(setNewTweet)
            
        } 
    }

    return (
        

        <div>
            <h1>Points: {points}</h1>
            <h1>Round {gameRound}</h1>
            <h2>{randomTweet}</h2>  
            <ul>
                {createAnswers} 
            </ul>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default GameRounds;