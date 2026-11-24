import React from "react";
import "./LegalPages.css";

export default function TermsOfService({ onBack, onNavigate }) {
  return (
    <main className="legal-page">
      <header className="legal-nav">
        <a className="legal-brand" href="/" aria-label="DrawEgg home">
          <span className="legal-brand-mark">◯</span>
          <span>
            <strong>DrawEgg</strong>
            <small>Idea Board</small>
          </span>
        </a>
        <button
          type="button"
          className="legal-back-button"
          onClick={onBack}
        >
          <span aria-hidden="true">←</span>
          Back to Board
        </button>
      </header>
      <article className="legal-content">
        <span className="legal-eyebrow">DRAW EGG · LEGAL</span>
        <h1>Terms of Service</h1>
        <p className="legal-lead">
          A few straightforward rules for using DrawEgg to sketch, plan and
          organize your ideas.
        </p>
        <p className="legal-updated">Last updated: November 25, 2026</p>

        <section>
          <h2>1. Using DrawEgg</h2>
          <p>
            DrawEgg is a creative drawing and idea-board tool. By using the
            website, you agree to use it lawfully and in a way that does not
            interfere with the service or other users.
          </p>
        </section>

        <section>
          <h2>2. Your content</h2>
          <p>
            You are responsible for the drawings, text, diagrams and other
            content you create or import. You retain any rights you already
            hold in your content. You should only upload, draw or share
            material that you have the right to use.
          </p>
        </section>

        <section>
          <h2>3. Acceptable use</h2>
          <p>You agree not to use DrawEgg to:</p>
          <ul>
            <li>break applicable laws or infringe another person's rights;</li>
            <li>distribute malicious code or attempt to compromise the site;</li>
            <li>interfere with the availability or normal operation of DrawEgg;</li>
            <li>misrepresent the source of content or use the app to harass others.</li>
          </ul>
        </section>

        <section>
          <h2>4. Downloads and backups</h2>
          <p>
            You are responsible for downloading and keeping copies of work
            that you want to preserve. Unless a cloud-save feature is
            explicitly provided, do not rely on DrawEgg as the only place
            where your work is stored.
          </p>
        </section>

        <section>
          <h2>5. Availability and changes</h2>
          <p>
            DrawEgg may be updated, changed, temporarily unavailable or
            discontinued. We will aim to keep the app useful, but do not
            promise uninterrupted availability or that every feature will
            remain unchanged.
          </p>
        </section>

        <section>
          <h2>6. No professional advice</h2>
          <p>
            DrawEgg is a general creative tool. Diagrams, sketches and
            generated visual content are not professional legal, financial,
            engineering, medical or safety advice. Check important work
            independently before relying on it.
          </p>
        </section>

        <section>
          <h2>7. Disclaimer</h2>
          <p>
            To the extent permitted by applicable law, DrawEgg is provided
            on an “as available” basis without promises that it will be
            error-free, uninterrupted or suitable for every purpose.
            Nothing in these terms limits rights that cannot legally be
            excluded.
          </p>
        </section>

        <section>
          <h2>8. Changes to these terms</h2>
          <p>
            These terms may change as DrawEgg develops. The updated date at
            the top of this page will show when the latest version was
            published. Continued use after a change means you accept the
            updated terms, to the extent permitted by law.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            For questions about these terms, contact the DrawEgg project
            owner using the contact method published on the official website.
            Add a monitored contact email before publishing this page.
          </p>
        </section>

        <div className="legal-notice">
          These are starter terms for the project, not legal advice. Have them
          reviewed for your business, jurisdiction and actual service model
          before public launch.
        </div>
      </article>
      <footer className="legal-footer">
        <span>DrawEgg · Make ideas visible.</span>
        <button type="button" onClick={() => onNavigate('privacy')}>
          Privacy Policy
        </button>
        <button type="button" onClick={() => onNavigate('terms')}>
          Terms of Service
        </button>
        <button type="button" onClick={() => onNavigate('about')}>
          About DrawEgg
        </button>
      </footer>
    </main>
  );
}
