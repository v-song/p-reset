import React from 'react'

const Insights = () => {
    return (
        <div className='flex-col justify-center relative text-[#4E3506] h-full'>
            <div className='bg-[#A48888] rounded-t-[20px] px-6 py-4 pb-12 text-white text-[22px]'>Your Insights</div>
            <div className='bg-[#CFBDAC] rounded-t-[20px] px-6 py-4 -mt-9 pb-10'>
                <p>Accomplishments</p>
                <div className='m-3'>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </div>
            </div>
            <div className='bg-[#EADFD0] rounded-t-[20px] px-6 py-4 -mt-9 pb-10'>
                <p>Reminders</p>
                <div className='m-3'>
                    <li>Drink water</li>
                    <li>Sleep early</li>
                    <li>Stay happy</li>
                </div>
            </div>
            <div className='bg-[#FFF6E9] rounded-[20px] px-6 py-4 -mt-9 '>
                <p>Future Tasks</p>
                <div className='m-3'>
                    <li>P-ai presentation</li>
                    <li>Final exams</li>
                    <li>Final projects</li>
                </div>
            </div>

        </div>
    );
};

export default Insights
