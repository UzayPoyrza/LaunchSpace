import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import './Framer.css';
import 'asciinema-player/dist/bundle/asciinema-player.css';

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Text Rotator ─── */
const TextRotator: React.FC<{ words: string[]; interval?: number }> = ({ words, interval = 3000 }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  return (
    <span className="nitro-rotator">
      <AnimatePresence mode="wait">
        <motion.span key={words[index]} className="nitro-rotator__word" initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.5, ease }}>
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ─── Icons ─── */
const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="20" height="20"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
);

const socialIcons: Record<string, React.FC> = { github: GithubIcon, linkedin: LinkedInIcon, x: TwitterIcon, email: MailIcon };
const socialLinks = [
  { platform: 'github', handle: '@launchspace', url: 'https://github.com/launchspace' },
  { platform: 'linkedin', handle: 'LaunchSpace LLC', url: 'https://linkedin.com/company/launchspace' },
  { platform: 'x', handle: '@launchspace', url: 'https://x.com/launchspace' },
  { platform: 'email', handle: 'contact@launchspace.org', url: 'mailto:contact@launchspace.org' },
];

/* ─── Phone Mockup ─── */
const PhoneMockup: React.FC<{ screenshot: string; title: string }> = ({ screenshot, title }) => (
  <div className="phone-mockup">
    <div className="phone-mockup__buttons">
      <div className="phone-mockup__btn phone-mockup__btn--1" />
      <div className="phone-mockup__btn phone-mockup__btn--2" />
      <div className="phone-mockup__btn phone-mockup__btn--3" />
      <div className="phone-mockup__btn phone-mockup__btn--r" />
    </div>
    <div className="phone-mockup__frame">
      <img src={screenshot} alt={title} className="phone-mockup__screen" draggable={false} />
    </div>
  </div>
);

