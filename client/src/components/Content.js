import React, {useState, useEffect }from 'react';
import axios from 'axios';
import SearchBox from './SearchBox'
import UsersList from './UsersList';

const Content = ( {children, onAddDeveloper}) => {
    const[searchDevProfile, setSearchDevProfile] = useState(''); 
    const[developersData, setDevelopersData] = useState([]);
    const[showAddDeveloperModal , setShowAddDeveloperModal] = useState(false);


   const onAddDeveloperInfo = () => {
       setShowAddDeveloperModal(!showAddDeveloperModal);
       onAddDeveloper();
   }

   useEffect( () => {
       if(!searchDevProfile){
           getDevelopers('http://localhost:4000/api/developers/');
       }

   },[onAddDeveloper, searchDevProfile])

   const onSearchDeveloperProfile = async () =>{
       const res = getDevelopers(` http://localhost:4000/api/developers/search/${searchDevProfile}`);
       setSearchDevProfile(res.data);
       console.log(searchDevProfile);
   }
   const getDevelopers = async (url) => {
       console.log(url);
       const res = await axios.get(url);
       setDevelopersData(res.data);
   }


   return (
       <>
         {developersData && (<div className = 'px-5 lg:px-13'>
             <div className = 'my-5 lg:my-13 text-center text-header text-2xl lg:text-5.5xl'> {children}</div>
             <hr className ='text-tertiary'/>
             <SearchBox value  = {searchDevProfile} setSearchDevProfile = {setSearchDevProfile} onSearch = {onSearchDeveloperProfile}/>
             <UsersList developersList = {developersData}/>
             <hr className='text-tertiary mb-7.5 lg:mb-13' />
             <div className='flex items-center justify-center text-sm lg:text-4xl mb-2.5 lg:mb-13 text-header'>
                    {developersData?.length === 0 ? `No developers added yet` : `Could not find what you were looking for?`}
             </div>

             <div className = 'flex items-center justify-center'>
                 <button className='w-45 lg:w-auto h-7.5 lg:h-20 lg:px-10 text-sm lg:text-4xl text-white rounded-2xl bg-secondary mb-7.5 lg:mb-13 focus:outline-none' onClick={onAddDeveloperInfo}>
                        Add developer info
                </button>

             </div>

         </div>)}

       </>

   );


}
export default Content;