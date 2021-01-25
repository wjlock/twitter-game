import React, { useEffect, useState } from 'react';
import axios from "axios";
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
  });
  


const GameRounds = () => {
    // Set State
    const [answers, setAnswers] = useState(["Answer 1", "Answer 2", "Answer 3", "Answer 4"])
    const [randomTweet, setRandomTweet] = useState('This is a random tweet')
    const [gameRound, setGameRound] = useState(1)
    const [points, setPoints] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [userAnswer, setUserAnswer] = useState('')
    const createAnswers = answers.map((answer) => {
        return <li>{answer}</li>
    })
    const handleUserAnswer = (e) => {
        setUserAnswer(e.target.value)
    }
    return (
        

        <div>
            <h1>Points: {points}</h1>
            <h1>Round {gameRound}</h1>
            <h2>{randomTweet}</h2>
            <ul>
                {createAnswers} 
            </ul>
        </div>
    )
}

export default GameRounds;