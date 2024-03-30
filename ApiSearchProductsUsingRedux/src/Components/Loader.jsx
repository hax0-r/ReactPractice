import React from 'react'
import "../Styles/Loader.css"

export default function Loader() {
    return (
        <div className='w-screen h-screen fixed top-0 bg-slate-200 flex justify-center items-center'>
            <div class="loader"></div>
        </div>
    )
}
