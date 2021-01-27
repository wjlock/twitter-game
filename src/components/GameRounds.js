import React, { useEffect, useState } from 'react';
import axios from "axios";
import useSWR from "swr"
import { useParams } from "react-router";
import { Button, ButtonGroup, Center, VStack, Text } from "@chakra-ui/react"
const fetcher = (...args) => fetch(...args).then((res) => res.json())


const GameRounds = () => {
    // Set State
    const { query } = useParams();

    const [answers, setAnswers] = useState([])
    const [randomTweet, setRandomTweet] = useState('')
    const [gameRound, setGameRound] = useState(1)
    const [points, setPoints] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState("Answer 1")
    const [userAnswer, setUserAnswer] = useState('')
    const [gameStatus, setGameStatus] = useState(true)
    const { data, error, revalidate } = useSWR(`http://localhost:8000/api/calls/newtweet?q=${query}`, fetcher, {
        revalidateOnFocus: false

    })


/* -------------------------------- Functions ------------------------------- */
    const handleUserAnswer = (user) => () => {
        setUserAnswer(user)
    }

    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    const createAnswers = data?.users?.map((user) => (
         <Button p={1} colorScheme='blue' onClick={handleUserAnswer(user)}>{user.name}</Button>
    ))

    const displayScoreScreen = () => {
        if (gameStatus === false) {
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        //check if they have the right answer
        //add pints if the answer is correct
        // increase the round number (everytime)
        // Set a new random tweet
        // set the new correct answer
        // set the remainning random answers
        // check id round number is 10, if so end the game
        if (userAnswer.answer && gameRound === 10) {
            setPoints(points +100)
            setGameStatus(false)
            alert("Game Over")
        } else if (!userAnswer.answer && gameRound === 10){
            setGameStatus(false)

        } else if (userAnswer.answer && gameRound < 10) {
            setPoints(points +100)
            setGameRound(gameRound +1)
            // generateTweet()
        } else if (!userAnswer.answer && gameRound < 10) {
            setGameRound(gameRound +1)
            // generateTweet()
            // display new tweet
            // display new answers
            // display notification the answer was incorrect
            
        } else {
            alert('Please select an answer before clicking submit')
        }

        // Remove Cache, force a refresh
        revalidate();
    }
    return (

        <Center>
            <VStack>
                <Text fontSize='3xl' fontFamily=" 'Righteous', cursive">Points: {points}</Text>
                <Text fontSize='3xl' fontFamily=" 'Righteous', cursive">Round {gameRound}</Text>
                <Text fontSize='3xl' fontFamily=" 'Righteous', cursive">{data?.tweet}</Text>  
                <ButtonGroup>
                    {createAnswers} 
                </ButtonGroup>
                <div>
                    <Button onClick={handleSubmit}>Submit</Button>  
                </div>
                <div>
                    {displayScoreScreen()}
                </div>
            </VStack>
        </Center>
    )
}

export default GameRounds;