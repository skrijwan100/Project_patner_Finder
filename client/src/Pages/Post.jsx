import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { handleError } from '../Components/ErrorMessage';
const cardData = [
    {
        id: 1,
        icon: "⚡",
        Category: 'Hackthon',
        title: "Check your all Hackathon post",
        description: "Build a dream team for your next hackathon challenge",
    },
    {
        id: 2,
        icon: "🚀",
        Category: 'Project',
        title: "Check your all Project post",
        description: "Collaborate on side projects, startups & open source",
    }
];
import { useAuth } from '../context/AuthContext';
import secureLocalStorage from 'react-secure-storage';
export default function App() {
    const naviget = useNavigate();
    const { user } = useAuth()
    useEffect(() => {
        const checkuser =async () => {
            const token = await user?.getIdToken();
            const localtoken = secureLocalStorage.getItem('auth-token');
            if (!token && !localtoken) {
                handleError('Login Frist')
                return naviget('/login')
            };
        }
        checkuser();
    }, [user])
    const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .app-container {
      min-height: 100vh;
      background-color: #050505;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    @media (min-width: 640px) {
      .app-container {
        padding: 3rem;
      }
    }

    .header-section {
      text-align: center;
      max-width: 42rem;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 4rem;
    }

    .main-title {
      font-family: 'Rajdhani', sans-serif;
      font-size: 3rem;
      font-weight: 700;
      color: #ff9f00;
      margin-bottom: 1.5rem;
      letter-spacing: 0.025em;
    }

    @media (min-width: 768px) {
      .main-title {
        font-size: 3.75rem;
      }
    }

    .sub-title {
      color: #a1a1aa;
      font-size: 1.125rem;
      line-height: 1.625;
      max-width: 32rem;
      margin-left: auto;
      margin-right: auto;
    }

    @media (min-width: 768px) {
      .sub-title {
        font-size: 1.25rem;
      }
    }

    .card-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      width: 100%;
      max-width: 56rem;
      margin-left: auto;
      margin-right: auto;
    }

    @media (min-width: 768px) {
      .card-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .team-card {
      background-color: #0f0f0f;
      border: 1px solid #262626;
      border-radius: 1rem;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
    }

    @media (min-width: 768px) {
      .team-card {
        padding: 2.5rem;
      }
    }

    .team-card:hover {
      transform: translateY(-4px);
      border-color: rgba(234, 179, 8, 0.5); /* Yellow border hint */
      background-color: #151515;
      box-shadow: 0 0 35px rgba(234, 179, 8, 0.25); /* Yellow glow */
    }

    .card-icon {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      transition: transform 0.3s ease-in-out;
      transform-origin: left center;
    }

    .team-card:hover .card-icon {
      transform: scale(1.1);
    }

    .card-title {
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      transition: color 0.3s ease-in-out;
    }

    .team-card:hover .card-title {
      color: #fefce8;
    }

    .card-description {
      color: #848484;
      font-size: 1rem;
      line-height: 1.625;
      transition: color 0.3s ease-in-out;
    }

    .team-card:hover .card-description {
      color: #a1a1aa;
    }
  `;

    const handleclick = (cat) => {
        if (cat === 'Hackthon') {
            return naviget('/post/hackthon');
        }
        return naviget('/post/project');
    }

    return (
        <>
            <style>{styles}</style>

            { }
            <div className="app-container">

                <div className="header-section">
                    <h1 className="main-title">
                        Make Your Dream Team
                    </h1>
                    <p className="sub-title">
                        Check the all apllication and get matched with the right people — fast.
                    </p>
                </div>

                { }
                <div className="card-grid" >
                    {cardData.map((card) => (
                        <div key={card.id} className="team-card" onClick={() => handleclick(card.Category)}>
                            <div className="card-icon">
                                {card.icon}
                            </div>
                            <h3 className="card-title">
                                {card.title}
                            </h3>
                            <p className="card-description">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}