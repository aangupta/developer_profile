import React from 'react';
import DevImage from '../images/dev_hero.png'

const Hero = ( {isModelOpen}) => {
    return (
        <div className = 'text-white bg-primary h-auto p-13 lg:py-25 lg:p-0'>
            <div className = 'flex flex-col-reverse items-center justify-between lg:flex-row'>
                <h1 className ='text-4xl text-center lg:text-left lg:text-7xl py-13 lg:p-25'>The Developer Repository</h1>
                <img src= {DevImage} alt="developer" className = 'lg:pr-25 lg:h-96' />
            </div>
        </div>

    );
}
export default Hero;