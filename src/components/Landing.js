import React, { useEffect, useState } from 'react';
import { Input, Box, Button, HStack, Select, Center, Text } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'


const Landing = () => {
    const [query, setQuery ] = useState("")
    const [mode, setMode] = useState("")
    const { push } = useHistory();

    const handlePlay = () => {
        push(`/${mode}/${query}`)
    }

    return (
        <div>
            <div className="random-tweet">
                <h3>
                    Guess The Handle!
                </h3>
            </div>

            <HStack>
            <Input colorScheme="teal" placeholder="Enter your topic here" size="lg" value={query} onChange={e => setQuery(e.target.value)}/>
            <Select placeholder="Select Gamemode" onChange={e => setMode(e.target.value)}>
                <option value="gameRounds">Rounds</option>
                <option value="gameUnlimited">Unlimited</option>
            </Select>
            <Button colorScheme="teal" onClick={handlePlay}>Play!</Button>
            </HStack>
            <Center>
                <Text mt={160} fontSize="3xl">“If Paul Revere had been a modern-day citizen, he wouldn't have ridden down Main Street. He would have tweeted." — @AlecJRoss</Text>
            </Center>
        </div>
    )
}
export default Landing;