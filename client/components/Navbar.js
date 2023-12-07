import React, { useEffect, useState } from "react";
import { FaUser } from 'react-icons/fa';
import {BiSolidHeart} from 'react-icons/bi'
import CreateButton from './CreateButton';
import Link from 'next/link';
import { LoadingPage } from './Loading';


function Navbar() {
    const [userInfo, setUserInfo] = useState(null);  
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/user_info', {credentials: 'include'})
            .then(response => response.json())
            .then(data => {
              console.log(data);
              setUserInfo(data);
              setIsLoading(false);
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

    if (isLoading) {
        return <LoadingPage />;
      }
    return (
        <div className="flex w-full justify-between items-center z-100 border-b">
            <div className="p-5">
                <Link href="/"><span className="text-[#4E3506] flex gap-2 items-center hover:border-b-2 hover:border-b-sky-800 text-[35px] font-bold "><h1>p-reset</h1><BiSolidHeart/> </span></Link>
            </div>
                <div className="flex gap-5 p-3 items-center">
                <div className="bg-[#99BFC7] text-[#4E3506] flex items-center w-70 px-5 h-12 rounded-2xl gap-2 hover:border-b-2 hover:border-b-cyan-900 hover:text-cyan-900">
                    <button onClick={() => window.location.href = 'http://localhost:3000/about'} className=" text-[20px] font-medium   ">About</button>   

                </div>
                
                {isAuthenticated ? (
                    <>
                    <CreateButton id={userInfo.id}/>
                    <div className="bg-[#4BAABE] text-[#FFF6E9] flex items-center w-70 px-5 h-12 mr-2 rounded-2xl gap-2 text-[20px] font-medium hover:border-b-2 hover:border-b-cyan-900 hover:text-cyan-900">
                        <img className= "w-10 h-10 object-cover rounded-full border-2 border-gray-300" src={userInfo.picture} alt="User profile"/>
                        <button class="hover:border-b-2 hover:border-b-blue-400" onClick={() => window.location.href = 'http://localhost:8080/logout'}>Logout </button>  
                        </div>
                        </>
                ) : (<button className="flex items-center gap-2 border-2 border-black hover:bg-blue-400 hover:border-white hover:text-white active:bg-blue-700 active:scale-90 rounded-full px-4 py-2"
                 onClick={() => window.location.href = 'http://localhost:8080/google/login'}> 
                <span>LOGIN</span> <FaUser/>
                </button>)}


            </div>
        </div>
    );
}

export default Navbar;
