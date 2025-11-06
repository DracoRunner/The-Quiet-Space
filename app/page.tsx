import { Camera } from "lucide-react";
import Avatar from "##/ui/Avatar";
import Button from "##/ui/Button";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
      <Button color="primary" behavior="active" text={"Hello"} circle wide />
      <Avatar placeHolder="AB" className="bg-neutral w-24 rounded-full" />
      <Avatar
        placeHolder="AB"
        icon={<Camera />}
        className="bg-neutral w-24 rounded-full"
      />
      <Avatar
        placeHolder="AB"
        image="/file.svg"
        priority
        className="bg-neutral w-24 rounded-full"
      />
    </div>
  );
};

export default HomePage;
