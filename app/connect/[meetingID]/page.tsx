"use client";

import { JitsiMeeting } from "@jitsi/react-sdk";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MeetingPage() {
  const params = useParams();
  const router = useRouter();
  const meetingId = params.meetingID as string;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!meetingId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#2C3531]">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Invalid Meeting ID</h1>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-[#B48B7F] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#2C3531]">
      {isReady && (
        <JitsiMeeting
          domain="meet.jit.si"
          roomName={`Groom_${meetingId}`}
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: false,
            enableEmailInStats: false,
            prejoinPageEnabled: false, // Disable prejoin page to skip lobby
            requireDisplayName: false,
            // Disable lobby entirely
            enableLobbyChat: false,
            hideConferenceSubject: false,
            subject: "Groom Session",
            disableProfile: true,
            hideParticipantsStats: true,
            startSilent: false,
            // Additional settings to bypass authentication
            enableInsecureRoomNameWarning: false,
            enableWelcomePage: false,
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            HIDE_INVITE_MORE_HEADER: true,
            TOOLBAR_ALWAYS_VISIBLE: false,
          }}
          userInfo={{
            displayName: "Participant",
            email: "",
          }}
          // Add JWT to bypass lobby (empty string means no auth required)
          jwt=""
          onApiReady={(externalApi) => {
            console.log("Jitsi Meet API ready", externalApi);

            // Handle meeting end - redirect users to home, admins stay
            externalApi.addEventListener("readyToClose", () => {
              // Check if user is admin by checking if they're on admin domain
              const isAdmin = window.location.pathname.includes("/admin");

              if (!isAdmin) {
                // Regular user - redirect to home
                router.push("/");
              }
              // Admin - do nothing, let them close the tab manually
            });

            // Also handle video conference left event
            externalApi.addEventListener("videoConferenceLeft", () => {
              const isAdmin = window.location.pathname.includes("/admin");

              if (!isAdmin) {
                router.push("/");
              }
            });
          }}
          getIFrameRef={(iframeRef) => {
            if (iframeRef) {
              iframeRef.style.height = "100vh";
              iframeRef.style.width = "100vw";
            }
          }}
        />
      )}
    </div>
  );
}
