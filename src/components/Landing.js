import React, { useEffect, useState } from 'react';

const Landing = () => {
    return (
        <div>
            <div className="random-tweet">
                <h3>
                    Guess The Handle!
                </h3>
            </div>
            
            <div className='landing-buttons'>
                <button type="button">Play!</button>
                <div className="divider"></div>
                <button type="button">Instructions</button>
                <div className="divider"></div>
                <button type="button">Highscores</button>
                <div className="divider"></div>
                <button type="button">Toggle Music</button>

            </div>
        </div>
    )
}

export default Landing;