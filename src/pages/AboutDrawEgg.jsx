import React from "react";
import { Code2, ExternalLink } from "lucide-react";
import "./LegalPages.css";

export default function AboutDrawEgg({ onBack, onNavigate }) {
  return (
    <main className="legal-page about-page">
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
        <span className="legal-eyebrow">MEET THE PROJECT</span>
        <h1>Ideas start with a sketch.</h1>
        <p className="legal-lead">
          DrawEgg is a simple drawing and idea board for turning thoughts
          into sketches, diagrams and plans.
        </p>

        <div className="about-highlight">
          <span className="about-mark">◯</span>
          <div>
            <strong>DrawEgg</strong>
            <span>Make ideas visible.</span>
          </div>
        </div>

        <section className="about-creator">
          <span className="legal-eyebrow">THE CREATOR</span>
          <h2>Built with curiosity.</h2>
          <p>
            DrawEgg is an independent project built to make sketching ideas,
            planning systems and explaining concepts feel simple.
          </p>

          <a
            className="about-github-card"
            href="https://github.com/eateggs0989"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="about-github-icon">
              <Code2 size={25} />
            </span>
            <span className="about-github-copy">
              <strong>View on GitHub</strong>
              <small>github.com/eateggs0989</small>
            </span>
            <ExternalLink className="about-github-external" size={18} />
          </a>
        </section>

        <section>
          <h2>Why DrawEgg?</h2>
          <p>
            Sometimes the easiest way to explain an idea is to draw it.
            DrawEgg is being built to make that process feel quick,
            approachable and uncomplicated.
          </p>
        </section>

        <section>
          <h2>What you can do</h2>
          <ul>
            <li>Sketch ideas freely with drawing tools.</li>
            <li>Create simple shapes and visual diagrams.</li>
            <li>Add text and organize concepts on a paper-like board.</li>
            <li>Use suggested symbols for common ideas and systems.</li>
            <li>Export your board as a PNG image.</li>
          </ul>
        </section>

        <section>
          <h2>Designed to stay simple</h2>
          <p>
            The goal is a clean workspace that keeps the focus on your ideas,
            whether you are planning a startup, mapping a system, explaining
            a workflow or simply sketching something for fun.
          </p>
        </section>

        <section>
          <h2>Still growing</h2>
          <p>
            DrawEgg is an evolving project. Features and the way the app
            handles information may change as development continues. Check
            the Privacy Policy and Terms of Service for the current project
            information.
          </p>
        </section>

        <div className="about-cta">
          <h2>Have an idea?</h2>
          <p>Open the board and start sketching.</p>
          <button
            type="button"
            className="legal-primary-button"
            onClick={onBack}
          >
            Open DrawEgg
          </button>
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
