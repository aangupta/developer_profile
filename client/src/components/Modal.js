import React, { useState } from 'react';
import CodechefIcon from '../images/codechef.png';
import GithubIcon from '../images/github.png';
import LinkedinIcon from '../images/linkedin.png';
import MediumIcon from '../images/medium.png';
import TwitterIcon from '../images/twitter.png';
import HackerRankIcon from '../images/hackerrank.png';
import FormInput from './FormInput';
import axios from 'axios';

const Modal = ({modalClose}) => {

    const [github, setGithub] = useState('');
    const [twitter, setTwitter] = useState('');
    const [hackerrank, setHackerRank] = useState('');
    const [codechef, setCodeChef] = useState('');
    const [medium, setMedium] = useState('');
    const [linkedin, setLinkedIn] = useState('');
    const [error, setError] = useState('');
    
    
    const header = {'Content-Type': 'application/json'};

    const onSubmitHandler = async () => {
       if(github){
           setError('');
           const inputValue = {
               github_id: github,
               linkedin_id: linkedin,
               codechef_id: codechef,
               hackerrank_id: hackerrank,
               twitter_id: twitter,
               medium_id: medium
           }
            try{
                await axios.post('http://localhost:4000/api/developers/', inputValue, {headers:header});
                setError('');
            } catch (error) {
                console.log(error.response);
                setError('Github id not found');
            }

        } else {
            setError('Github id is required');
        }
    }

    return (
        <>
        <div className ='absolute inset-0 z-10 items-center justify-center overflow-auto text-black bg-transparent lg:p-56 lg:flex font-body'>
            <div className = 'h-full m-10 text-2xl bg-white shadow-2xl lg:h-auto lg:m-0 lg:w-350 lg:mt-192 2xl:mt-97'>
                <div className ='p-5 lg:p-13 text-base lg:text-3.5xl'>
                    Add developer profile
                </div>

                <div className='border border-b-1 text-terniary mx-5 mb-7.5 lg:mx-7.5 lg:mb-13'> </div>
                    <div className='m-5 lg:m-7.5'>
                        <div className ='flex flex-col text-sm px-5 lg:px-13 lg:text-2xl'> 
                         <FormInput value={github} setValue={setGithub} label='Github' isRequired={true} image={GithubIcon} error={error} />
                         <FormInput value={linkedin} setValue={setLinkedIn} label='Linkedin' isRequired={false} image={LinkedinIcon}  />
                         <FormInput value={codechef} setValue={setCodeChef} label='Codechef' isRequired={false} image={CodechefIcon}  />
                         <FormInput value ={hackerrank} setValue={setHackerRank} label='Hackerrank' isRequired={false} image={HackerRankIcon}  />
                         <FormInput value={twitter} setValue={setTwitter} label='Twitter' isRequired={false} image={TwitterIcon}  />
                         <FormInput value={medium} setValue={setMedium} label='Medium' isRequired={false} image={MediumIcon}  />
                        </div>
                    </div>
                <div className='border border-b-1 text-terniary mx-5 mb-7.5 lg:mx-7.5 lg:mb-13'> </div>
                <div className ='flex items-center flex-row justify-end m-6 text-sm lg:text-2xl lg:mx-14'>
                    <button className = 'w-44 focus:outline-none mx-13'  onClick={modalClose}>Cancel</button>
                    <button className = 'w-32 h-6 focus:outline-none bg-secondary text-white rounded-lg lg:w-44 lg:h-14' onClick = {onSubmitHandler}>Submit</button>
                </div>
            </div>


        </div>
        </>
    );



}
export default Modal;