/* ─── Phone Showcase (3 phones with hover) ─── */
const PhoneShowcase: React.FC<{ screenshots: string[]; title: string }> = ({ screenshots, title }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [small, setSmall] = useState(window.innerWidth <= 571);

  useEffect(() => {
    const fn = () => setSmall(window.innerWidth <= 571);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const phones = small
    ? [
        { img: screenshots[1] || screenshots[0], rotate: -8, x: -50, z: 1, w: 120, wHover: 150, delay: '0.15s' },
        { img: screenshots[0],                    rotate: 0,  x: 0,   z: 10, w: 145, wHover: 175, delay: '0s' },
        { img: screenshots[2] || screenshots[0], rotate: 8,  x: 50,  z: 1, w: 120, wHover: 150, delay: '0.2s' },
      ]
    : [
        { img: screenshots[1] || screenshots[0], rotate: -8, x: -75, z: 1, w: 179, wHover: 240, delay: '0.15s' },
        { img: screenshots[0],                    rotate: 0,  x: 0,   z: 10, w: 210, wHover: 260, delay: '0s' },
        { img: screenshots[2] || screenshots[0], rotate: 8,  x: 75,  z: 1, w: 179, wHover: 240, delay: '0.2s' },
      ];

  return (
    <div ref={ref} className="phone-showcase" onMouseLeave={() => setHovered(null)}>
      {phones.map((phone, i) => {
        const isActive = hovered === i;
        const isDimmed = hovered !== null && !isActive;
        const currentW = isActive ? phone.wHover : phone.w;
        return (
          <div key={i} className="phone-showcase__slot" style={{
            left: `calc(50% + ${phone.x}px - ${currentW / 2}px)`,
            zIndex: isActive ? 20 : phone.z,
            transition: 'left 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            <div className="phone-showcase__phone" style={{
              width: currentW,
              opacity: !inView ? 0 : isDimmed ? 0.5 : 1,
              transform: !isActive && phone.rotate !== 0 ? `rotate(${phone.rotate}deg)` : 'none',
              transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }} onMouseEnter={() => setHovered(i)}>
              <PhoneMockup screenshot={phone.img} title={title} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ─── Web Showcase (browser with auto-cycling) ─── */
const WebShowcase: React.FC<{ screenshots: string[]; title: string; url?: string; pages?: { label: string; path: string }[] }> = ({ screenshots, title, url, pages: pagesList }) => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const pages = pagesList || screenshots.map((_, i) => ({ label: `Page ${i + 1}`, path: '' }));

  useEffect(() => {
    if (hovered || screenshots.length <= 1) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % pages.length), 4000);
    return () => clearInterval(timer);
  }, [hovered, pages.length, screenshots.length]);

  const go = (dir: number) => setCurrent((p) => (p + dir + pages.length) % pages.length);

  return (
    <div className="web-showcase"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="web-showcase__chrome">
        <div className="web-showcase__bar">
          <div className="web-showcase__dots">
            <span className="web-showcase__dot web-showcase__dot--red" />
            <span className="web-showcase__dot web-showcase__dot--yellow" />
            <span className="web-showcase__dot web-showcase__dot--green" />
          </div>
          {url && <div className="web-showcase__url"><span>{url}{pages[current]?.path || ''}</span></div>}
        </div>
        <div className="web-showcase__viewport">
          {screenshots.map((src, i) => (
            <img key={i} src={src} alt={`${title} ${pages[i]?.label || ''}`} className="web-showcase__page" style={{ opacity: i === current ? 1 : 0 }} draggable={false} />
          ))}
          {screenshots.length > 1 && <>
            <button className="web-showcase__arrow web-showcase__arrow--left" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button className="web-showcase__arrow web-showcase__arrow--right" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </>}
        </div>
      </div>
    </div>
  );
};

/* ─── Terminal Showcase (asciinema player) ─── */
const TerminalShowcase: React.FC<{ title: string; castFile: string }> = ({ title, castFile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import('asciinema-player').then((AsciinemaPlayer) => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = '';
      AsciinemaPlayer.create(castFile, containerRef.current, {
        autoPlay: true,
        loop: true,
        speed: 1.5,
        idleTimeLimit: 2,
        fit: 'width',
        terminalFontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
      });
      setReady(true);
    });
  }, [castFile]);

  // Scale the terminal to fit when the card is short
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const check = () => {
      const parent = el.closest('.nitro-project-card__image') as HTMLElement;
      if (!parent) return;
      const available = parent.clientHeight;
      const natural = el.scrollHeight;
      setScale(natural > available ? available / natural : 1);
    };
    const ro = new ResizeObserver(check);
    ro.observe(el);
    if (el.closest('.nitro-project-card__image')) ro.observe(el.closest('.nitro-project-card__image')!);
    return () => ro.disconnect();
  }, [ready]);

  return (
    <div className="terminal-showcase" ref={wrapRef} style={{ transform: scale < 1 ? `scale(${scale})` : undefined, transformOrigin: 'top center' }} onClick={(e) => e.stopPropagation()}>
      <div className="terminal-showcase__chrome">
        <div className="terminal-showcase__bar">
          <div className="web-showcase__dots">
            <span className="web-showcase__dot web-showcase__dot--red" />
            <span className="web-showcase__dot web-showcase__dot--yellow" />
            <span className="web-showcase__dot web-showcase__dot--green" />
          </div>
          <span className="terminal-showcase__title">{title.toLowerCase()} — ~/competitive</span>
        </div>
        <div className="terminal-showcase__content" ref={containerRef} />
      </div>
    </div>
  );
};

/* ─── data ─── */
const projects = [
  { year: '2024', cat: 'Wellness · iOS', name: 'Neurotype', bg: '#7C3AED', textColor: '#fff', dividerColor: 'rgba(255,255,255,0.2)', linkColor: '#c4b5fd', showcase: 'phone' as const, screenshots: ['/images/neurotype-screen.png', '/images/projects/neurotype_progress.png', '/images/projects/neurotype_session.png'], desc: 'A science-based meditation app designed to help neurodivergent people. Grounded in research, shaped by real needs.', url: 'https://neurotypeapp.com' },
  { year: '2024', cat: 'Aviation · iOS', name: 'Volo', bg: '#0284C7', textColor: '#fff', dividerColor: 'rgba(255,255,255,0.2)', linkColor: '#7dd3fc', showcase: 'phone' as const, screenshots: ['/images/volo-screen.png', '/images/projects/volo_ops.png', '/images/projects/volo_nat.png'], desc: 'Your pilot companion & toolbox. Essential tools and resources for pilots, all in one app.', url: 'https://volopilot.app' },
  { year: '2025', cat: 'AI · Web', name: 'Incraft', bg: '#EA580C', textColor: '#fff', dividerColor: 'rgba(255,255,255,0.2)', linkColor: '#fdba74', showcase: 'web' as const, screenshots: ['/images/incraft-screen.png', '/images/projects/incraft_create.png', '/images/projects/incraft_studio.png'], webPages: [{ label: 'Home', path: '' }, { label: 'Create', path: '/create' }, { label: 'Studio', path: '/studio' }], desc: 'Generate studio-quality guided meditation in one prompt. Natural voice narration, timed pauses, tailored scripts.', url: 'https://incraft.io' },
  { year: '2025', cat: 'Education · CLI', name: 'Myro', bg: '#059669', textColor: '#fff', dividerColor: 'rgba(255,255,255,0.2)', linkColor: '#6ee7b7', showcase: 'terminal' as const, screenshots: [], castFile: '/recordings/myro.cast', desc: 'An adaptive competitive programming trainer. The shortest path to red.', url: 'https://myro.coach' },
];

const services = ['WEB APPS', 'MOBILE', 'AI / ML', 'API DESIGN', 'UI / UX', 'CLOUD', 'CONSULTING', 'PROTOTYPING'];

/* ─── Project Card ─── */
const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

const ProjectCard: React.FC<{ p: typeof projects[0]; variant?: 'stack' | 'list' }> = ({ p, variant = 'stack' }) => (
  <div
    className={`nitro-project-card ${variant === 'list' ? 'nitro-project-card--list' : ''}`}
    style={{ backgroundColor: p.bg, color: p.textColor }}
    onClick={() => openUrl(p.url)}
  >
    <div className="nitro-project-card__top">
      <div className="nitro-project-card__meta">
        <span>{p.year}</span>
        <span>{p.cat}</span>
      </div>
      <div className="nitro-project-card__divider" style={{ backgroundColor: p.dividerColor }} />
      <div className="nitro-project-card__title-row">
        <h2 className="nitro-project-card__name">{p.name} <span className="nitro-project-card__dot">·</span> <span className="nitro-project-card__url" style={{ color: p.linkColor }}>{p.url.replace('https://', '')}</span></h2>
        <ArrowIcon className="nitro-project-card__arrow" />
      </div>
    </div>
    <div className="nitro-project-card__image">
      {p.showcase === 'phone' && <PhoneShowcase screenshots={p.screenshots} title={p.name} />}
      {p.showcase === 'web' && <WebShowcase screenshots={p.screenshots} title={p.name} url={p.url.replace('https://', '')} pages={(p as any).webPages} />}
      {p.showcase === 'terminal' && <TerminalShowcase title={p.name} castFile={(p as any).castFile || ''} />}
    </div>
  </div>
);

/* ═══════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════ */
const HomePage: React.FC = () => (
  <>
    <section className="nitro-hero">
      <div className="nitro-hero__glow" />
      <div className="nitro-hero__inner">
        <motion.div className="nitro-hero__top-meta" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease }}>
          <p className="nitro-hero__greeting">welcome to launchspace</p>
          <p className="nitro-hero__availability"><span className="nitro-dot" /> open for projects</p>
        </motion.div>
        <motion.div className="nitro-hero__heading-wrap" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }}>
          <h1 className="nitro-hero__headline">
            <span className="nitro-hero__headline-dim">we build apps from</span>
            <br /><span className="nitro-hero__headline-dim">the ground up with</span>
            <br /><TextRotator words={['clean design', 'real impact', 'fast shipping', 'fresh ideas']} interval={3000} />
          </h1>
        </motion.div>
      </div>
    </section>

    <section className="nitro-section nitro-section--projects" id="projects">
      <div className="nitro-projects-stack">
        {projects.map((p, i) => (
          <motion.div key={p.name} className="nitro-project-sticky-wrap" style={{ zIndex: i + 1, top: 100 + i * 15 }} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}>
            <ProjectCard p={p} />
          </motion.div>
        ))}
      </div>
    </section>

    <section className="nitro-section nitro-section--about" id="about">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }}>
        <div className="nitro-label-row">
          <span className="nitro-label">.about</span>
          <div className="nitro-label-line" />
        </div>
        <h3 className="nitro-about-text">
          solo developer building apps that haven't been done before — sometimes independently, sometimes collaborating with engineers and people from different fields
        </h3>
        <div className="nitro-about-cta">
          <Link to="/framer/projects" className="nitro-contact-btn">see our work <ArrowIcon className="nitro-contact-btn__icon" /></Link>
        </div>
      </motion.div>
    </section>

    <section className="nitro-section nitro-section--contact nitro-section--contact-centered" id="contact">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }}>
        <div className="nitro-label-row">
          <span className="nitro-label">.say hello</span>
          <div className="nitro-label-line" />
        </div>
        <h2 className="nitro-contact-heading">shoot us a message about anything — feedback, ideas, or collaboration</h2>
        <div className="nitro-contact-btn-wrap">
          <Link to="/framer/contact" className="nitro-contact-btn">contact <ArrowIcon className="nitro-contact-btn__icon" /></Link>
        </div>
      </motion.div>
    </section>
  </>
);

