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
    const [answers, setAnswers] = useState([])
    const [randomTweet, setRandomTweet] = useState('')

    useEffect(() => {
        client.get('search/tweets.json?q=sports&result_type=popular', function(error, tweets, response) {
            if(error) throw error;
            console.log(response);  // Raw response object.
          });

    })
    return (
        <h1>Hello</h1>
    )
}

export default GameRounds;