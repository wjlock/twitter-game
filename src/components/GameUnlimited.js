import React, { useEffect, useState } from 'react';
import axios from "axios";
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
  });
  


const GameUnlimited = () => {
    // Set State
    const [answers, setAnswers] = useState(["Answer 1", "Answer 2", "Answer 3", "Answer 4"])
    const [randomTweet, setRandomTweet] = useState('This is a random tweet')
    const [gameRound, setGameRound] = useState(1)
    const [points, setPoints] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState('Answer 1')
    const [userAnswer, setUserAnswer] = useState('')
    const [incorrectAnswer, setIncorrectAnswer] = useState(0)
    const handleUserAnswer = (e) => {
        setUserAnswer(e.target.value)
        console.log(userAnswer)
    }
    const createAnswers = answers.map((answer) => {
        return <button value={answer} onClick={handleUserAnswer}>{answer}</button>
    })
    const handleSubmit = () => {
        if (userAnswer === correctAnswer) {
            setPoints(points +100)
            setGameRound(gameRound +1)
        } else {
            setGameRound(gameRound +1)
            setIncorrectAnswer(incorrectAnswer +1)
        }
    }

    return (
        

        <div>
            <h1>Incorrect Anwers</h1>
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

export default GameUnlimited;