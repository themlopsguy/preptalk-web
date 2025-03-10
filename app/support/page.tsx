"use client"

import Image from 'next/image';
import Link from 'next/link';
import styles from './support.module.css';
import { useEffect } from 'react';

export default function Support() {
  // Add title to page
  useEffect(() => {
    document.title = "Support - PrepTalk";
  }, []);

  return (
    <div className={styles.supportPage}>
      {/* Navigation Bar - simplified version */}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/">
              <Image 
                src="/logo.svg" 
                alt="PrepTalk Logo" 
                width={130} 
                height={40} 
                priority
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Support Content */}
      <div className={styles.supportContent}>
        <div className={styles.supportCard}>
          <h1 className={styles.supportTitle}>Support</h1>
          <p className={styles.supportText}>If you need assistance with PrepTalk, please contact us at:</p>
          <a href="mailto:support@preptalk.app" className={styles.supportEmail}>support@preptalk.app</a>
          <div className={styles.backToHome}>
            <Link href="/" className={styles.backLink}>← Back to Home</Link>
          </div>
        </div>
      </div>

      {/* Footer - simplified version */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Gallen Labs LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}