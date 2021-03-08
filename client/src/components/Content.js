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

   const onSearchDeveloperProfile = async () =>{
       const res = await axios.get(` http://localhost:4000/api/developers/${searchDevProfile}`);
       setSearchDevProfile(res.data);
   }
   const getDevelopersData = async () => {
       const res = await axios.get(` http://localhost:4000/api/developers/`);
       setDevelopersData(res.data);
   }

   useEffect(() => {
    if (!searchDevProfile)
        axios.get(' http://localhost:4000/api/developers/');
    }, [onAddDeveloper, searchDevProfile]);

   return (
       <>
         {developersData && (<div className = 'px-5 lg:px-13'>
             <div className = 'my-5 lg:my-13 text-center text-header text-2xl lg:text-5.5xl'> {children}</div>
             <hr className ='text-tertiary'/>
             <SearchBox value  = {searchDevProfile} setSearchDevProfile = {setSearchDevProfile} onSearch = {onSearchDeveloperProfile}/>
             <UsersList developersList = {developersData} getDevelopersData = {getDevelopersData}/>
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