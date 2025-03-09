"use client"

import { MockInterview } from '@/utils/schema';
import React, {useState, useEffect} from 'react'
import {db} from '@/utils/db';
import {eq} from 'drizzle-orm';
import Webcam from 'react-webcam';
import { WebcamIcon } from 'lucide-react';

function page({params}) {
    const [interviewData, setInterviewData] =  useState();

    useEffect(() => {
        console.log(params.interviewId);
        GetInterviewDetails();
    },[]);
    const GetInterviewDetails = async()=>{
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
        console.log(result);
        setInterviewData(result[0]);
    }
  return (
    // <div className='my-10 flex justify-center items-center flex-col'>
    //   <div>
    //   <WebcamIcon className='h-48 w-48 my-7 p-20 bg-secondary rounded-lg border'/>
    //   </div>
    // </div>
    <div>
    <div className="meeting-container">
        <div className="video-wrapper"> {/* Add wrapper for aspect ratio */}
            {/* <video ref={localVideoRef} autoPlay playsInline muted /> */}
        </div>
        <div className="video-wrapper"> {/* Add wrapper for aspect ratio */}
            {/* <img src="./avatar-meeting.png" alt="Avatar"/> */}
        </div>
    </div>

    <div className="controls">
        <button> <i className={`fa-solid ${isVideoOn ? "fa-video" : "fa-video-slash"}`}></i>{isVideoOn ? " Turn Off Video" : " Turn On Video"}</button>
        <button><i className={`fa-solid ${isAudioOn ? "fa-microphone" : "fa-microphone-slash"}`}></i>{isAudioOn ? " Mute Mic" : " Unmute Mic"}</button>
        {/* <button onClick={() => localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0].enabled}>Toggle Video</button>
        <button onClick={() => localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled}>Toggle Audio</button> */}
        <button><i className="fa-solid fa-closed-captioning"></i> Captions</button>
        <button><i className="fa-solid fa-circle"></i> Start Recording</button>
        <button><i className="fa-solid fa-stop"></i> Stop Recording</button>
        <button><i className="fa-solid fa-phone-slash"></i> End</button>
    </div>

    <div id="captionsContainer">{captions}</div>
    {/* You can pass lip sync data as props to your Avatar component if needed */}
    {/* <Avatar lipSyncData={...} /> */} 
</div>
  );
}

export default page
