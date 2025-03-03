import styles from './terms.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | PrepTalk',
  description: 'PrepTalk\'s Terms and Conditions - Guidelines for using our AI-powered interview preparation services and mobile application.',
};

export default function TermsAndConditions() {
  return (
    <div className={styles['terms-page']}>
      <header>
        <div className={styles.container}>
          <h1>Terms and Conditions</h1>
          <p className={styles['last-updated']}>Last Updated: January 1, 2025</p>
        </div>
      </header>

      <div className={styles.container}>
        <section className={styles.section}>
          <h2>1. Agreement to Terms</h2>
          <p>Welcome to PrepTalk. These Terms and Conditions ("Terms") govern your access to and use of the PrepTalk mobile application and website (collectively, the "Service"). Please read these Terms carefully.</p>
          <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.</p>
        </section>

        <section className={styles.section}>
          <h2>2. Definitions</h2>
          <p>Throughout these Terms, we may use certain terminology:</p>
          <ul>
            <li><strong>"User,"</strong> "you," and "your" refer to you, the person accessing or using the Service.</li>
            <li><strong>"PrepTalk,"</strong> "we," "us," and "our" refer to the operators of the PrepTalk application and service.</li>
            <li><strong>"Content"</strong> refers to interview questions, responses, feedback, and other materials available through our Service.</li>
            <li><strong>"User Data"</strong> refers to resumes, personal information, and other data you provide to the Service.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Accounts and Registration</h2>
          <p>When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.</p>
          <p>You are responsible for safeguarding the password for your account and for any activities or actions under your account. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
        </section>

        <section className={styles.section}>
          <h2>4. User Rights and Responsibilities</h2>
          <h3>4.1 Acceptable Use</h3>
          <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Use the Service in any way that violates any applicable law or regulation.</li>
            <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity.</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service.</li>
            <li>Attempt to gain unauthorized access to the Service, user accounts, or computer systems.</li>
            <li>Use the Service to generate inappropriate content or for any harmful purpose.</li>
          </ul>
          
          <h3>4.2 Content Accuracy</h3>
          <p>The interview preparation and AI-generated content provided by the Service is for educational and practice purposes only. We strive to create high-quality, relevant content, but we make no guarantees about its accuracy, completeness, or suitability for any particular purpose.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Intellectual Property</h2>
          <h3>5.1 Service Content</h3>
          <p>The Service and its original content, features, and functionality are and will remain the exclusive property of PrepTalk and its licensors. The Service is protected by copyright, trademark, and other intellectual property laws.</p>
          
          <h3>5.2 User Content</h3>
          <p>By uploading your resume or other content to the Service, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and process this content for the purpose of providing the Service to you.</p>
          <p>You represent and warrant that you own or have the necessary rights to your content and that you have the right to grant the license described above.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Subscription and Billing</h2>
          <h3>6.1 Fees and Payment</h3>
          <p>Some aspects of the Service may require payment of fees. All fees are stated in US dollars and do not include taxes, which may be added to the total amount due.</p>
          <p>You agree to provide current, complete, and accurate payment information. You authorize us to charge your designated payment method for all fees incurred.</p>
          
          <h3>6.2 Cancellation and Refunds</h3>
          <p>You may cancel your subscription at any time through your account settings or by contacting us. Refunds are processed according to our Refund Policy, which is incorporated into these Terms.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Termination</h2>
          <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms.</p>
          <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or delete your account through the app.</p>
        </section>

        <section className={styles.section}>
          <h2>8. Limitation of Liability</h2>
          <p>In no event shall PrepTalk, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
          <ul>
            <li>Your access to or use of or inability to access or use the Service;</li>
            <li>Any conduct or content of any third party on the Service;</li>
            <li>Any content obtained from the Service; and</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>9. Disclaimer</h2>
          <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.</p>
          <p>PrepTalk does not warrant that the Service will be uninterrupted, timely, secure, or error-free, or that any defects will be corrected.</p>
        </section>

        <section className={styles.section}>
          <h2>10. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.</p>
          <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
        </section>

        <section className={styles.section}>
          <h2>11. Changes to Terms</h2>
          <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.</p>
          <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
        </section>

        <section className={styles.section}>
          <h2>12. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>Email: legal@preptalk.app<br />
          Website: https://preptalk.app</p>
        </section>
      </div>

      <footer className={styles['terms-footer']}>
        <div className={styles.container}>
          <p>&copy; 2025 PrepTalk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}