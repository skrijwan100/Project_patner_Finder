import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Code2, ExternalLink, Activity, FolderGit2, Clock } from 'lucide-react';

// --- NORMAL CSS ---
const customStyles = `
  :root {
    --bg-main: #0a0a0a;
    --bg-card: #131313;
    --bg-input: #1a1a1a;
    --bg-input-hover: #1a1400;
    --text-main: #ffffff;
    --text-muted: #a3a3a3;
    --text-dark: #888888;
    --primary: #FFC300;
    --primary-dark: #FF8C00;
    --border-light: #2a2a2a;
    --border-dark: #222222;
    --border-primary: #664d00;
    --border-input: #333333;
  }

  .my-applications-container {
    background-color: var(--bg-main);
    min-height: 100vh;
    margin-top: 50px;
    padding: 40px 20px;
    color: var(--text-main);
    font-family: system-ui, -apple-system, sans-serif;
  }

  .page-header {
    max-width: 1200px;
    margin: 0 auto 30px auto;
  }

  .page-title {
    font-size: 2rem;
    color: var(--text-main);
    margin: 0 0 8px 0;
  }

  .page-subtitle {
    color: var(--text-muted);
    margin: 0;
  }

  .highlight {
    color: var(--primary);
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Card Styles */
  .app-card {
    background-color: var(--bg-card);
    border: 1px solid var(--border-light);
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: transform 0.2s, border-color 0.2s;
  }

  .app-card:hover {
    border-color: var(--border-primary);
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }

  .card-title-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .card-type-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--primary);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .card-title {
    font-size: 1.25rem;
    margin: 0;
    font-weight: 600;
    color: var(--text-main);
    line-height: 1.3;
  }

  .status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
    text-transform: capitalize;
    background-color: var(--bg-input);
    border: 1px solid var(--border-input);
    color: var(--text-main);
  }

  .status-badge.pending {
    color: var(--primary);
    border-color: var(--border-primary);
    background-color: rgba(255, 195, 0, 0.1);
  }

  .info-row {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .info-link {
    color: var(--primary);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s;
  }

  .info-link:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }

  .skills-section {
    margin-top: auto;
    padding-top: 16px;
    border-top: 1px solid var(--border-light);
  }

  .skills-title {
    font-size: 0.85rem;
    color: var(--text-dark);
    margin: 0 0 10px 0;
  }

  .tags-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-badge {
    background-color: var(--bg-input);
    color: var(--text-muted);
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.8rem;
    border: 1px solid var(--border-input);
  }

  /* Skeleton Animations */
  .skeleton {
    background: var(--border-light);
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
  }
  @keyframes pulse {
    0% { background-color: var(--border-light); }
    50% { background-color: var(--border-input); }
    100% { background-color: var(--border-light); }
  }
  .skeleton-title { height: 24px; width: 70%; }
  .skeleton-badge { height: 28px; width: 80px; border-radius: 20px; }
  .skeleton-text { height: 16px; width: 100%; }
  .skeleton-text-short { height: 16px; width: 50%; }
  .skeleton-tag { height: 26px; width: 70px; border-radius: 6px; }
`;

// --- SKELETON COMPONENT ---
const SkeletonApplicationCard = () => (
  <div className="app-card">
    <div className="card-header">
      <div className="card-title-group" style={{ width: '100%' }}>
        <div className="skeleton skeleton-text-short" style={{ width: '30%', marginBottom: '6px' }}></div>
        <div className="skeleton skeleton-title"></div>
      </div>
      <div className="skeleton skeleton-badge"></div>
    </div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text-short"></div>
    <div className="skills-section">
      <div className="tags-flex">
        <div className="skeleton skeleton-tag"></div>
        <div className="skeleton skeleton-tag" style={{ width: '90px' }}></div>
      </div>
    </div>
  </div>
);

export default function UserApplication() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationData = async () => {
      setLoading(true);
      try {
        const token = await user?.getIdToken();
        const localtoken = secureLocalStorage.getItem('auth-token');
        let headers = { "Content-Type": "application/json" };

        if (localtoken) {
          headers["auth-token"] = localtoken;
        } else if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        } else {
          // If no auth available, stop loading
          setLoading(false);
          return;
        }

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/application/user-all-application`;
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        });

        const data = await response.json();
        if (data.success) {
          setApplications(data.data);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [user]);

  return (
    <>
      <style>{customStyles}</style>
      <div className="my-applications-container">
        
        <header className="page-header">
          <h1 className="page-title">My <span className="highlight">Applications</span></h1>
          <p className="page-subtitle">Track the status of the hackathons and projects you've applied to.</p>
        </header>

        <div className="grid-container">
          {loading ? (
            // Show Skeletons while loading
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonApplicationCard key={index} />
            ))
          ) : applications.length > 0 ? (
            // Render actual data
            applications.map((app) => {
              const isHackathon = app.eventModel === "RequirmentHackthon";
              const details = app.eventDetails;

              // Determine values based on the event model
              const title = isHackathon ? details.hackthonName : details.ProjectTitle;
              const typeLabel = isHackathon ? "Hackathon" : "Project";
              const TypeIcon = isHackathon ? Code2 : FolderGit2;
              const categoryOrType = isHackathon ? details.hackthonProblemCategory : details.ProjectType;
              const skills = details.RequiredSkills || [];

              return (
                <div key={app._id} className="app-card">
                  
                  <div className="card-header">
                    <div className="card-title-group">
                      <span className="card-type-label">
                        <TypeIcon size={14} /> {typeLabel}
                      </span>
                      <h3 className="card-title">{title}</h3>
                    </div>
                    <div className={`status-badge ${app.status.toLowerCase()}`}>
                      <Clock size={14} />
                      {app.status}
                    </div>
                  </div>

                  <div className="info-row">
                    <Briefcase size={16} />
                    <span>{categoryOrType}</span>
                  </div>

                  {/* Render specific field based on eventModel */}
                  <div className="info-row">
                    {isHackathon && details.hackthonWebsiteLink ? (
                      <a href={details.hackthonWebsiteLink} target="_blank" rel="noopener noreferrer" className="info-link">
                        <ExternalLink size={16} /> Website Link
                      </a>
                    ) : !isHackathon && details.ProjectStatus ? (
                      <>
                        <Activity size={16} />
                        <span>Status: {details.ProjectStatus}</span>
                      </>
                    ) : null}
                  </div>

                  <div className="skills-section">
                    <h4 className="skills-title">Required Skills</h4>
                    <div className="tags-flex">
                      {skills.map((skill, index) => (
                        <span key={index} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            // Empty State
            <div style={{ color: 'var(--text-muted)', padding: '20px 0' }}>
              You haven't applied to any projects or hackathons yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
}