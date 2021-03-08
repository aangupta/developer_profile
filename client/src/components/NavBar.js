import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return(
        <div className ='flex items-center justify-between bg-primary w-full text-sm lg:text-2xl p-6 h-13 lg:h-25 text-white'>
            <Link to = '/' >The Developer Profile</Link>
            <Link to = '/' >All Developers</Link>
        </div>
    );

}

export default NavBar;