import React from 'react'
import cx from 'classnames'
import { ReactComponent as User } from '../images/user.svg'
import { ReactComponent as Arrow } from '../images/arrow.svg' 
import { Link } from 'react-router-dom'


const UsersList = ( { developersList }) => {

    const developersData = (developersList.map(dev => (
        <div className = 'flex items-center justify-start mt-5 lg:mt-25' key ={dev.id}>
            {dev.avatar_url ? <img src = {dev.avatar_url} alt = 'avatar_url' className = ' rounded-full flex flex-shrink-0 mr-1.5 fill-current  h-5 w-5 lg:w-25 lg:h-25 text-secondary lg:mr-13'/> :  <img src = {User} alt = 'avatar_default' className = ' rounded-full flex flex-shrink-0 mr-1.5 fill-current  h-5 w-5 lg:w-25 lg:h-25 text-secondary lg:mr-13'/> }
            <Link to={`/api/developers/${dev.id}`} className='flex items-center justify-center text-xs break-all lg:text-4xl text-linkText'>{dev.id}
                <span><Arrow className='flex flex-shrink-0 w-3 h-3 ml-1 fill-current lg:w-5 lg:h-5 lg:ml-5 text-linkArrow' /></span>
            </Link>
        </div>
    )))

    return (
        <div>
            <div className ={cx ('grid grid-cols-2 gap-x-2lg:gap-x-25 mx-12 my-2.5 lg:mt-0 lg:mx-25', {
                'lg:mb-25': developersList.length > 0 ? true : false,
                'lg:mb-13': developersList.length === 0 ? true : false,
            })}>
                {developersData}

            </div>
        </div>
    )

}

export default UsersList;