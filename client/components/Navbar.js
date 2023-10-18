import React from 'react';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

function Navbar() {
    return (
        <div className="flex w-full bg-gradient-to-r from-pink-300  to-sky-300 justify-between items-center mb-5">
            <div className="p-5">
                <h1 className="text-2xl font-extrabold">p-reset</h1>
            </div>
            <div className="flex gap-5 p-5">
                <FaCalendarAlt />
                <FaUser/>
            </div>
        </div>
    );
}

export default Navbar;
