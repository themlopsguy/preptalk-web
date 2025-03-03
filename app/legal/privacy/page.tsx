import styles from './privacy.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | PrepTalk',
  description: 'PrepTalk\'s Privacy Policy - Learn how we collect, use, and protect your information when using our PrepTalk mobile application and related services.',
};

export default function PrivacyPolicy() {
  return (
    <div className={styles['privacy-policy']}>
      <header>
        <div className={styles.container}>
          <h1>Privacy Policy</h1>
          <p className={styles['last-updated']}>Last Updated: January 1, 2025</p>
        </div>
      </header>

      <div className="container">
        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>PrepTalk ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our PrepTalk mobile application and related services.</p>
        </section>

        <section className="section">
          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Information You Provide</h3>
          <p>We collect information that you voluntarily provide, including:</p>
          <ul>
            <li>Personal information (name, email address, location)</li>
            <li>Professional information (current company, job title, years of experience)</li>
            <li>Resume data and documents</li>
            <li>Voice recordings from interview sessions</li>
            <li>Job preferences and requirements</li>
            <li>LinkedIn, GitHub, and portfolio URLs</li>
            <li>Skills and professional summary</li>
          </ul>

          <h3>2.2 Information Automatically Collected</h3>
          <p>We automatically collect certain information when you use PrepTalk, including:</p>
          <ul>
            <li>Device information</li>
            <li>Usage statistics</li>
            <li>Interview performance data</li>
            <li>App interaction metrics</li>
          </ul>
        </section>

        <section className="section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for:</p>
          <ul>
            <li>Providing AI-powered interview preparation services</li>
            <li>Generating personalized interview questions</li>
            <li>Processing and analyzing resume content</li>
            <li>Creating voice synthesis for interview simulations</li>
            <li>Improving our services and user experience</li>
            <li>Communicating with you about your account and updates</li>
          </ul>
        </section>

        <section className="section">
          <h2>4. Data Processing and AI Services</h2>
          
          <p>We use some of the latest technologies and services to provide users the most optimal experience for Conversational AI itneraction and metric reporting.</p>
        </section>

        <section className="section">
          <h2>5. Data Storage and Security</h2>
          
          <h3>5.1 Data Storage</h3>
          <p>We use Supabase for secure data storage. Your information is stored and processed on secure servers with encryption at rest and in transit.</p>

          <h3>5.2 Security Measures</h3>
          <p>We implement appropriate technical and organizational measures to protect your personal information, including:</p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Secure authentication mechanisms</li>
            <li>Regular security assessments</li>
            <li>Access controls and monitoring</li>
          </ul>
        </section>

        <section className="section">
          <h2>6. Data Retention and Deletion</h2>
          <p>We retain your information for as long as your account is active or as needed to provide services. You can request deletion of your data by:</p>
          <ul>
            <li>Using the in-app deletion feature</li>
            <li>Contacting us at privacy@preptalk.app</li>
          </ul>
        </section>

        <section className="section">
          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request data deletion</li>
            <li>Export your data</li>
            <li>Opt-out of certain data processing</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section className="section">
          <h2>8. Children's Privacy</h2>
          <p>PrepTalk is not intended for users under 13 years of age. We do not knowingly collect information from children under 13.</p>
        </section>

        <section className="section">
          <h2>9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically. We will notify you of any material changes through:</p>
          <ul>
            <li>In-app notifications</li>
            <li>Email notifications</li>
            <li>Website updates</li>
          </ul>
        </section>

        <section className="section">
          <h2>10. Contact Us</h2>
          <p>If you have questions about this Privacy Policy or our privacy practices, contact us at:</p>
          <p>Email: privacy@preptalk.app<br />
          Website: https://preptalk.app</p>
        </section>

        <section className="section">
          <h2>11. California Privacy Rights</h2>
          <p>California residents have additional rights under the CCPA, including:</p>
          <ul>
            <li>Right to know what personal information is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to opt-out of the sale of personal information</li>
            <li>Right to non-discrimination for exercising these rights</li>
          </ul>
        </section>

        <section className="section">
          <h2>12. International Data Transfers</h2>
          <p>If you are using PrepTalk from outside the United States, your information may be transferred to, stored, and processed in the United States where our servers are located.</p>
        </section>

        <section className="section">
          <h2>13. Compliance</h2>
          <p>PrepTalk complies with:</p>
          <ul>
            <li>General Data Protection Regulation (GDPR)</li>
            <li>California Consumer Privacy Act (CCPA)</li>
            <li>App Store Guidelines</li>
            <li>Platform Privacy Requirements</li>
          </ul>
        </section>
      </div>

      <footer className={styles['privacy-footer']}>
        <div className={styles.container}>
          <p>&copy; 2025 PrepTalk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}