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

// Fixed scrollToSection function with proper TypeScript annotations
const scrollToSection = (elementId: string, e: React.MouseEvent<HTMLAnchorElement>): void => {
  // Prevent default anchor behavior
  e.preventDefault();
  
  // Find the element to scroll to
  const element = document.getElementById(elementId);
  
  if (element) {
    // Get the navbar height to offset the scroll position
    // Fix: Cast the navbar to HTMLElement to access offsetHeight
    const navbar = document.querySelector(`.${styles.navbar}`) as HTMLElement;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    // Get the element's position relative to the viewport
    const elementPosition = element.getBoundingClientRect().top;
    
    // Get the current scroll position and calculate the target position
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
    
    // Smooth scroll to the element
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }
};

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
          <a href="#howItWorks" className={styles.navLink} onClick={(e) => scrollToSection('howItWorks', e)} >
            How it works
          </a>
          <a href="#whyPreptalk" className={styles.navLink} onClick={(e) => scrollToSection('whyPreptalk', e)} >
              Why PrepTalk?
          </a>
            <Link href="#features" className={styles.navLink} onClick={(e) => scrollToSection('features', e)}>
              Features
            </Link>
            <Link href="#reviews" className={styles.navLink} onClick={(e) => scrollToSection('reviews', e)}>
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
              width={450} 
              height={850}
              quality={100}
              priority={true}
              className={styles.phoneMockup}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="howItWorks" className={styles.howItWorks}>
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

      <div className={styles.styledDivider}>
        <span></span>
      </div>

      {/* Why PrepTalk? Section */}
      <section id="whyPreptalk" className={styles.whyPreptalk}>
        <div className={styles.container}>
          <div className={styles.whyPrepTalkContent}>
            <div className={styles.whyPrepTalkImage}>
              <Image 
                src="/why-preptalk.png" 
                alt="Why-Preptalk"
                width={550}
                height={600}
                quality={100}
              />
            </div>
            <div className={styles.whyPrepTalkText}>
              <h2 className={styles.sectionTitle}>Realistic Interviews. Essential Feedback.</h2>
              <p className={styles.whyPrepTalkDescription}>
                At PrepTalk, we want to eliminate interview anxiety. So we built an intuitive interface that uses the most advanced conversational AI systems to enable you to have the most realistic interview experience possible.
              </p>
              <p className={styles.whyPrepTalkDescription}>
                Your interviewer knows your resume, skillset, and the job you want so they can conduct and interview personalized for you.
              </p>
              <p className={styles.whyPrepTalkDescription}>
                Paired with relevant feedback and beautiful data graphs, you can keep practicing, watch yourself improve, and be on your way to acing the real interview and receiving top job offers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
  <div className={styles.container}>
    <div className={styles.featureLayout}>
      <div className={styles.featureContent}>
        <h1 className={styles.featureTitle}>Know when you're ready.</h1>
        <p className={styles.featureDescription}>
          The core of PrepTalk is the PrepScore. This personalized score is based on your unique weaknesses and goals. When your score reaches 800+, you are golden and interview-ready!
        </p>
        <h3 className={styles.featureSubtitle}>Integrated Features:</h3>
        <ul className={styles.featureBullets}>
          <li>Pofile Setup</li>
          <li>Cutting-edge Conversational AI</li>
          <li>Personalized, Role-specific Feedback and Performanace Analysis</li>
          <li>Auto-parsing of Resume and Desire Job Posting Link</li>
          <li>Resume Updating</li>
          <li>See Performance Progress Over Time</li>
        </ul>
      </div>
      <div className={styles.featureImageWrapper}>
        <Image 
          src="/feature-image.png" 
          alt="Feature Image"
          width={1000}
          height={600}
          quality={100}
          className={styles.featureImage}
        />
      </div>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section id="reviews" className={styles.testimonials}>
        <div className={styles.container}>
          <h2 className={styles.testimonialTitle}>Our Users Love PrepTalk</h2>
          <p className={styles.testimonialSubtitle}>They're receiving great offers with the help of PrepTalk!</p>
          
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "I hate interviews. This app has finally helped me feel confident and nail my latest interview and get an offer!!!"
              </p>
              <p className={styles.testimonialAuthor}>— MLOpsGuy</p>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "This app was exactly what I was looking for. Easy to use, and had all of the tools that helped me feel confident in my interviews."
              </p>
              <p className={styles.testimonialAuthor}>— J-Truitt</p>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "This app is a great tool when preparing for interviews. It's very user friendly and easy to navigate. The real time feedback provides valuable insights. Highly recommend for anyone looking to improve their interview skills!"
              </p>
              <p className={styles.testimonialAuthor}>— Thinkofpink</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section className={styles.downloadCta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Ace Your Next Interview?</h2>
          <p className={styles.ctaDescription}>
            Download PrepTalk today and start your path towards your dream job!
          </p>
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
                <h3 className={styles.footerLinkTitle}>Legal</h3>
                <Link href="/legal/privacy" className={styles.footerLink}>Privacy Policy</Link>
                <Link href="/legal/terms" className={styles.footerLink}>Terms of Service</Link>
              </div>
              
              <div className={styles.footerLinkGroup}>
                <h3 className={styles.footerLinkTitle}>Support</h3>
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