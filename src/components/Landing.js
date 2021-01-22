import React from 'react';

const Landing = () => {
    return (
        <div>
            <div className='profile-image'>
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"></img>
            </div>
            <div className="random-tweet">
                <h3>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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