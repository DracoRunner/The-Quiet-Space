import AppFooter from "##/app-component/AppFooter";
import AppHeader from "##/app-component/AppHeader";
import "./main.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        {children}
        <AppFooter />
      </body>
    </html>
  );
};

export default RootLayout;
