import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useParams } from "react-router";
import { Button, ButtonGroup, Center, VStack, Text } from "@chakra-ui/react";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const gamemode = "Unlimited";
const userid = "Johnny Smith";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const GameRounds = () => {
  // Set State
  const { query } = useParams();
  const [gameRound, setGameRound] = useState(1);
  const [points, setPoints] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [gameStatus, setGameStatus] = useState(true);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const { data, error, revalidate } = useSWR(
    `${REACT_APP_SERVER_URL}/api/calls/newtweet?q=${query}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  /* -------------------------------- Functions ------------------------------- */
  const handleUserAnswer = (user) => () => {
    setUserAnswer(user);
  };
  const resetGame = () => {
    setGameStatus(true);
    setGameRound(1);
    setPoints(0);
    setIncorrectGuesses(0);
  };
  const handleScoreSubmit = (e) => {
    e.preventDefault();
    const newHighscore = { userid, points, gamemode };
    axios.post(
      `${REACT_APP_SERVER_URL}/api/highscores/newhighscore`,
      newHighscore
    );
  };

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const createAnswers = data?.users?.map((user) => (
    <Button p={1} colorScheme="blue" onClick={handleUserAnswer(user)}>
      {user.name}
    </Button>
  ));

  const displayScoreScreen = () => {
    if (gameStatus === false) {
      return (
        <Center border="2px" borderRadius="5px">
          <VStack>
            <Text m={15}>
              Congrats! You have completed {gameRound} rounds of
              GuessThatHandle.
            </Text>
            <p>
              Your total score is <em>{points}</em>
            </p>
            <ButtonGroup>
              <Button colorScheme="teal" onClick={resetGame}>
                Play Again!
              </Button>
              <Button colorScheme="teal" onClick={handleScoreSubmit}>
                Send to Highscores
              </Button>
            </ButtonGroup>
          </VStack>
        </Center>
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userAnswer.answer) {
      setPoints(points + 100);
      setGameRound(gameRound + 1);
    } else if (!userAnswer.answer && incorrectGuesses === 2) {
      setIncorrectGuesses(incorrectGuesses + 1);
      setGameStatus(false);
    } else if (!userAnswer.answer && incorrectGuesses < 2) {
      setGameRound(gameRound + 1);
      setIncorrectGuesses(incorrectGuesses + 1);
    } else {
      alert("Please select an answer before clicking submit");
    }

    // Remove Cache, force a refresh
    revalidate();
  };
  return (
    <Center>
      <VStack>
        <Text p={1} fontSize="2x1" fontFamily=" 'Righteous', cursive">
          Game Mode: Unlimited
        </Text>
        <Text
          p={1}
          borderRadius="5px"
          border="2px"
          borderColor="grey.200"
          fontSize="3xl"
          fontFamily=" 'Righteous', cursive"
        >
          Points: {points}
        </Text>
        <Text
          p={1}
          borderRadius="5px"
          border="2px"
          borderColor="grey.200"
          fontSize="3xl"
          fontFamily=" 'Righteous', cursive"
        >
          Round {gameRound}
        </Text>
        <Text
          p={1}
          borderRadius="5px"
          border="2px"
          borderColor="grey.200"
          fontSize="3xl"
          fontFamily=" 'Righteous', cursive"
        >
          Incorrect Guesses {incorrectGuesses}/3
        </Text>
        <Text fontSize="3xl" fontFamily=" 'Righteous', cursive">
          {data?.tweet}
        </Text>
        <ButtonGroup>{createAnswers}</ButtonGroup>
        <div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        <div>{displayScoreScreen()}</div>
      </VStack>
    </Center>
  );
};

export default GameRounds;
