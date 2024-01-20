import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import OfferedCourse from "../pages/Faculty/OfferedCourse";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Offer Course",
    path: "offer-course",
    element: <OfferedCourse />,
  },
];
