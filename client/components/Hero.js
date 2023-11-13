import React, { useEffect, useState } from "react";

const Hero = () => {

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

    
    const insights = [
        {
            title: 'Accomplishments',
            items: [
                'Completed project X ahead of schedule',
                'Received recognition for outstanding work on project Y',
                'Increased sales by 20% in Q1',
            ],
        },
        {
            title: 'Future Tasks',
            items: [
                'Launch new product by end of year',
                'Expand into new markets',
                'Improve customer satisfaction ratings',
            ],
        },
        {
            title: 'Reminder',
            items: [
                'Submit weekly report by Friday at 5pm',
                'Schedule meeting with team to discuss project Z',
                'Complete training course on new software by end of month',
            ],
        },
    ];

    return (
        <div className='p-5 bg-green-300 flex justify-evenly'> 
            
            {isAuthenticated ? (
                    <div className=''>
                        <h1 className='text-left text-4xl font-bold p-2'>Welcome back, {userInfo.given_name} !!!</h1>
                        <div className="flex gap-2">
                        <p className='w-96 '> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <img className= "w-32 h-32 object-cover rounded-full border-2 border-gray-300" src={userInfo.picture} alt="User profile"/>
                        </div>
                    </div>
                ) : (null)}

            <div className=''>
                <h1 className='text-xl font-bold'>Your Insights</h1>
                {insights.map((insight) => (
                    <div key={insight.title}>
                        <h2 className='text-lg font-bold text-slate-700'>{insight.title}</h2>
                        <ul>
                            {insight.items.map((item) => (
                                <li key={item}>- {item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Hero
