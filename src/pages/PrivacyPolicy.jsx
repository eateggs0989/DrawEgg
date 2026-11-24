import React from "react";
import "./LegalPages.css";

export default function PrivacyPolicy({ onBack, onNavigate }) {
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
        <h1>Privacy Policy</h1>
        <p className="legal-lead">
          Your ideas are personal. This page explains how DrawEgg is designed
          to handle information when you use the drawing board.
        </p>
        <p className="legal-updated">Last updated: November 25, 2026</p>

        <section>
          <h2>1. About DrawEgg</h2>
          <p>
            DrawEgg is a browser-based drawing and idea-board application.
            It is designed to let you create diagrams, sketches and notes
            directly in your browser.
          </p>
        </section>

        <section>
          <h2>2. Your drawings and files</h2>
          <p>
            Drawings you create are processed in the browser. When you choose
            Download PNG, the app creates an image for you to save. This
            version of DrawEgg does not provide an account-based cloud library
            or automatic server sync unless those features are added and
            clearly described in the app.
          </p>
          <p>
            If you use browser storage, such as local storage, to retain
            settings or work, that information stays in the browser profile
            on your device and may be cleared through your browser settings.
          </p>
        </section>

        <section>
          <h2>3. Information handled by the website</h2>
          <p>
            The DrawEgg app may process information needed to display the
            website and operate its features, such as your selected tools,
            colors, text, canvas dimensions and drawing data. These are used
            to provide the features you choose.
          </p>
          <p>
            The website's hosting provider may also receive basic technical
            information when your browser requests the site, such as an
            IP address, browser details and request time, according to that
            provider's own policies.
          </p>
        </section>

        <section>
          <h2>4. Cookies, analytics and third-party services</h2>
          <p>
            Do not assume that DrawEgg uses analytics, advertising cookies,
            or third-party tracking unless those tools are actually added.
            If analytics, embedded services, advertising, cloud storage or
            other third-party integrations are introduced, this policy should
            be updated to identify them and explain what information they
            receive.
          </p>
        </section>

        <section>
          <h2>5. Sharing and exporting</h2>
          <p>
            DrawEgg does not publish your drawings just because you create
            them. You control whether to download an image or share it
            yourself. Once you share a file with another service or person,
            their privacy practices and handling of that file apply.
          </p>
        </section>

        <section>
          <h2>6. Children's privacy</h2>
          <p>
            DrawEgg is a general-purpose creative tool and is not designed
            to collect personal information from children. If you believe
            personal information has been submitted to the project, contact
            the project owner so the situation can be reviewed.
          </p>
        </section>

        <section>
          <h2>7. Changes to this policy</h2>
          <p>
            This policy may be updated when DrawEgg's features, hosting or
            data practices change. The updated date at the top of this page
            will be changed when a revision is published.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            For privacy questions, contact the DrawEgg project owner using
            the contact method published on the official DrawEgg website.
            Add a monitored contact email here before publishing this page.
          </p>
        </section>

        <div className="legal-notice">
          <strong>Important:</strong> This is a starter policy for the current
          project, not legal advice. Review it against your actual hosting,
          analytics, storage and third-party services before publishing.
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
