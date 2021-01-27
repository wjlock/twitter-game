import React, { useEffect, useState } from 'react';
import axios from "axios";
import useSWR from "swr"
import { useParams } from "react-router";
import { Button, ButtonGroup, Center, VStack, Text } from "@chakra-ui/react"
const fetcher = (...args) => fetch(...args).then((res) => res.json())
const gamemode = 'Unlimited'
const userid = "Johnny Smith"


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
    const [incorrectGuesses, setIncorrectGuesses] = useState(0)
    const { data, error, revalidate } = useSWR(`http://localhost:8000/api/calls/newtweet?q=${query}`, fetcher, {
        revalidateOnFocus: false

    })


/* -------------------------------- Functions ------------------------------- */
    const handleUserAnswer = (user) => () => {
        setUserAnswer(user)
    }
    const handleScoreSubmit = (e) => {
        e.preventDefault()
        const newHighscore = { userid, points, gamemode }
        axios.post('http://localhost:8000/api/highscores/newhighscore', newHighscore)
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
                <h3>Congrats! You have completed {gameRound} rounds of GuessThatHandle.</h3>
                <p>Your total score is <em>{points}</em></p>
                <button>Play Again!</button>
                <Button colorScheme="teal" onClick={handleScoreSubmit}>Play!</Button>
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
        if (userAnswer.answer) {
            setPoints(points +100)
            setGameRound(gameRound +1)
        } else if (!userAnswer.answer && incorrectGuesses === 2){
            setIncorrectGuesses(incorrectGuesses + 1)
            setGameStatus(false)
        } else if (!userAnswer.answer && incorrectGuesses < 2) {
            setGameRound(gameRound +1)
            setIncorrectGuesses(incorrectGuesses +1)
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
                <Text p={1} borderRadius="5px" border="2px" borderColor="grey.200" fontSize='3xl' fontFamily=" 'Righteous', cursive">Points: {points}</Text>
                <Text p={1} borderRadius="5px" border="2px" borderColor="grey.200" fontSize='3xl' fontFamily=" 'Righteous', cursive">Round {gameRound}</Text>
                <Text p={1} borderRadius="5px" border="2px" borderColor="grey.200" fontSize='3xl' fontFamily=" 'Righteous', cursive">Incorrect Guesses {incorrectGuesses}/3</Text>
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