/* ═══════════════════════════════════════
   PROJECTS PAGE
   ═══════════════════════════════════════ */
const ProjectsPage: React.FC = () => (
  <div className="nitro-subpage">
    <motion.div className="nitro-subpage__header" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
      <h1 className="nitro-subpage__title">our work</h1>
      <p className="nitro-subpage__desc">
        we build apps that solve real problems — from wellness and aviation to AI and competitive programming.
      </p>
    </motion.div>

    {/* Services */}
    <motion.div className="nitro-clients" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3, ease }}>
      <div className="nitro-label-row">
        <span className="nitro-label">.what we do</span>
        <div className="nitro-label-line" />
      </div>
      <div className="nitro-clients__row">
        {services.map((s) => (
          <span key={s} className="nitro-clients__logo">{s}</span>
        ))}
      </div>
    </motion.div>

    {/* Project cards with descriptions */}
    <div className="nitro-projects-detailed">
      {projects.map((p, i) => (
        <motion.div key={p.name} className="nitro-project-detailed" style={{ zIndex: i + 1 }} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: i * 0.08, ease }}>
          <div className="nitro-project-detailed__card">
            <ProjectCard p={p} variant="list" />
          </div>
          <div className="nitro-project-detailed__info" style={{ color: p.bg }}>
            <p className="nitro-project-detailed__desc">{p.desc}</p>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="nitro-project-detailed__link" style={{ color: p.bg }}>
              visit site <ArrowIcon className="nitro-project-detailed__link-icon" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Bottom CTA */}
    <motion.section className="nitro-section nitro-section--contact" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
      <div className="nitro-label-row">
        <span className="nitro-label">.say hello</span>
        <div className="nitro-label-line" />
      </div>
      <h2 className="nitro-contact-heading">shoot us a message about anything — feedback, ideas, or collaboration</h2>
      <div className="nitro-contact-btn-wrap">
        <Link to="/framer/contact" className="nitro-contact-btn">contact us <ArrowIcon className="nitro-contact-btn__icon" /></Link>
      </div>
    </motion.section>
  </div>
);

