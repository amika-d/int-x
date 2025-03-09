"use client"
import Image from "next/image"
import { Mic, Info, Video, VideoOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useEffect } from "react"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"

export default function Interview({params}) {
  useEffect(()=>{
    console.log(params)
    GetInterviewDetails
  },[])

  const GetInterviewDetails = async()=>{
    const result= await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId,params.interviewId))
    console.log(result)
  }


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
                  alt="Coder's Gym Channel"
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
          <div className="bg-[#1e1e1e] border-2 border-green-600 rounded-lg p-6 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-6">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="user"
                  width={128}
                  height={128}
                  className="rounded-full"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-[#1e1e1e] p-1 rounded-full">
                <Video size={20} className="text-green-600" />
              </div>
            </div>
            <p className="text-center">Thasara</p>
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

