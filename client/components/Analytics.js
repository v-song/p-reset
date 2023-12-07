import React from 'react'
import { LoadingPage } from './Loading'
import topic_model from "../public/topic_model.png"

const Analytics = ({journals, emotions, emotionalState}) => {
    if(!journals || !emotions || !emotionalState) return <LoadingPage />;

    const sentimentMessages = {
        angry: [
          "It seems like you've been expressing some frustration or anger. We're here to help resolve any issues you might be facing.",
          "Take a deep breath. If there's a specific problem, let us know so we can assist you in finding a solution.",
          "It's okay to feel angry. Consider expressing your feelings in a constructive way or taking a short break to cool off.",
        ],
        sad: [
          "We've noticed a somewhat somber or disappointed tone. If there's anything on your mind, feel free to share, and we're here to support you.",
          "Feeling down is normal. Reach out to friends or loved ones for support, and remember that we're here for you.",
          "If there's a specific reason for your sadness, sharing it can sometimes lighten the load. We're here to listen.",
        ],
        happy: [
          "Your recent interactions reflect a positive and happy sentiment! We're delighted to have you here.",
          "Great to hear you're feeling positive! Keep up the good vibes. If there's anything you'd like to share or discuss, we're here to listen.",
          "Happiness is contagious! Spread the joy around and let us know if there's anything we can do to make your experience even better.",
        ],
        excited: [
          "Excitement is in the air! Your recent sentiments convey high energy and enthusiasm. What's making you so excited? We'd love to know!",
          "Capture that energy and use it to fuel your creativity. We're here to support your exciting journey!",
          "Share your enthusiasm with those around you. Your excitement can be a source of motivation for others.",
        ],
      };
      
      const sentimentRecommendations = {
        angry: [
          "Consider taking a break and coming back to the task with a fresh perspective. If there's a specific issue, let us know so we can assist you.",
          "Reflect on the source of your anger. Is there a solution or a way to address the issue? We're here to help.",
          "Practice self-care. Engage in activities that help you relax and release tension.",
        ],
        sad: [
          "It's okay to feel down sometimes. Reach out to friends or loved ones for support. If there's anything we can do to help, please don't hesitate to ask.",
          "Expressing your emotions can be therapeutic. Consider journaling or talking to someone you trust about what you're feeling.",
          "Take some time for self-care. Engage in activities that bring you comfort and joy.",
        ],
        happy: [
          "Keep spreading positivity! Your happiness contributes to a positive atmosphere. If there's anything we can do to enhance your experience, let us know.",
          "Celebrate your wins, big or small. We're here to share in your joy!",
          "Consider sharing your positive vibes with others. Your happiness can be inspiring to those around you.",
        ],
        excited: [
          "Channel that excitement into something productive! If there's a project or idea you're passionate about, now might be the perfect time to dive in.",
          "Capture that energy and use it to accomplish your goals. We're here to support you every step of the way.",
          "Share your excitement with those around you. Your enthusiasm can be contagious!",
        ],
      };
      
      const getRandomMessage = (array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
      };
    
  return (
    <div>
            <div className='text-[#4E3506]'>

Hey, I noticed you have a lot going on over the next few days. Remember to take some time for yourself as well. 🤗

It's great you blocked off dedicated time for job searching 💼 and cooking healthy meals. 🥗 Make sure to build in small breaks during those long blocks to stretch, hydrate, and re-energize. 🧘‍♀️💧

The cleaning session also looks lengthy - consider putting on some favorite music 🎧 or podcast to make it more enjoyable. And try to finish up in time to relax 🛀 before your Friday morning work shift. ⏰

In terms of the calendar, I know presentations 💻 can be stressful. Make a plan to practice speaking out loud a few times to boost your confidence. 💪 And celebrate small accomplishments like completing gardening 🧑‍🌾 or swimming 🏊.

Most importantly, reach out for help 🆘 managing everything on your plate. Taking care of your mental health 🧠 is just as critical right now. Together we can problem solve and adjust your commitments, so they feel doable. 💆‍♀️ This too shall pass! 💜
    </div>

         <div className='text-[#4E3506] text-lg'>
            <h2 className='font-bold text-xl mt-2'>Journal Analysis</h2>
        Your recent entries have been <b>{emotionalState}!</b> <span/>
        {emotionalState && getRandomMessage(sentimentMessages[emotionalState])} <span/>
        {emotionalState && getRandomMessage(sentimentRecommendations[emotionalState])}
        </div>
        <br/>
        <div className='flex gap-1'>
      {emotions && <img src={`data:image/png;base64,${emotions[3]}`} alt="Emotion Pie" className='w-56 h-48'/>}
    {emotions && <img src={`data:image/png;base64,${emotions[1]}`} alt="Emotion Line" className='w-72 h-48'/>}
    

    </div>
    <br/>
    <div className='flex gap-3'>
    <p className='text-lg text-[#4E3506] '>Here are your most used words found within your journal entries. Looks like the top two are currently <b>work</b> and <b>day</b>.</p>
    <img src={topic_model.src} alt="Topic Model" className='w-96 h-72 rounded-md'/>
    </div>
       
    </div>
  )
}

export default Analytics
