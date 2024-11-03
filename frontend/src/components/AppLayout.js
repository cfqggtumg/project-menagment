import React from 'react'
import Navbar from '../components/Headers/Navbar'
import Menu from '../components/Menu';

const AppLayout = ({ children }) => {
    return (
        <>
            <Menu />
        <div className='bg-white'>
            <Navbar />
            <div className=' w-screen flex container mx-auto' style={{ height: 'calc(100vh - 56px)' }}>

                <div className="flex-1">
                    <div className="flex">
                        {children}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AppLayout