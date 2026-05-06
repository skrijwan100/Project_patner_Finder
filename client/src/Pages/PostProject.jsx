import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { handleError } from '../Components/ErrorMessage';
import { Users, Check, X, User, Clock, FolderGit2, Activity, Github, ArrowLeft, Trash2 } from 'lucide-react';
import "../styles/hackthonpost.css"
// --- NORMAL CSS ---
const customStyles = `
.btn-reject,
  .btn-delete-post {
      background: transparent;
      color: var(--danger);
      border: 1px solid var(--danger-bg);
  }
        .btn-delete-post {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
  }

  .btn-delete-post:hover {
      background: var(--danger);
      color: #fff;
      border-color: var(--danger);
  }
`;

// --- SKELETON COMPONENT ---
const SkeletonPost = () => (
    <div className="post-card">
        <div className="post-card-header">
            <div className="post-header-top">
                <div className="skeleton sk-title"></div>
                <div className="skeleton sk-tag" style={{ width: '100px', height: '36px' }}></div>
            </div>
            <div className="skeleton sk-meta"></div>
            <div className="skills-container">
                <div className="skeleton sk-tag"></div>
                <div className="skeleton sk-tag"></div>
                <div className="skeleton sk-tag"></div>
            </div>
        </div>
        <div className="applicants-section">
            <div className="skeleton sk-meta" style={{ width: '150px', marginBottom: '16px' }}></div>
            <div className="skeleton sk-row"></div>
            <div className="skeleton sk-row"></div>
        </div>
    </div>
);

export default function PostProject() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const token = await user?.getIdToken();
                const localtoken = secureLocalStorage.getItem('auth-token');

                if (!token && !localtoken) {
                    handleError('Login First');
                    return navigate('/login');
                }

                let headers = { "Content-Type": "application/json" };
                if (localtoken) {
                    headers["auth-token"] = localtoken;
                } else if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/user-project-posts-with-applicants`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: headers,
                });

                const data = await response.json();
                if (data.success) {
                    setPosts(data.data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                handleError('Internal server error, try again');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [user, navigate]);

    // --- Handlers for Actions ---
    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    const handleDeletePost = async (postId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this project post? This action cannot be undone.");

        if (isConfirmed) {
            console.log("Deleting post ID:", postId);
            // TODO: Add backend API call to delete the post from database
            /*
            try {
              const response = await fetch(`BACKEND_URL/${postId}`, { method: 'DELETE', headers: ... });
              if(response.ok) { ... }
            } catch(error) { ... }
            */

            // Optimistic UI update: Remove the post from the screen immediately
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        }
    };

    const handleViewProfile = (applicantId) => {
        console.log("Navigating to profile:", applicantId);
        navigate(`/profile/${applicantId}`);
    };

    const handleAccept = async (applicationId, postId) => {
        console.log("Accepting application:", applicationId);
        // TODO: Add backend API call to update status to "accepted"
    };

    const handleReject = async (applicationId, postId) => {
        console.log("Rejecting application:", applicationId);
        // TODO: Add backend API call to update status to "rejected"
    };

    return (
        <>
            <style>{customStyles}</style>
            <div className="manager-container">

                <div className="header-section">
                    {/* Back Button Added Here */}
                    <div className="back-nav">
                        <button className="btn-back" onClick={handleGoBack}>
                            <ArrowLeft size={18} /> Back
                        </button>
                    </div>

                    <h1 className="header-title">Manage <span>Project Team</span></h1>
                    <p className="header-subtitle">Review and manage developers applying to your project requirements.</p>
                </div>

                <div className="posts-list">
                    {loading ? (
                        // Show Skeletons
                        <>
                            <SkeletonPost />
                            <SkeletonPost />
                        </>
                    ) : posts.length > 0 ? (
                        // Render Actual Posts
                        posts.map((post) => (
                            <div key={post._id} className="post-card">

                                {/* Post Details Header */}
                                <div className="post-card-header">
                                    <div className="post-info">
                                        <div className="post-header-top" style={{display:"flex", justifyContent:"space-between"}}>
                                            <h3>{post.ProjectTitle}</h3>
                                            {/* Delete Event Button Added Here */}
                                            <button
                                                className="btn-delete-post"
                                                onClick={() => handleDeletePost(post._id)}
                                                title="Delete this project post"
                                            >
                                                <Trash2 size={16} /> Delete Post
                                            </button>
                                        </div>

                                        <div className="post-meta">
                                            <span className="post-meta-item">
                                                <FolderGit2 size={16} /> {post.ProjectType}
                                            </span>
                                            <span className="post-meta-item">
                                                <Activity size={16} /> Status: {post.ProjectStatus}
                                            </span>
                                            <span className="post-meta-item">
                                                <Users size={16} /> {post.applications?.length || 0} Applicants
                                            </span>
                                            {post.ProjectRepoLink && (
                                                <span className="post-meta-item">
                                                    <Github size={16} />
                                                    <a href={post.ProjectRepoLink} target="_blank" rel="noopener noreferrer" className="repo-link">
                                                        Repository
                                                    </a>
                                                </span>
                                            )}
                                        </div>

                                        <div className="skills-container">
                                            {post.RequiredSkills?.map((skill, idx) => (
                                                <span key={idx} className="skill-badge">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Applicants List */}
                                <div className="applicants-section">
                                    <h4 className="applicants-title">
                                        <Users size={18} /> Applications
                                    </h4>

                                    {post.applications && post.applications.length > 0 ? (
                                        <div className="applicant-list">
                                            {post.applications.map((app) => (
                                                <div key={app._id} className="applicant-row">

                                                    <div className="applicant-details">
                                                        <span className="applicant-email">
                                                            {app.applicant?.email || "Unknown User"}
                                                        </span>
                                                        <span className="applicant-date">
                                                            <Clock size={12} />
                                                            Applied on {new Date(app.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>

                                                    <div className={`applicant-actions ${app.status === 'pending' ? 'has-actions' : ''}`}>
                                                        <span className={`status-badge status-${app.status.toLowerCase()}`}>
                                                            {app.status}
                                                        </span>

                                                        <button
                                                            className="btn btn-profile"
                                                            onClick={() => handleViewProfile(app.applicant?._id)}
                                                        >
                                                            <User size={14} /> Profile
                                                        </button>

                                                        {/* Only show Accept/Reject if status is pending */}
                                                        {app.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    className="btn btn-accept"
                                                                    onClick={() => handleAccept(app._id, post._id)}
                                                                >
                                                                    <Check size={14} /> Accept
                                                                </button>
                                                                <button
                                                                    className="btn btn-reject"
                                                                    onClick={() => handleReject(app._id, post._id)}
                                                                >
                                                                    <X size={14} /> Reject
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div style={{ color: 'var(--text-dark)', fontSize: '0.95rem' }}>
                                            No applications received yet.
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))
                    ) : (
                        // Empty State
                        <div className="empty-state">
                            <FolderGit2 size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                            <h3>No Project Posts Found</h3>
                            <p>You haven't created any project requirements yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}