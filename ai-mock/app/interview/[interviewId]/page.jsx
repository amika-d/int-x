"use client"
import Image from "next/image"
import { Mic, Info, Video, VideoOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState,useRef, useCallback  } from "react"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"
import Webcam from "react-webcam"


export default function Interview({params}) {
  const [interviewData, setInterviewData] = useState();
  const [isWebcamOn, setIsWebcamOn] = useState(true)
  const webcamRef = useRef(null)
  useEffect(() => {
    const fetchParams = async () => {
      const unwrappedParams = await params;
      console.log(unwrappedParams.interviewId);
      GetInterviewDetails(unwrappedParams.interviewId);
    };
    fetchParams();
  }, [params]);

  const toggleWebcam = useCallback(() => {
    setIsWebcamOn((prev) => !prev)
  }, [])

  const GetInterviewDetails = async (interviewId) => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
    setInterviewData(result[0]);
  };

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Image src="/logo-white.png" width={80} height={30} alt="logo" />
          <h1 className="text-lg font-medium">Mock Interview</h1>
        </div>
        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
          End interview
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Participant 1 - Coder's Gym Channel */}
          <div className="bg-[#1e1e1e] rounded-lg p-6 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-6">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="interviewer"
                  width={128}
                  height={128}
                  className="rounded-full"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-[#1e1e1e] p-1 rounded-full">
                <VideoOff size={20} className="text-gray-400" />
              </div>
            </div>
            <p className="text-center">Nadia</p>
          </div>

          {/* Participant 2 - user */}
          <div className="bg-[#1e1e1e] border-2 border-green-600 rounded-lg overflow-hidden flex flex-col">
            {isWebcamOn ? (
              /* Webcam view - fills the entire container */
              <div className="relative flex-1 w-full aspect-video">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  mirrored={true}
                  className="absolute inset-0 w-full h-full object-cover"
                  videoConstraints={{
                    facingMode: "user",
                  }}
                />
                <div
                  className="absolute bottom-4 right-4 bg-[#1e1e1e] p-1 rounded-full cursor-pointer z-10"
                  onClick={toggleWebcam}
                >
                  <Video size={20} className="text-green-600" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-center text-white">Amma</p>
                </div>
              </div>
            ) : (
              /* Profile view - shows circular avatar */
              <div className="p-6 flex flex-col items-center">
                <div className="relative w-32 h-32 mb-6">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <Image src="/user.png" alt="Thasara" width={128} height={128} className="rounded-full" />
                  </div>
                  <div
                    className="absolute bottom-0 right-0 bg-[#1e1e1e] p-1 rounded-full cursor-pointer"
                    onClick={toggleWebcam}
                  >
                    <VideoOff size={20} className="text-gray-400" />
                  </div>
                </div>
                <p className="text-center">Amma</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-between items-center p-4 border-t border-gray-800">
        <div className="text-lg font-mono">24:36</div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-green-600 hover:bg-green-700 border-none h-12 w-12"
        >
          <Mic className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400">
          <Info className="h-6 w-6" />
        </Button>
      </footer>
    </div>
  )
}

