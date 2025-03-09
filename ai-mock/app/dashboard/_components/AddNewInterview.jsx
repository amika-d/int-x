"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { NextResponse } from "next/server";
import { MockInterview } from "@/utils/schema";

import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment";
const { v4: uuidv4 } = require("uuid");

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState("");
  
  const { user } = useUser();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Job Role:", jobRole, "Job Desc:", jobDesc);
    const InputPrompt = `You are a professional interviewer conducting a job interview. 
    Greet the candidate warmly and begin the conversation. Start by introducing yourself 
    and maintain a professional yet friendly tone throughout the session. And ask user can we start  the conversation.
    And ask 1 question on   this topic ${jobDesc} . Only  after the user  input`;
    let result = await chatSession.sendMessage(InputPrompt);

    console.log("Initail Response: ", result.response.text());
    let continueConversation = true;
    let conversationHistory = [];
    let chatResponse = result.response.text();

    while (continueConversation) {
      let userInput = prompt("Enter your response: ");
      if (userInput === null || userInput.toLowerCase === "exit") {
        console.log("Conversation Ended");
        console.log(
          "Conversation Summary:",
          JSON.stringify(conversationHistory, null, 2)
        );
        console.log(conversationHistory);

        continueConversation = false;
        break;
      } else {
        try {
          result = await chatSession.sendMessage(userInput);

          chatResponse = result.response
            .text()
            .replace(/\n/g, " ")
            .replace(/\*\*/g, "");
          console.log("Chat Response:", chatResponse);

          let jsonResponse = JSON.parse(chatResponse);
          let jsonUserInput = JSON.stringify(userInput);
          conversationEntry = {
            id: conversationHistory.length,
            question: jsonResponse,
            answer: jsonUserInput,
          };
          conversationHistory.push(conversationEntry);
          console.log("Updated Conversation History:", conversationHistory);
          setLoading(false);
        } catch (error) {
          console.error("Error during conversation:", error);
        }
      }
    }
    setJsonResponse(conversationHistory);
    if (conversationHistory) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: conversationHistory,
          jobRole: jobRole,
          jobDesc: jobDesc,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().toDate(),
        })
        .returning({ mockID: MockInterview.mockId });

      console.log("Inserted ID:", resp);
    } else {
      console.log("ERROR");
    }
    if (resp) {
      setOpenDialog(false);
      router.push("../../interview"+resp[0]?.mockId);
      
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <div>
          <h2 className="text-lg">+ Add New</h2>
        </div>
      </div>

      {/* Dialog component */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about the area you’d like to focus on
            </DialogTitle>
            <DialogDescription>
              <div>
                <form onSubmit={onSubmit}>
                  <div>
                    <h2>Add details about the job role and your skills</h2>
                    <div className="mt-7 my-3">
                      <label> Job Role </label>
                      <Input
                        placeholder="Ex. Project Management"
                        required
                        value={jobRole}
                        onChange={(event) => setJobRole(event.target.value)}
                      />
                    </div>
                    <div className="mt-7 my-3">
                      <label> Job Description/ Tech Stack (In Short) </label>
                      <Textarea
                        placeholder="Ex. React, Angular, NodeJs, MySql etc"
                        value={jobDesc}
                        onChange={(event) => setJobDesc(event.target.value)}
                      />
                    </div>
                    <div className="flex gap-5 justify-end">
                      <Button
                        variant="ghost"
                        onClick={() => setOpenDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <LoaderCircle className="animate-spin" />
                            "Generating from AI"
                          </>
                        ) : (
                          "Start Interview"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
