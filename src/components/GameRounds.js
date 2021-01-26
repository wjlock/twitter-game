import React, { useEffect, useState } from 'react';
import axios from "axios";
import useSWR from "swr"
// var Twitter = require('twitter');
// var client = new Twitter({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     bearer_token: process.env.TWITTER_BEARER_TOKEN
//   });
const fetcher = (...args) => fetch(...args).then((res) => res.json())


const GameRounds = () => {
    // Set State
    const [answers, setAnswers] = useState([])
    const [randomTweet, setRandomTweet] = useState('')
    const [gameRound, setGameRound] = useState(1)
    const [points, setPoints] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState("Answer 1")
    const [userAnswer, setUserAnswer] = useState('')
    const { data, error } = useSWR("http://localhost:8000/api/calls/newtweet", fetcher)
    console.log(data)
    const handleUserAnswer = (e) => {
        setUserAnswer(e.target.value)
        console.log(userAnswer)
    }
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    const createAnswers = answers.map((answer) => {
        return <button value={answer} onClick={handleUserAnswer}>{answer}</button>
    })
    function displayScoreScreen() {
        if (gameRound === 10) {
            return (
            <div>
                <h3>Congrats! You have completed 10 rounds of GuessThatHandle.</h3>
                <p>Your total score is <em>{points}</em></p>
                <button>Play Again!</button>
                <button>Submit to the highscores!</button>
            </div>
            )
        }
    }

    // set the answers array to [correctAnswer, ]



    function generateTweet() {
        const randomNumber = getRndInteger(0, 10)
        const tweet = data.statuses[randomNumber].full_text
        setRandomTweet(tweet)
        setCorrectAnswer(data.statuses[randomNumber].user.name)
        setAnswers([correctAnswer])
        console.log(answers)    
        console.log(correctAnswer)
    }

    // useEffect(async () => {
    //     const newTweets = await axios.get("http://localhost:8000/api/calls/newtweet")
    //     // .then((newTweets) => console.log(newTweets.data.statuses[2].text))
    //     // setRandomTweet(newTweets.data.statuses[5].text)
    //     // setRandomTweet(newTweets.data.statuses[5].text)
    //     setTweetData(newTweets)
    //     console.log(tweetData)
    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        //check if they have the right answer
        //add pints if the answer is correct
        // increase the round number (everytime)
        // Set a new random tweet
        // set the new correct answer
        // set the remainning random answers
        // check id round number is 10, if so end the game
        if (userAnswer === correctAnswer && gameRound === 10) {
            setPoints(points +100)
            alert("Game Over")
        } else if (userAnswer != correctAnswer && gameRound === 10){
            // end the game
            // display summary

        } else if (userAnswer === correctAnswer && gameRound < 10) {
            setPoints(points +100)
            setGameRound(gameRound +1)
            generateTweet()
        } else if (userAnswer != correctAnswer && gameRound < 10) {
            setGameRound(gameRound +1)
            generateTweet()
            // display new tweet
            // display new answers
            // display notification the answer was incorrect
        } else {
            alert('Please select an answer before clicking submit')
        }
    }
    return (
        

        <div>
            <button onClick={generateTweet}>Generate the first tweet</button>
            <h1>Points: {points}</h1>
            <h1>Round {gameRound}</h1>
            <h2>{randomTweet}</h2>  
            <ul>
                {createAnswers} 
            </ul>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div>
                {displayScoreScreen()}
            </div>
        </div>
    )
}

export default GameRounds;