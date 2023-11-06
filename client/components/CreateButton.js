import React from 'react'
import { useState } from "react";
import AddCalender from './AddCalender';
import Journal from './Journal';
import {BsCalendarPlus} from 'react-icons/bs'
import {MdOutlineArrowDropDown} from 'react-icons/md'


const CreateButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div>
            <button
                className="ml-4 px-4 py-2 text-center rounded-2xl border bg-gradient-to-r from-yellow-500 via-green-600 to-blue-500 text-white hover:scale-105 transform transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-stone-400"
                onClick={() => setIsOpen(!isOpen)}
            >
                <BsCalendarPlus className="inline-block mr-2" />
                Create
                <MdOutlineArrowDropDown className="inline-block ml-2 text-2xl" />
            </button>

            {isOpen && (
                <div className="absolute z-10 ml-5 w-32 bg-white shadow-xl">
                    <button
                        className="block px-4 pt-2 w-full  text-gray-800 hover:border-b-2 hover:border-sky-400 hover:text-gray-900"
                        onClick={() => handleOptionClick("Journal")}
                    >
                        Journal
                    </button>
                    <button
                        className="block px-4 pt-2 w-full  text-gray-800 hover:border-b-2 hover:border-sky-400 hover:text-gray-900"
                        onClick={() => handleOptionClick("Event")}
                    >
                        Event
                    </button>
                </div>
            )}

            {selectedOption === "Journal" ? (
                <Journal Open={() => setSelectedOption(null)} />
            ) : selectedOption === "Event" ? (
                <AddCalender Open={() => setSelectedOption(null)} />
            ) : null}
        </div>
    );
};

export default CreateButton
