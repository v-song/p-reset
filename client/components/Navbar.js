import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import CreateButton from './CreateButton';
import Link from 'next/link';

function Navbar() {
    const [userInfo, setUserInfo] = useState(null);  
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/user_info', {credentials: 'include'})
            .then(response => response.json())
            .then(data => {
              console.log(data);
              setUserInfo(data);
            });
      }, []);

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        try {
            const response = await fetch('http://localhost:8080/user_info', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                throw new Error('Not authenticated');
            }
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    return (
        <div className="flex w-full bg-gradient-to-r from-pink-300  to-sky-300 justify-between items-center">
            <div className="p-5">
                <Link href="/"><h1 className="text-2xl font-extrabold"> p-reset</h1></Link>
            </div>
                <div className="flex gap-5 p-5 items-center">
                
                
                {isAuthenticated ? (null) : (
                    <button class="button" onClick={() => window.location.href = 'http://localhost:8080/google/login'}>
                    Login with Google
                    </button>
                    )}
                
                {isAuthenticated ? (
                    <button class="button" onClick={() => window.location.href = 'http://localhost:8080/logout'}>
                    Logout from Google
                    </button>
                ) : (null)}


                <FaCalendarAlt />
                {isAuthenticated ? (
                    <img className= "w-10 h-10 object-cover rounded-full border-2 border-gray-300" src={userInfo.picture} alt="User profile"/>
                ) : (null)}

                <CreateButton />
            </div>
        </div>
    );
}

export default Navbar;
