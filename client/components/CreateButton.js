import React from 'react'
import { useState } from "react";

import {BsCalendarPlus} from 'react-icons/bs'
import {MdOutlineArrowDropDown} from 'react-icons/md'
import Link from 'next/link'


const CreateButton = ({id}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                className="ml-4 px-4 py-3 text-center rounded-2xl border bg-gradient-to-r from-yellow-500 via-green-600 to-blue-500 text-white hover:scale-105 transform transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-stone-400 active:scale-95"
                onClick={() => setIsOpen(!isOpen)}
            >
                <BsCalendarPlus className="inline-block mr-2" />
                Explore
                <MdOutlineArrowDropDown className="inline-block ml-2 text-2xl" />
            </button>

            {isOpen && (
                <div className="absolute z-10 ml-5 w-32 bg-white shadow-xl">
                    <Link href={`/journals?id=${id}`}>
                    <button
                        className="block px-4 pt-2 w-full  text-gray-800 hover:border-b-2 hover:border-sky-400 hover:text-gray-900"
                    >
                        Journal
                    </button>
                    </Link>
                    <Link href="/calender">
                    <button
                    
                        className="block px-4 pt-2 w-full  text-gray-800 hover:border-b-2 hover:border-sky-400 hover:text-gray-900"
                    >
                        Event
                    </button>
                    </Link>
                    <Link href={`/habits?id=${id}`}>
                    <button
                    
                        className="block px-4 pt-2 w-full  text-gray-800 hover:border-b-2 hover:border-sky-400 hover:text-gray-900"
                    >
                        Habits
                    </button>
                    </Link>
                </div>
            )}

        </div>
    );
};

export default CreateButton