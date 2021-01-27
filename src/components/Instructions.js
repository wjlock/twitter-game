import React from 'react';
import { Input, Box, Button, HStack, Select, Text, Center, VStack } from '@chakra-ui/react'

const Instructions = () => {
    return (
        <Center>
            <VStack>
                <Text fontSize='3xl' fontFamily=" 'Righteous', cursive">Summary</Text>
                    <Text fontSize='2xl'>Welcome to Guess that Handle. This is a game that shows you random tweets in a topic of your choice, and you must guess the person who authored it!</Text>
                <Text fontSize='3xl' fontFamily=" 'Righteous', cursive">Game Setup</Text>
                    <Text fontSize='2xl'>Getting started is simple. On the home page, simply type in the topic you would like to be quizzed on (example - politics) and select the game mode you like to play from th dropdown. After your selections are made, click play and you are off!</Text>
                <Text fontSize='3xl' fontFamily=" 'Righteous', cursive">Game Modes</Text>
                    <Text fontSize='2xl'><b>Rounds</b>: In this game mode, you have 10 rounds (and 10 tweets) to guess through. Each succesful answer will provide you with 100 points. Incorrect answers will not harm your score, but will provide no points. The game is over when 10 rounds have elapsed</Text>
                    <Text fontSize='2xl'><b>Unlimited</b>: In this game mode, you can play as many rounds as you can get through. Once again, each correct answer will net 100 points. If you answer incorrectly, 1 incorrect answer will be added to your tally. If you reach 3 incorrect answers, the game is over.</Text>
            </VStack>
        </Center>
    )
}

export default Instructions;