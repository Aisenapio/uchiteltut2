import { BrowserRouter, Routes, Route } from "react-router";

import PublicLayout from "@/pages/public/layout";
import HomePage from "@/pages/public/Home";
import JobDetailPage from "@/pages/public/JobDetail";

import LoginPage from "@/pages/auth/login";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import RegisterPage from "@/pages/auth/register";

import UnauthorizedErrorPage from "@/pages/errors/401";
import ForbiddenErrorPage from "@/pages/errors/403";
import NotFoundErrorPage from "@/pages/errors/404";
import MaintenanceErrorPage from "@/pages/errors/503";

import DashboardLayout from "@/pages/main/layout";

import SchoolDashboardLayout from "@/pages/main/school/layout";
import MyVacancies from "@/pages/main/school/MyVacancies";
import EditVacancy from "@/pages/main/school/EditVacancy";
import FindTeachers from "@/pages/main/school/FindTeachers";
import SchoolProfile from "@/pages/main/school/Profile";

import TeacherDashboardLayout from "@/pages/main/teacher/layout";
import TeacherProfile from "@/pages/main/teacher/Profile";
import JobSearch from "@/pages/main/teacher/JobSearch";
import MyResponses from "@/pages/main/teacher/MyResponses";


import RootLayout from "./layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/job/:id" element={<JobDetailPage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Dashboard Routes */}
        <Route path="dashboard" element={<RootLayout />}>
          <Route path="" element={<DashboardLayout />}>

            {/* School Routes */}
            <Route path="school" element={<SchoolDashboardLayout />}>
              <Route index element={<MyVacancies />} />
              <Route path="vacancies/new" element={<EditVacancy />} />
              <Route path="vacancies/:id" element={<EditVacancy />} />
              <Route path="teachers" element={<FindTeachers />} />
              <Route path="profile" element={<SchoolProfile />} />
            </Route>

            {/* Teacher Routes */}
            <Route path="teacher" element={<TeacherDashboardLayout />}>
              <Route path="profile" element={<TeacherProfile />} />
              <Route path="search" element={<JobSearch />} />
              <Route path="responses" element={<MyResponses />} />
            </Route>
          </Route>
        </Route>

        {/* Error Routes */}
        <Route path="401" element={<UnauthorizedErrorPage />} />
        <Route path="403" element={<ForbiddenErrorPage />} />
        <Route path="404" element={<NotFoundErrorPage />} />
        <Route path="503" element={<MaintenanceErrorPage />} />
        <Route path="*" element={<NotFoundErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

