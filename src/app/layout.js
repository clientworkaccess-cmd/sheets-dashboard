import { DashboardProvider } from "../context/DashboardContext";
import "./globals.css";

export const metadata = {
  title: "Rethink Self Storage Fund | Dashboard",
  description:
    "End-of-month performance dashboard for Rethink Self Storage Fund - view revenue, occupancy, NOI metrics, and operational insights across Charlotte and Houston markets.",
  keywords: [
    "self storage",
    "investment dashboard",
    "real estate",
    "fund performance",
    "dashboard",
  ],
  authors: [{ name: "Rethink Asset Management" }],
  openGraph: {
    title: "Rethink Self Storage Fund | Dashboard",
    description:
      "End-of-month performance dashboard for Rethink Self Storage Fund",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a1628" />
      </head>
      <body>
        <DashboardProvider>{children}</DashboardProvider>
      </body>
    </html>
  );
}
