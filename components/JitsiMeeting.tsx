"use client";

import { JitsiMeeting as ReactJitsiMeeting } from "@jitsi/react-sdk";
import type React from "react";

type Props = {
  meetingId: string;
  displayName?: string;
};

const JitsiMeeting: React.FC<Props> = ({ meetingId, displayName }) => {
  const handleJitsiIFrame = (iframeRef: HTMLDivElement) => {
    iframeRef.style.padding = "5px";
    iframeRef.style.height = "100vh";
    iframeRef.style.width = "100vw";
  };

  return (
    <ReactJitsiMeeting
      roomName={meetingId}
      configOverwrite={{
        startWithAudioMuted: true,
        startWithVideoMuted: true,
      }}
      interfaceConfigOverwrite={{ SHOW_JITSI_WATERMARK: false }}
      userInfo={{ displayName: displayName ?? "", email: "" }}
      getIFrameRef={handleJitsiIFrame}
    />
  );
};

export default JitsiMeeting;
