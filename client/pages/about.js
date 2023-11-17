// Import necessary components
import Navbar from '@/components/Navbar'
import React from 'react'

// Define the About component
const About = () => {
    return (
        <div className="bg-gray-100">
            {/* Navbar component */}
            <Navbar/>

            {/* Introduction section */}
            <section className="mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            About p-reset
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            This project will create a fully functional self care web application with AI-based recommendations for personal wellness, incorporating features such as break reminders, habit and mood tracking, journaling, and calendar integration. Combining both software engineering and traditional data science elements, we will also implement smart scheduling of wellness activities, use NLP techniques to analyze journal entries, and develop personalized visualizations from user data. The aim is to have an assistant that learns from a user’s past activity to make smart recommendations and optimize time management to include self care tasks.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features section */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Features
                        </h2>
                        <ul className="mt-10 text-lg text-gray-500">
                            <li className="mt-3">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="ml-3">
                                        AI-based recommendations for personal wellness
                                    </span>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="ml-3">
                                        Break reminders
                                    </span>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="ml-3">
                                        Habit and mood tracking
                                    </span>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="ml-3">
                                        Journaling
                                    </span>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="ml-3">
                                        Calendar integration
                                    </span>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="ml-3">
                                        Smart scheduling of wellness activities
                                    </span>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="ml-3">
                                        NLP techniques to analyze journal entries
                                    </span>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="ml-3">
                                        Personalized visualizations from user data
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Technology section */}
            <section className="bg-gray-100">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Technology
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            The p-reset application is a unique blend of software engineering and traditional data science methodologies, designed to deliver a personalized self-care experience. It leverages a variety of cutting-edge technologies to provide intelligent recommendations and perform comprehensive user data analysis. The p-reset application utilizes a full-stack development approach, combining both frontend and backend technologies. The frontend is built with Next.js, a React framework, and styled with Tailwind CSS for a modern and professional user interface. The backend is developed using Python and Flask, with SQLAlchemy serving as the interface for the PostgreSQL database. The p-reset application is a sophisticated blend of modern web development and data science technologies, all working in harmony to create a personalized and engaging self-care experience for users.

                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
