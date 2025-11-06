import { Camera } from "lucide-react";
import Button from "##/ui/Button";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
      <Button
        color="primary"
        behavior="active"
        startIcon={<Camera />}
        text={"Hello"}
        circle
        wide
        endIcon={<Camera />}
      />
    </div>
  );
};

export default HomePage;
