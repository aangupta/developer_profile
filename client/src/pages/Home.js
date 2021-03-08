import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Hero';
import Modal from '../components/Modal';
import Content from '../components/Content'
import cx from 'classnames';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onAddDeveloper = () => {
        setIsModalOpen(!isModalOpen);
    }


    return(
       <>
         {isModalOpen && (
             <div className = 'flex items-center justify-center'>
                 <Modal modalClose = {onAddDeveloper}/>
             </div>
         )}

        <div className = {cx ('relative w-auto h-screen font-body', {
             'opacity-50' : isModalOpen,
             'overflow-y-hidden' : isModalOpen,
         })}>

            <Header isModalOpen = {isModalOpen}/>,
            <Content onAddDeveloper={onAddDeveloper}>Explore developer profiles</Content>,
            <Footer />
        </div>   
       </>
    );

}

export default Home;