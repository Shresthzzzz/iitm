import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BackgroundVideo from "./BackgroundVideo";
import ShowcaseModal from "./ShowcaseModal";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "n" && e.ctrlKey) {
        e.preventDefault();
        navigate("/create");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  const getPageInfo = () => {
    if (location.pathname === "/") {
      return {
        title: "Dashboard",
        subtitle: "Manage your college events in one place.",
      };
    }

    if (location.pathname === "/events") {
      return {
        title: "Events",
        subtitle: "View and manage all your college events.",
      };
    }

    if (location.pathname === "/create") {
      return {
        title: "Create Event",
        subtitle: "Create a new event and announce it to Discord.",
      };
    }

    if (location.pathname.startsWith("/events/")) {
      return {
        title: "Event Details",
        subtitle: "View and manage event information.",
      };
    }

    if (location.pathname === "/settings") {
      return {
        title: "Settings",
        subtitle: "",
      };
    }

    return {
      title: "College Event Manager",
      subtitle: "",
    };
  };

  const page = getPageInfo();

  return (
    <div className="app">
      <BackgroundVideo />

      <Sidebar />

      <div className="main-area">
        <Header title={page.title} subtitle={page.subtitle} />

        <main className="page-content">
          <Outlet />
        </main>
      </div>

      <ShowcaseModal />
    </div>
  );
}

export default Layout;