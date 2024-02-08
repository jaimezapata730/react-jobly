import React from "react";
import {Routes, Route} from "react-router-dom";
import CompanyDetail from "../companies/CompanyDetail";
import CompanyPage from "../companies/CompanyPage";
import JobList from "../jobs/JobList"
import SignUpForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../auth/ProfileForm";
import Homepage from "../homePage/HomePage";
import PrivateRoute from "./PrivateRoute";

const MyRoutes = ({login, signup, update})=> {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/companies/*" element={<PrivateRoute element={<CompanyDetail />} />} />
                <Route path="/companies/:handle" element={<PrivateRoute element={<CompanyPage />} />} />
                <Route path="/jobs/*" element={<PrivateRoute element={<JobList />} />} />
                <Route path="/login" element={<LoginForm login={login} />} />
                <Route path="/signup" element={<SignUpForm signup={signup} />} />
                <Route path="/profile" element={<PrivateRoute element={<ProfileForm update={update}/>} />} />
            </Routes>
        </div>
    )
}

export default MyRoutes;