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
                className="bg-[#659FAC] text-[#FFF6E9] flex items-center w-70 px-5 h-12 rounded-2xl gap-2 text-[20px] font-medium hover:border-b-2 hover:border-b-cyan-900 hover:text-cyan-900"
                onClick={() => setIsOpen(!isOpen)}
            >
                <BsCalendarPlus className="inline-block mr-2" />
                Explore
                <MdOutlineArrowDropDown className="inline-block text-2xl" />
            </button>

            {isOpen && (
                <div className="absolute z-10 ml-2 w-40 bg-sky-100 shadow-xl">
                    <Link href={`/journals?id=${id}`}>
                    <button
                        className="block py-1 w-full text-cyan-800 hover:border-b-2 hover:border-sky-400 hover:text-gray-900 hover:bg-[#A7C7D2]"
                    >
                        Journal
                    </button>
                    </Link>
                    <Link href="/calender">
                    <button
                    
                        className="block py-1 w-full text-cyan-800 hover:border-b-2 hover:border-sky-400 hover:text-gray-900 hover:bg-[#A7C7D2]"
                    >
                        Event
                    </button>
                    </Link>
                    <Link href={`/habits?id=${id}`}>
                    <button
                    
                        className="block py-1 w-full text-cyan-800 hover:border-b-2 hover:border-sky-400 hover:text-gray-900 hover:bg-[#A7C7D2]"
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
