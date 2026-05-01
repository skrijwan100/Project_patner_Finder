import React, { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, ChevronRight, Code2, Briefcase, Zap, Globe } from 'lucide-react';
import '../styles/viewallreqirment.css'
// --- MOCK DATA ---
const MOCK_DATA = [
  {
    "_id": { "$oid": "69e3bdc305f88a8fa65d9e43" },
    "user": { "$oid": "69cf9e040c06f51b99de268f" },
    "hackthonName": "Hack Strom",
    "hackthonProblemCategory": "Web3 / Blockchain",
    "hackthonProblemStatement": "Land ownership systems are often fragmented, paper-based, and vulnerable to fraud and manipulation. Verifying ownership can be time-consuming and prone to disputes due to lack of reliable and tamper-proof records.",
    "hackthonProjectIdea": "A decentralized land registry system built on Ethereum that ensures secure, transparent, and tamper-proof property ownership records. It integrates Addher KYC verification, Land ownership storing verified data on-chain and documents via IPFS—reducing fraud, disputes, and manual verification while enabling fast and trustworthy ownership validation.",
    "hackthonWebsiteLink": "https://hack-storm.vercel.app/",
    "AllTechStack": ["React", "Solidity", "nodejs", "smart contract", "blockchain"],
    "RequiredSkills": ["UI/UX designer", "React"],
    "__v": 0
  },
  {
    "_id": { "$oid": "70f4ce1a2b349b1cd78e1a22" },
    "user": { "$oid": "70cf9e040c06f51b99de111a" },
    "hackthonName": "AI Health Innovators",
    "hackthonProblemCategory": "Healthcare / AI",
    "hackthonProblemStatement": "Early detection of chronic diseases is often missed due to lack of continuous monitoring and predictive analysis of personal health data.",
    "hackthonProjectIdea": "An AI-driven mobile platform that analyzes daily wearable data to predict early signs of cardiovascular issues, alerting users and doctors automatically.",
    "hackthonWebsiteLink": "https://ai-health-innovators.dev/",
    "AllTechStack": ["Python", "TensorFlow", "React Native", "AWS", "PostgreSQL"],
    "RequiredSkills": ["Python", "Data Scientist", "Mobile Dev"],
    "__v": 0
  },
  {
    "_id": { "$oid": "81a5de2b3c450c2de89f2b33" },
    "user": { "$oid": "81df0f151d17062c00ef222b" },
    "hackthonName": "Eco Sustainer Build",
    "hackthonProblemCategory": "Sustainability / IoT",
    "hackthonProblemStatement": "Urban households waste massive amounts of electricity due to inefficient appliance usage and lack of real-time power consumption awareness.",
    "hackthonProjectIdea": "A smart home IoT dashboard that connects to standard breakers, providing real-time gamified feedback to households to reduce their carbon footprint.",
    "hackthonWebsiteLink": "https://eco-sustainer.io/",
    "AllTechStack": ["C++", "Arduino", "Vue.js", "Firebase", "MQTT"],
    "RequiredSkills": ["IoT Engineer", "Vue.js", "UI/UX designer"],
    "__v": 0
  },
  {
    "_id": { "$oid": "92b6ef3c4d561d3ef90a3c44" },
    "user": { "$oid": "92e010262e28173d11f0333c" },
    "hackthonName": "Fintech Fusion",
    "hackthonProblemCategory": "Fintech / DeFi",
    "hackthonProblemStatement": "Cross-border micro-transactions suffer from incredibly high fees and slow settlement times, hurting freelance workers in developing nations.",
    "hackthonProjectIdea": "A layer-2 payment protocol utilizing stablecoins to facilitate instant, near-zero fee remittances for gig workers globally.",
    "hackthonWebsiteLink": "https://fin-fusion-defi.xyz/",
    "AllTechStack": ["Next.js", "Rust", "Solana", "Tailwind CSS"],
    "RequiredSkills": ["Rust Developer", "Smart Contract", "Frontend Dev"],
    "__v": 0
  }
];

// --- NORMAL CSS ---
const customStyles = `

`;

