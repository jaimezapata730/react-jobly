import React from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../auth/UserContext';

import './homePage.css'

const HomePage = () => {
    const { currentUser } = React.useContext(AuthContext);

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Jobly</h1>
                <p className="lead">All the jobs in one, convenient place.</p>
                {currentUser
                    ? <h2>
                      Welcome Back, {currentUser.firstName || currentUser.username}!
                    </h2>
                    : (
                        <p>
                          <Link className="btn btn-primary font-weight-bold mr-3"
                                to="/login">
                            Log in
                          </Link>
                          <Link className="btn btn-primary font-weight-bold"
                                to="/signup">
                            Sign up
                          </Link>
                        </p>
                    )}
            </div>
        </div>
    )
}

export default HomePage
