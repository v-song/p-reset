import React from 'react'

const Hero = () => {
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
            title: 'Future Goals',
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
            <div className=''>
                <h1 className='text-4xl font-bold p-2'>Welcome back, User !!!</h1>
                <p className='w-96'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>

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
