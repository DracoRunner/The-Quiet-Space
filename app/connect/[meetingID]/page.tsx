import JitsiMeeting from "##/components/JitsiMeeting";

type Props = {
  params: {
    meetingID: string;
  };
};

export default function Page({ params }: Props) {
  const meetingId = params?.meetingID || "default-room";

  return (
    <main className="h-full w-full">
      <JitsiMeeting meetingId={meetingId} />
    </main>
  );
}