/* ═══════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════ */
const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:contact@launchspace.org?subject=Project inquiry from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.name} (${form.email})`;
  };

  return (
    <div className="nitro-subpage">
      <motion.div className="nitro-subpage__header" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
        <h1 className="nitro-subpage__title">say hello</h1>
        <p className="nitro-subpage__desc">
          drop us a line about anything — app feedback, collaboration, or whatever's on your mind.
        </p>
      </motion.div>

      <div className="nitro-contact-grid">
        <motion.form className="nitro-contact-form" onSubmit={handleSubmit} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease }}>
          <div className="nitro-form-field">
            <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="nitro-form-field">
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="nitro-form-field nitro-form-field--textarea">
            <textarea placeholder="Tell us about your project" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          </div>
          <button type="submit" className="nitro-form-submit">Send message</button>
        </motion.form>

        <motion.div className="nitro-contact-socials" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease }}>
          {socialLinks.map((s) => {
            const Icon = socialIcons[s.platform];
            return (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="nitro-social-link">
                <span className="nitro-social-link__icon-wrap"><Icon /></span>
                <div className="nitro-social-link__text">
                  <span className="nitro-social-link__name">{s.platform}</span>
                  <span className="nitro-social-link__handle">{s.handle}</span>
                </div>
              </a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════ */
const NitroFooter: React.FC = () => (
  <footer className="nitro-footer">
    <div className="nitro-footer__inner">
      <div className="nitro-footer__links">
        <Link to="/framer">home</Link>
        <Link to="/framer/projects">projects</Link>
        <Link to="/framer/contact">contact</Link>
      </div>
      <span className="nitro-footer__credit">© 2024 LaunchSpace LLC</span>
    </div>
  </footer>
);

/* ═══════════════════════════════════════
   NAV LINK (stable identity — must be outside Framer to avoid remounts)
   ═══════════════════════════════════════ */
const NavLink: React.FC<{ to?: string; onClick?: () => void; onNavigate?: () => void; active?: boolean; children: React.ReactNode }> = ({ to, onClick, onNavigate, active, children }) => {
  if (to) return <Link to={to} className={active ? 'active' : ''} onClick={onNavigate}>{children}</Link>;
  return <button className={active ? 'active' : ''} onClick={onClick}>{children}</button>;
};

/* ═══════════════════════════════════════
   MAIN SHELL
   ═══════════════════════════════════════ */
const Framer: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop() || '';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.classList.add('nitro-body');
    return () => document.body.classList.remove('nitro-body');
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  const navContent = (
    <>
      <NavLink to="/framer/projects" active={currentPage === 'projects'} onNavigate={closeMenu}>projects</NavLink>
      <NavLink to="/framer/contact" active={currentPage === 'contact'} onNavigate={closeMenu}>contact</NavLink>
    </>
  );

  return (
    <div className="nitro-page">
      <motion.nav className={`nitro-nav ${scrolled ? 'nitro-nav--scrolled' : ''}`} initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease }}>
        <div className="nitro-nav__inner">
          <Link to="/framer" className="nitro-nav__logo">
            <svg className="nitro-nav__logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1"/>
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
              <circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.8"/>
              <circle cx="16" cy="6" r="1" fill="currentColor" opacity="0.6"/>
              <circle cx="6" cy="16" r="0.8" fill="currentColor" opacity="0.7"/>
            </svg>
            LaunchSpace
          </Link>
          <div className="nitro-nav__links">{navContent}</div>
          <button className={`nitro-hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
        <div className="nitro-progress-bar">
          <motion.div className="nitro-progress-bar__fill" style={{ scaleX: progressScaleX }} />
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="nitro-mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, ease }}>
            {navContent}
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      <NitroFooter />
    </div>
  );
};

export default Framer;
