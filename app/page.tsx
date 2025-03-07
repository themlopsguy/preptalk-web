"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu when clicking outside or resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      // First check if target is an Element
      const target = event.target as Element;
      
      if (mobileMenuOpen && 
          !target.closest(`.${styles.navLinks}`) && 
          !target.closest(`.${styles.hamburger}`)) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <div className={styles.homepage}>
      {/* Navigation Bar */}
      <nav className={`${styles.navbar} ${mobileMenuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Image 
              src="/logo.svg" 
              alt="PrepTalk Logo" 
              width={130} 
              height={40} 
              priority
            />
          </div>
          <button 
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.active : ''}`}>
            <Link href="/support" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              How it works
            </Link>
            <Link href="/privacy" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              Why PrepTalk?
            </Link>
            <Link href="/privacy" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              Features
            </Link>
            <Link href="/terms" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              Reviews
            </Link>
            <Link 
              href="https://apps.apple.com/us/app/preptalk-ai-job-interviews/id6740067315" 
              className={styles.navLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Download Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>The #1 Interview Acing App</h1>
            <p className={styles.heroSubtitle}>
              PrepTalk is a free app dedicated to helping you get more job offers. The app analyzes your interview performance to make getting hired easier.
            </p>
            <div className={styles.heroButtons}>
              <a href="https://apps.apple.com/us/app/preptalk-ai-job-interviews/id6740067315?itscg=30200&itsct=apps_box_badge&mttnsubad=6740067315">
                <img 
                  src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1736121600" 
                  alt="Download on the App Store" 
                  width={180} 
                  height={60}
                  className={styles.appStoreBadge}
                />
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image 
              src="/hero-image.png" 
              alt="PrepTalk app on iPhone" 
              width={875} 
              height={1540}
              quality={100}
              priority={true}
              className={styles.phoneMockup}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepContent}>
              <div className={styles.stepNumber}><Image 
                                                    src="/personalized_interview.svg" 
                                                    alt="Personalized Interviews"
                                                    width={200}
                                                    height={75}
                                                    quality={100}/></div>
                <h3 className={styles.stepTitle}>Personalized Interviews</h3>
                <p className={styles.stepDescription}>
                  Using your resume and desired job posting, conduct custom realistic interviews with the most advanced conversational AI.
                </p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepContent}>
              <div className={styles.stepNumber}><Image 
                                                    src="/analysis.svg" 
                                                    alt="Analysis"
                                                    width={200}
                                                    height={75}
                                                    quality={100}/></div>
                <h3 className={styles.stepTitle}>Performance Analysis</h3>
                <p className={styles.stepDescription}>
                  PrepTalk provides in-depth analysis on how you perform during interviews based around communication, professionalism, story completion, and more.
                </p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepContent}>
              <div className={styles.stepNumber}><Image 
                                                    src="/offer_likelihood.svg" 
                                                    alt="Offer Likelihood"
                                                    width={200}
                                                    height={75}
                                                    quality={100}/></div>
                <h3 className={styles.stepTitle}>Offer likelihood</h3>
                <p className={styles.stepDescription}>
                  By assessing your professional experience, desired job details, and interview performance, you can see how likely you are to get a job offer.
                </p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepContent}>
              <div className={styles.stepNumber}><Image 
                                                    src="/prepscore.svg" 
                                                    alt="PrepScore"
                                                    width={200}
                                                    height={75}
                                                    quality={100}/></div>
                <h3 className={styles.stepTitle}>PrepScore</h3>
                <p className={styles.stepDescription}>
                  Every interview can increase or decrease your PrepScore. Get it above 800 and you are interview-ready!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Key Features</h2>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M14.0656 20.8412L10.3907 15.0522C8.98891 12.8369 9.68356 9.94437 11.8989 8.5426L12.766 7.96388L11.3891 4.58794L8.53907 6.38871C4.45782 8.89167 3.36678 14.3082 5.8697 18.3895L9.5446 24.1785L14.0656 20.8412Z" />
                  <path d="M16.6585 15.5145L15.2816 12.1386L19.8026 10.2386L21.1795 13.6145L16.6585 15.5145Z" />
                  <path d="M21.1795 2.2145L16.6585 0.314453L15.2816 3.69039L19.8026 5.59044L21.1795 2.2145Z" />
                  <path d="M19.8024 10.239L15.2813 12.139L16.6582 15.5149L21.1793 13.6149L19.8024 10.239Z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>AI-Generated Questions</h3>
              <p className={styles.featureDescription}>
                Get tailored interview questions based on your resume and target job description
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Natural Voice Interviews</h3>
              <p className={styles.featureDescription}>
                Practice with realistic interviews using high-quality voice synthesis technology
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M9 16.1716L19.5858 5.58578L21 7L9 19L3 13L4.41421 11.5858L9 16.1716Z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Detailed Feedback</h3>
              <p className={styles.featureDescription}>
                Receive personalized feedback and improvement suggestions after each practice session
              </p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M8 6V16C8 16.5523 8.44772 17 9 17H15C15.5523 17 16 16.5523 16 16V6C16 5.44772 15.5523 5 15 5H9C8.44772 5 8 5.44772 8 6Z" />
                  <path d="M3 10V18C3 18.5523 3.44772 19 4 19H7V9H4C3.44772 9 3 9.44772 3 10Z" />
                  <path d="M17 9V19H20C20.5523 19 21 18.5523 21 18V10C21 9.44772 20.5523 9 20 9H17Z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Progress Tracking</h3>
              <p className={styles.featureDescription}>
                Monitor your improvement over time with comprehensive progress analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What Users Say</h2>
          
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "PrepTalk helped me land my dream job at a top tech company. The practice interviews were incredibly realistic and the feedback was spot-on."
              </p>
              <p className={styles.testimonialAuthor}>— Alex M., Software Engineer</p>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "I used to get so nervous during interviews, but after practicing with PrepTalk, I felt much more confident and prepared. The voice synthesis is amazingly natural!"
              </p>
              <p className={styles.testimonialAuthor}>— Sarah J., Marketing Manager</p>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "The personalized feedback helped me identify weaknesses in my responses that I never noticed before. I've seen a huge improvement in just a few weeks."
              </p>
              <p className={styles.testimonialAuthor}>— Michael T., Product Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section className={styles.downloadCta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Ace Your Next Interview?</h2>
          <p className={styles.ctaDescription}>
            Download PrepTalk today and start practicing with our AI-powered interview coach.
          </p>
          <a href="https://apps.apple.com/app/preptalk" className={styles.primaryButton}>
            <Image 
              src="/app-store-badge.svg" 
              alt="Download on the App Store" 
              width={180} 
              height={60}
              className={styles.appStoreBadge}
            />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div className={styles.footerLogo}>
              <Image 
                src="/logo.svg" 
                alt="PrepTalk Logo" 
                width={140} 
                height={45} 
              />
              <p className={styles.footerTagline}>AI-Powered Interview Practice</p>
            </div>
            
            <div className={styles.footerLinks}>
              <div className={styles.footerLinkGroup}>
                <h3 className={styles.footerLinkTitle}>Company</h3>
                <Link href="/about" className={styles.footerLink}>About Us</Link>
                <Link href="/support" className={styles.footerLink}>Contact</Link>
                <a href="#" className={styles.footerLink}>Careers</a>
              </div>
              
              <div className={styles.footerLinkGroup}>
                <h3 className={styles.footerLinkTitle}>Legal</h3>
                <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
                <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
              </div>
              
              <div className={styles.footerLinkGroup}>
                <h3 className={styles.footerLinkTitle}>Support</h3>
                <Link href="/support" className={styles.footerLink}>Help Center</Link>
                <Link href="/support" className={styles.footerLink}>Contact Support</Link>
              </div>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Gallen Labs LLC. All rights reserved.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://twitter.com/preptalkapp" className={styles.socialLink} aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="https://linkedin.com/company/preptalkapp" className={styles.socialLink} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a href="https://instagram.com/preptalkapp" className={styles.socialLink} aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}