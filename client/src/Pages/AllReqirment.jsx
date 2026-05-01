import React, { useState } from 'react';
import '../styles/requirment.css';
import '../styles/hackathonDetail.css';

export default function HackathonDetail() {
  const [isApplying, setIsApplying] = useState(false);

  // Sample data - this can be replaced with props or API data
  const hackathonData = {
    _id: "69e3bdc305f88a8fa65d9e43",
    user: "69cf9e040c06f51b99de268f",
    hackthonName: "Hack Strom",
    hackthonProblemCategory: "Web3 / Blockchain",
    hackthonProblemStatement: "Land ownership systems are often fragmented, paper-based, and vulnerable to fraud and manipulation. Verifying ownership can be time-consuming and prone to disputes due to lack of reliable and tamper-proof records.",
    hackthonProjectIdea: "A decentralized land registry system built on Ethereum that ensures secure, transparent, and tamper-proof property ownership records. It integrates Addher KYC verification, Land ownership storing verified data on-chain and documents via IPFS—reducing fraud, disputes, and manual verification while enabling fast and trustworthy ownership validation.",
    hackthonWebsiteLink: "https://hack-storm.vercel.app/",
    AllTechStack: ["React", "Solidity", "nodejs", "smart contract", "blockchain"],
    RequiredSkills: ["UI/UX designer", "React"]
  };

  const handleApply = () => {
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      alert('Application submitted successfully!');
      setIsApplying(false);
    }, 1000);
  };

  const handleVisitWebsite = () => {
    window.open(hackathonData.hackthonWebsiteLink, '_blank');
  };

  return (
    <div className="app-bg">
      <div className="hackathon-detail-container">
        {/* Back button */}
        <div className="detail-header">
          <button className="btn-back" onClick={() => window.history.back()}>
            ← Back
          </button>
        </div>

        {/* Main Card */}
        <div className="hackathon-card glass">
          {/* Header Section */}
          <div className="hackathon-header">
            <div className="category-badge">
              <span className="badge-icon">⚡</span>
              {hackathonData.hackthonProblemCategory}
            </div>
            <h1 className="hackathon-title">{hackathonData.hackthonName}</h1>
          </div>

          <div className="divider" />

          {/* Problem Section */}
          <div className="section">
            <h2 className="section-title">Problem Statement</h2>
            <p className="section-content">{hackathonData.hackthonProblemStatement}</p>
          </div>

          {/* Solution Section */}
          <div className="section">
            <h2 className="section-title">Project Idea</h2>
            <p className="section-content">{hackathonData.hackthonProjectIdea}</p>
          </div>

          {/* Tech Stack Section */}
          <div className="section">
            <h2 className="section-title">Tech Stack</h2>
            <div className="tags-container">
              {hackathonData.AllTechStack.map((tech, index) => (
                <span key={index} className="tech-badge">
                  <span className="badge-dot">●</span>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Required Skills Section */}
          <div className="section">
            <h2 className="section-title">Required Skills</h2>
            <div className="tags-container">
              {hackathonData.RequiredSkills.map((skill, index) => (
                <span key={index} className="skill-badge">
                  <span className="badge-dot">✓</span>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="divider" />

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn-secondary" onClick={handleVisitWebsite}>
              🔗 Visit Website
            </button>
            <button 
              className="btn-primary" 
              onClick={handleApply}
              disabled={isApplying}
            >
              {isApplying ? 'Applying...' : '✨ Apply Now'}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="info-box glass">
          <div className="info-item">
            <span className="info-label">Hackathon ID</span>
            <span className="info-value">{hackathonData._id}</span>
          </div>
          <div className="info-divider" />
          <div className="info-item">
            <span className="info-label">Posted By</span>
            <span className="info-value">{hackathonData.user}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
