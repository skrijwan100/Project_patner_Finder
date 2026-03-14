import React, { useState, useEffect } from 'react'

export default function Signup1() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 80)
  }, [])

  const handleSubmit = () => {
    if (email && email.includes('@')) setSubmitted(true)
  }

  const resetForm = () => {
    setEmail('')
    setSubmitted(false)
  }

  return (
    <div style={{
      minHeight: '100vh', width: '100%', background: '#000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Rajdhani', sans-serif", position: 'relative',
      overflow: 'hidden', padding: '120px 24px 24px', boxSizing: 'border-box',
    }}>
      <style>{`
        
      `}</style>

      {/* Floating Orbs */}
      <div className="orb1" style={{ position:'absolute', width:350, height:350, left:'-10%', top:'-12%', background:'radial-gradient(circle,rgba(255,122,0,.2) 0%,transparent 70%)', filter:'blur(90px)', borderRadius:'50%', pointerEvents:'none' }} />
      <div className="orb2" style={{ position:'absolute', width:240, height:240, left:'70%', top:'62%', background:'radial-gradient(circle,rgba(255,195,0,.15) 0%,transparent 70%)', filter:'blur(70px)', borderRadius:'50%', pointerEvents:'none' }} />
      <div className="orb3" style={{ position:'absolute', width:200, height:200, left:'12%', top:'68%', background:'radial-gradient(circle,rgba(255,122,0,.12) 0%,transparent 70%)', filter:'blur(80px)', borderRadius:'50%', pointerEvents:'none' }} />
      <div className="orb4" style={{ position:'absolute', width:280, height:280, left:'62%', top:'-18%', background:'radial-gradient(circle,rgba(255,195,0,.12) 0%,transparent 70%)', filter:'blur(100px)', borderRadius:'50%', pointerEvents:'none' }} />
      <div className="orb5" style={{ position:'absolute', width:160, height:160, left:'83%', top:'78%', background:'radial-gradient(circle,rgba(255,122,0,.16) 0%,transparent 70%)', filter:'blur(60px)', borderRadius:'50%', pointerEvents:'none' }} />

      {/* Grid overlay */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
        backgroundSize:'52px 52px',
        maskImage:'radial-gradient(ellipse 75% 75% at 50% 50%,#000 40%,transparent 100%)',
        WebkitMaskImage:'radial-gradient(ellipse 75% 75% at 50% 50%,#000 40%,transparent 100%)',
      }} />

      {/* Glass Card */}
      <div className="glass-card">

        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:36 }}>
          <div style={{ width:40, height:40, background:'#FF7A00', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 20px rgba(255,122,0,.45)', flexShrink:0 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M10 4l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ color:'#fff', fontWeight:700, fontSize:'1.3rem', letterSpacing:'.08em', textTransform:'uppercase' }}>Devforge</span>
          {/* <span style={{ marginLeft:4, background:'rgba(255,122,0,.15)', color:'#FF7A00', fontSize:'.65rem', fontWeight:700, borderRadius:6, padding:'2px 8px', border:'1px solid rgba(255,122,0,.3)', letterSpacing:'.1em', textTransform:'uppercase' }}></span> */}
        </div>

        {!submitted ? (
          <>
            <h1 style={{ color:'#fff', fontSize:'2rem', fontWeight:700, margin:'0 0 6px', letterSpacing:'.06em', lineHeight:1.15, textTransform:'uppercase' }}>
              Create Your Account
            </h1>
            <p style={{ color:'rgba(255,255,255,.42)', fontSize:'1rem', margin:'0 0 30px', lineHeight:1.55, fontFamily:'sans-serif', fontWeight:400, letterSpacing:'.01em' }}>
              Enter your email to get started — no credit card required.
            </p>

            <label style={{ display:'block', color:'rgba(255,255,255,.55)', fontSize:'.9rem', fontWeight:600, marginBottom:9, letterSpacing:'.1em', textTransform:'uppercase' }}>
              Enter your email
            </label>
            <input
              className="email-input"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <button className="verify-btn" style={{ marginTop:22 }} onClick={handleSubmit}>
              Verify Your Email →
            </button>

            {/* Divider */}
            <div style={{ display:'flex', alignItems:'center', gap:12, margin:'26px 0' }}>
              <div className="divline" />
              <span style={{ color:'rgba(255,255,255,.25)', fontSize:'.82rem', whiteSpace:'nowrap', fontFamily:'sans-serif', letterSpacing:'.04em' }}>or continue with</span>
              <div className="divline" />
            </div>

            {/* Social Buttons */}
            <div style={{ display:'flex', gap:10 }}>
              <button className="social-btn">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.657 14.148 17.64 11.84 17.64 9.2z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>

            <p style={{ color:'rgba(255,255,255,.22)', fontSize:'.82rem', textAlign:'center', margin:'24px 0 0', lineHeight:1.7, fontFamily:'sans-serif' }}>
              Already have an account? <span className="link">log in</span><br/>
              <span style={{ fontSize:'.76rem' }}>By continuing, you agree to our <span className="link">Terms</span> &amp; <span className="link">Privacy Policy</span>.</span>
            </p>
          </>
        ) : (
          /* Success State */
          <div style={{ textAlign:'center', padding:'16px 0' }}>
            <div style={{ width:68, height:68, borderRadius:'50%', background:'#FF7A00', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 26px', boxShadow:'0 6px 36px rgba(255,122,0,.5)' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={{ color:'#fff', fontWeight:700, fontSize:'1.7rem', margin:'0 0 8px', letterSpacing:'.08em', textTransform:'uppercase' }}>
              Check Your Inbox!
            </h2>
            <p style={{ color:'rgba(255,255,255,.45)', fontSize:'.95rem', lineHeight:1.6, margin:'0 0 26px', fontFamily:'sans-serif' }}>
              We've sent a verification link to<br/>
              <span style={{ color:'#FF7A00', fontWeight:600, fontSize:'1.05rem', letterSpacing:'.04em' }}>{email}</span>
            </p>
            <button className="verify-btn" onClick={resetForm}>Use a Different Email</button>
          </div>
        )}
      </div>
    </div>
  )
}