import React from 'react';

const FormInput = ({value, setValue, image, error, isRequired, label}) => {

    return (
        <>
            <div className = 'flex items-center justify-start'>
                <img src={image} className='w-3 h-3 lg:w-7.5 lg:h-7.5 mr-2' alt={label} />
                <div>{label}{isRequired && <span>*</span>}</div>
            </div>
            <div>
                <input className = 'w-full h-auto my-2 border focus:outline-none rounded-lg md:w-58 lg:my-5 lg:h-13 lg:w-120'
                type ='text' value = {value} onChange={(e) => setValue(e.target.value)}/>
            </div>
            <div className='text-red-600'>
                {error}
            </div>
        </>

    );


}

export default FormInput;