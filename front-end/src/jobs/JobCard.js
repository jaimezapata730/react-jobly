import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "../api/api";
import AuthContext from "../auth/UserContext";
import './jobCard.css'

const JobCard = ({ job, id, title, salary, companyName, companyHandle, isCompanyPage }) => {

    const jobInfo = job || { id, title, salary, companyName, companyHandle };
    const [applied, setApplied] = useState(false);

    const {currentUser } = useContext(AuthContext)

    const handleApply = async () => {
        try {
            await JoblyApi.applyForJob(currentUser.username, jobInfo.id);
            setApplied(true);
        } catch (error) {
            console.error('Error applying for the job:', error);
        }
    };

    useEffect(() => {
        const checkIfApplied = async () => {
          try {
            const appliedJobs = currentUser?.applications || [];
            const isApplied = appliedJobs.includes(jobInfo.id);
      
            setApplied(isApplied);
          } catch (error) {
            console.error("Error checking if job is applied:", error);
          }
        };
      
        checkIfApplied();
      }, [currentUser, jobInfo.id]);

    return (
        <div className="JobCard card"> 
            <div className="card-body">
                <h6 className="card-title">{ jobInfo.title }</h6>
                <p>Salary: {jobInfo.salary}</p>

                {!isCompanyPage ? (
                    <>
                    <Link to={`/companies/${jobInfo.companyHandle}`}>
                      <p>Company: {jobInfo.companyName}</p>
                    </Link>
                    </>
                    ) : null}
                    {applied ? (
                        <button disabled>Applied</button>
                      ) : (
                        <button onClick={handleApply}>Apply</button>
                    )}
            </div>
        </div>
    );
}

export default JobCard
