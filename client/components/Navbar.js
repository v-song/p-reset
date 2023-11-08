import React from 'react';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import CreateButton from './CreateButton';

function Navbar() {
    return (
        <div className="flex w-full bg-gradient-to-r from-pink-300  to-sky-300 justify-between items-center">
            <div className="p-5">
                <h1 className="text-2xl font-extrabold"> p-reset</h1>
            </div>
            <div className="flex gap-5 p-5 items-center">
            <button class="button" onClick={() => window.location.href = 'http://localhost:8080/google/login'}>
            Login with Google
            </button>
            
            <button class="button" onClick={() => window.location.href = 'http://localhost:8080/logout'}>
            Logout from Google
            </button>
                <FaCalendarAlt />
                <FaUser/>
                <CreateButton />
            </div>
        </div>
    );
}

export default Navbar;
