import React, {useState, useEffect}from 'react';
import { useParams }  from 'react-router-dom';
import axios from 'axios';
import cx from 'classnames';
import {Fragment} from 'react';
import dayjs from 'dayjs';

import CodechefIcon from '../images/codechef.png';
import GithubIcon from '../images/github.png';
import LinkedinIcon from '../images/linkedin.png';
import MediumIcon from '../images/medium.png';
import TwitterIcon from '../images/twitter.png';
import HackerRankIcon from '../images/hackerrank.png';
import {ReactComponent as LocationIcon } from '../images/location.svg'
import {ReactComponent as OfficeIcon} from '../images/office.svg'
import {ReactComponent as UserIcon} from '../images/user.svg'
import {ReactComponent as NotFound} from '../images/not_found.svg'
import {ReactComponent as ArrowIcon } from '../images/arrow.svg'
import {ReactComponent as EmailIcon } from '../images/email.svg'
import {ReactComponent as LinkIcon} from '../images/link.svg'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import ProfileIcon from '../components/Icon'



const DeveloperProfile = () => {
    const [developerProfileInfo, setDeveloperProfileInfo] = useState(null);
    const [load, setLoad] = useState(true);
    const  { developerId }  = useParams();
    console.log(developerId);

    useEffect (() => {
        try{

            const getDeveloperProfile = async () => {
                const res = await axios.get(`/api/developers/${developerId}`);
                console.log();
                setDeveloperProfileInfo(res.data);
               
                setLoad(false);
            }
            getDeveloperProfile();
            
        } catch(error) {
            console.log(error);
            setLoad(false);

        }
    }, [developerId]);



    return(
       <div className = 'font-body'>
           <NavBar />
           { !load && (developerProfileInfo ? (
               <>
                    <div className='h-full lg:h-100 bg-sub'>
                        <div className = 'flex flex-col justify-center items-center px-7 py-10 lg:flex-row lg:justify-start lg:py-20 lg:px-8'>
                            {developerProfileInfo.avatar_url ? <img src={developerProfileInfo.avatar_url} alt='developer_image' className='mr-5 rounded-full fill-current w-25 h-25 lg:w-83 lg:h-83 text-secondary' /> : <UserIcon className='fill-current w-25 h-25 lg:w-83 lg:h-83 text-secondary' />}
                            <div className='flex flex-col mt-2.5 lg:mt-12 text-center lg:text-left'>
                            <div className ='text-xl lg:text-5xl text-header'>
                                {developerProfileInfo.name}
                            </div>
                            
                            <div className = {cx ('text-base lg:text-2xl',{
                                 'lg:mt-7.5': (developerProfileInfo.company !== null && developerProfileInfo.bio !== null),
                                 'mt-2': (developerProfileInfo.company !== null && developerProfileInfo.bio !== null),
                            })}>
                                 {developerProfileInfo.company && <p>{developerProfileInfo.company}</p>}
                                 {developerProfileInfo.bio && <p>{developerProfileInfo.bio}</p>}
                            </div>

                            <div className ='mt-5I mx-2 lg:mx-0 lg:mt-7.5 flex justify-center items-center lg:justify-start'>
                                {developerProfileInfo.github_id && (
                                            <ProfileIcon id={developerProfileInfo.github_id} image={GithubIcon} link={`https://github.com/${developerProfileInfo.github_id}`} />
                                )}  

                                {developerProfileInfo.hackerrank_id && (
                                        <ProfileIcon id={developerProfileInfo.hackerrank_id} image={HackerRankIcon} link={`https://www.hackerrank.com/${developerProfileInfo.hackerrank_id}`} />
                                )}
                                
                                {developerProfileInfo.codechef_id && (
                                        <ProfileIcon id={developerProfileInfo.codechef_id} image={CodechefIcon} link={`https://www.codechef.com/users/${developerProfileInfo.codechef_id}`} />
                                )}
                                
                                {developerProfileInfo.linkedin_id && (
                                        <ProfileIcon id={developerProfileInfo.linkedin_id} image={LinkedinIcon} link={`https://in.linkedin.com/in/${developerProfileInfo.linkedin_id}`} />
                                )}
                                
                                {developerProfileInfo.medium_id && (
                                        <ProfileIcon id={developerProfileInfo.medium_id} image={MediumIcon} link={`https://medium.com/@${developerProfileInfo.medium_id}`} />
                                )}
                                    
                                {developerProfileInfo.twitter_id && (
                                        <ProfileIcon id={developerProfileInfo.twitter_id} image={TwitterIcon} link={`https://twitter.com/${developerProfileInfo.twitter_id}`} />
                                )}
                                
                                {developerProfileInfo.email && (
                                        <a href={`mailto:${developerProfileInfo.email}`}>
                                            <EmailIcon className='w-5 h-5 lg:w-7.5 lg:h-7.5 mr-7.5 lg:mr-3.5 text-header fill-current' />
                                        </a>
                                )}
                            
                            </div>
                             
                             <div className = {cx ('flex justify-center lg:justify-start items-center text-xs lg:text-base  text-header', {
                                 'lg:mt-7.5': developerProfileInfo.location !== null ||developerProfileInfo.company !== null || developerProfileInfo.blog !== '',
                                 'mt-5': developerProfileInfo.location !== null || developerProfileInfo.company !== null || developerProfileInfo.blog !== ''
                                 })}>
                                    {developerProfileInfo.location &&
                                        <div className='flex items-center justify-center mr-4'>
                                            <LocationIcon className = 'w-4 h-4'/> 
                                            <span className='pl-3'>{developerProfileInfo.location}</span>
                                            
                                    </div>}

                                        {developerProfileInfo.company &&
                                        <div className='flex items-center justify-center mr-4'>
                                            <OfficeIcon className = 'w-4 h-4'/> 
                                            <span className='pl-3'>{developerProfileInfo.company}</span>
                                            
                                        </div>}

                                        {developerProfileInfo.blog &&
                                        <div className='flex items-center justify-center mr-4'>
                                            <LinkIcon className = 'w-4 h-4'/> 
                                            <span className='pl-3'>{developerProfileInfo.blog}</span>
                                            
                                        </div>}
                             </div>

                            

                            </div>

                        </div>

                    </div> 

                    <div className ='mt-5'>

                        <div className ='flex items-center justify-center text-header text-2xl lg:text-5xl lg:my-5 lg:p-12'>
                            Github Repositories
                        </div>

                        <div className='border border-b-1 text-tertiary' />

                        <>
                            {developerProfileInfo.repos.length > 0 && (
                                developerProfileInfo.repos.map(repo => (
                                    <Fragment key={repo.name}>
                                        <div className='py-2.5 px-4 lg:py-7.5 lg:px-24.5 flex flex-col'>
                                            <a rel='noreferrer' target='_blank' href={repo.html_url} className='flex items-center justify-start text-xl lg:text-4xl text-linkColor'>
                                                {repo.name}
                                                <span><ArrowIcon className='w-3 h-3 ml-1 fill-current lg:w-5 lg:h-5 lg:ml-5 text-linkArrow' /></span>
                                                <span className='pl-5 text-xs lg:text-2xl text-timeAgo'>Updated on {dayjs(repo.updated_at).format('DD MMM YYYY')}</span>
                                            </a>
                                            <div className='text-sm lg:text-3.5xl text-header'>
                                                {repo.description}
                                            </div>
                                        </div>
                                        <div className='mx-5 border border-b-1 text-tertiary' />
                                    </Fragment>
                                ))
                            )}
                        </>

                        

                        


                    </div>
               </>

           ) : (
               <NotFound />
           )
           )}
           <Footer/>

       </div>
      
    );
}
export default DeveloperProfile;