// --- COMPONENTS ---

const Badge = ({ children, outline = false }) => {
  return (
    <span className={`badge ${outline ? 'badge-outline' : 'badge-solid'}`}>
      {children}
    </span>
  );
};

export default function ViewAllRequirment() {
  const [view, setView] = useState('list'); // 'list' or 'details'
  const [selectedProject, setSelectedProject] = useState(null);
  const [hackthonData, setHackthonData] = useState([])


  useEffect(() => {
    const fecthdata = async () => {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/reqirment/all-hackthon-requirment`
      const responce = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await responce.json();
      setHackthonData(data.data)
      console.log(data)
    }
    fecthdata();

  }, [])
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setView('list');
    setSelectedProject(null);
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="app-container">

        {/* Top Navigation / Header area */}

        <main className="main-content">
          {view === 'list' && (
            <div className="fade-in-up">
              {/* Hero Section */}
              <div className="hero-section">
                <h2 className="hero-title">
                  Find the <span className="hero-highlight">All Post</span><br />
                  For Your Project
                </h2>
                <p className="hero-subtitle">
                  Browse open requirements, connect with talented people, and build amazing projects together. Your next big thing starts here.
                </p>
              </div>

              <div className="grid-container">
                {hackthonData.map((project) => (
                  <div key={project._id} className="card">
                    <div className="card-header">
                      <h3 className="card-title">{project.hackthonName}</h3>
                      <div className="icon-box">
                        <Briefcase size={20} />
                      </div>
                    </div>

                    <div className="card-section">
                      <p className="card-label">
                        <Globe size={16} /> Category
                      </p>
                      <p className="card-value">{project.hackthonProblemCategory}</p>
                    </div>

                    <div className="card-section flex-grow">
                      <p className="card-label">
                        <Zap size={16} /> Required Skills
                      </p>
                      <div className="tags-flex">
                        {project.RequiredSkills.map((skill, index) => (
                          <Badge key={index} outline>{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <button className="card-btn" onClick={() => handleViewDetails(project)}>
                      View Details
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'details' && selectedProject && (
            <div className="details-wrapper fade-in-right">
              <button className="back-btn" onClick={handleBack}>
                <div className="icon-box">
                  <ArrowLeft size={16} />
                </div>
                <span className="back-text">Back to Projects</span>
              </button>

              <div className="details-card">
                <div className="gradient-line"></div>

                <div className="details-content">
                  <div className="details-header">
                    <div>
                      <h2 className="details-title">{selectedProject.hackthonName}</h2>
                      <Badge>{selectedProject.hackthonProblemCategory}</Badge>
                    </div>

                    <a
                      href={selectedProject.hackthonWebsiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit-btn"
                    >
                      <ExternalLink size={20} />
                      Visit Project Site
                    </a>
                  </div>

                  <div className="details-body">
                    <div className="details-main-col">
                      <section>
                        <h3 className="section-title">
                          <span className="section-icon-box">
                            <Briefcase size={20} />
                          </span>
                          Problem Statement
                        </h3>
                        <p className="section-text">{selectedProject.hackthonProblemStatement}</p>
                      </section>

                      <section>
                        <h3 className="section-title">
                          <span className="section-icon-box">
                            <Zap size={20} />
                          </span>
                          Project Idea / Solution
                        </h3>
                        <p className="section-text">{selectedProject.hackthonProjectIdea}</p>
                      </section>
                    </div>

                    <div className="details-sidebar">
                      <div>
                        <h3 className="sidebar-heading">Required Skills</h3>
                        <div className="tags-flex">
                          {selectedProject.RequiredSkills.map((skill, index) => (
                            <Badge key={`req-${index}`} outline>{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="sidebar-divider">
                        <h3 className="sidebar-heading">
                          <Code2 size={16} /> Tech Stack
                        </h3>
                        <div className="tags-flex">
                          {selectedProject.AllTechStack.map((tech, index) => (
                            <span key={`tech-${index}`} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="apply-footer">
                    <button className="apply-btn">
                      Apply as Partner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}