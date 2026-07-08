import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userService";
import "../styles/Profile.css";

export default function Profile() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");

    const [email] = useState(user?.email || "");

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSave(e){

        e.preventDefault();

        setLoading(true);

        try{

            const updated =
                await userService.updateProfile(user.id,{name});

            const stored =
                JSON.parse(localStorage.getItem("lms_user"));

            localStorage.setItem(
                "lms_user",
                JSON.stringify({
                    ...stored,
                    name:updated.name
                })
            );

            setMessage("✅ Profile Updated Successfully!");

        }

        catch(err){

            setMessage(err.message);

        }

        finally{

            setLoading(false);

            setTimeout(()=>setMessage(""),2500);

        }

    }

    function handleLogout(){

        logout();

        navigate("/");

    }

    return(

        <div className="profile-page">

            {/*================ HERO =================*/}

            <section className="profile-hero">

                <div className="profile-avatar">

                    {user?.name?.charAt(0).toUpperCase()}

                </div>

                <div className="profile-info">

                    <span className="profile-tag">

                        👋 Welcome Back

                    </span>

                    <h1>

                        {user?.name}

                    </h1>

                    <p>

                        {user?.role} • MyLMS Member

                    </p>

                </div>

            </section>

            {/*================ STATS =================*/}

            <section className="profile-stats">

                <div className="stat-box">

                    <h2>12</h2>

                    <p>Courses Joined</p>

                </div>

                <div className="stat-box">

                    <h2>8</h2>

                    <p>Completed</p>

                </div>

                <div className="stat-box">

                    <h2>98%</h2>

                    <p>Progress</p>

                </div>

                <div className="stat-box">

                    <h2>5⭐</h2>

                    <p>Rating</p>

                </div>

            </section>
                        {/*================ PROFILE FORM =================*/}

            <section className="profile-container">

                <div className="profile-card">

                    <h2>Account Information</h2>

                    <p className="profile-subtitle">
                        Update your personal information below.
                    </p>

                    {message && (
                        <div className="profile-message">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSave}>

                        <div className="input-group">

                            <label>Full Name</label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                placeholder="Enter your name"
                            />

                        </div>

                        <div className="input-group">

                            <label>Email Address</label>

                            <input
                                type="email"
                                value={email}
                                readOnly
                            />

                        </div>

                        <div className="input-group">

                            <label>Role</label>

                            <input
                                type="text"
                                value={user?.role}
                                readOnly
                            />

                        </div>

                        <div className="button-group">

                            <button
                                type="submit"
                                className="save-btn"
                                disabled={loading}
                            >

                                {loading
                                    ? "Saving..."
                                    : "💾 Save Changes"}

                            </button>

                            <button
                                type="button"
                                className="logout-btn"
                                onClick={handleLogout}
                            >

                                🚪 Logout

                            </button>

                        </div>

                    </form>

                </div>

                {/*================ ACCOUNT SUMMARY =================*/}

                <div className="profile-side-card">

                    <h3>Account Summary</h3>

                    <div className="summary-item">
                        <span>👤</span>
                        <div>
                            <strong>Name</strong>
                            <p>{user?.name}</p>
                        </div>
                    </div>

                    <div className="summary-item">
                        <span>📧</span>
                        <div>
                            <strong>Email</strong>
                            <p>{user?.email}</p>
                        </div>
                    </div>

                    <div className="summary-item">
                        <span>🎓</span>
                        <div>
                            <strong>Role</strong>
                            <p>{user?.role}</p>
                        </div>
                    </div>

                    <div className="summary-item">
                        <span>🏆</span>
                        <div>
                            <strong>Status</strong>
                            <p>Active Member</p>
                        </div>
                    </div>

                </div>

            </section>

        </div>

    );

}