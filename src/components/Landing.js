import React, { useEffect, useState } from 'react';
import { Input, Box, Button, HStack } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'


const Landing = () => {
    const [query, setQuery ] = useState("")
    const { push } = useHistory();

    const handlePlay = () => {
        push(`/gameRounds/${query}`)
    }

    return (
        <div>
            <div className="random-tweet">
                <h3>
                    Guess The Handle!
                </h3>
            </div>

            <HStack>
            <Input color="black" placeholder="Enter your topic here" size="lg" value={query} onChange={e => setQuery(e.target.value)}/>
            <Button colorScheme="teal" onClick={handlePlay}>Play!</Button>
            </HStack>
        </div>
    )
}

export default Landing;