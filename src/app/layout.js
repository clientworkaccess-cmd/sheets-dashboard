import { DashboardProvider } from "@/context/DashboardContext";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </body>
    </html>
  );
}
