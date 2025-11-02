import ConfessionDB from "##/DataBase/ConfessionDB";
import ScrollAnimation from "../common/ScrollAnimation";
import ConfessionCard from "./ConfessionCard";

export const revalidate = 60;

const ConfessionList = async () => {
  const confessions = await ConfessionDB.getAllConfessions();

  if (confessions.length === 0) {
    return (
      <ScrollAnimation className="col-span-1 lg:col-span-3">
        <div className="text-center mt-12 p-8 bg-white rounded-xl text-gray-500">
          Be the first to share! This corner is currently empty.
        </div>
      </ScrollAnimation>
    );
  }

  return (
    <>
      {confessions.map((c, index) => (
        <ScrollAnimation key={c.id} delay={(index % 3) * 100}>
          <ConfessionCard {...c} />
        </ScrollAnimation>
      ))}
    </>
  );
};

export default ConfessionList;
