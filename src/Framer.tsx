import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './Framer.css';

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
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
);
const TiktokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.27a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.7z"/></svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
);

const socialIcons: Record<string, React.FC> = { twitter: TwitterIcon, instagram: InstagramIcon, tiktok: TiktokIcon, youtube: YoutubeIcon };

/* ─── data ─── */
const projects = [
  { year: '2023', cat: 'Personal Project', name: 'bizz buzz', bg: '#FF6200', textColor: '#000', dividerColor: 'rgba(0,0,0,0.25)', img: 'https://framerusercontent.com/images/cak7U7dY4h898WLby7suvljdOcA.jpg?width=1920&height=1329', desc: 'A social media platform for entrepreneurs to network and collaborate' },
  { year: '2023', cat: 'Branding & Identity', name: 'aquaflow', bg: '#FFFFFF', textColor: '#000', dividerColor: 'rgba(0,0,0,0.25)', img: 'https://framerusercontent.com/images/xKHWSysrgFe1ub1CxmcYLHQdpc.jpg?width=1920&height=1440', desc: 'A bottled water delivery service that sources water from the purest mountain streams' },
  { year: '2023', cat: 'UI/UX', name: 'snackify', bg: '#2E3538', textColor: '#fff', dividerColor: 'rgba(255,255,255,0.15)', img: 'https://framerusercontent.com/images/v2Cxh5gAzf3y5i5rvV7stpdreY.jpg?width=1920&height=1440', desc: 'A healthy snack subscription service that curates personalized snack boxes based on your dietary preferences' },
  { year: '2023', cat: 'Personal Project', name: 'zengo', bg: '#FFDD00', textColor: '#000', dividerColor: 'rgba(0,0,0,0.25)', img: 'https://framerusercontent.com/images/B4iHZ4n8YkDGgjtcjPiGagMwMzA.jpg?width=1920&height=1440', desc: 'A meditation app that uses AI to customize your mindfulness practice and track your progress' },
  { year: '2023', cat: 'Branding & Identity', name: 'roverride', bg: '#333333', textColor: '#fff', dividerColor: 'rgba(255,255,255,0.15)', img: 'https://framerusercontent.com/images/ju62vkEreDoQkpYoSbxnVoVcnzo.jpg?width=1920&height=1440', desc: 'An on-demand dog walking and pet sitting service that connects busy pet owners with trusted local caregivers' },
];

const notes = [
  { title: 'Starting and Growing a Career in Web Design', date: 'Apr 8, 2022' },
  { title: 'Create a Landing Page That Performs Great', date: 'Mar 15, 2022' },
  { title: 'How Can Designers Prepare for the Future?', date: 'Feb 28, 2022' },
];

const clients = ['D7', 'JAZZY SPINS', 'LOCO', 'BYFURA', 'STARLIGHT', 'MOVA', 'APEX', 'DRIFT'];

/* ─── Project Card (shared) ─── */
const ProjectCard: React.FC<{ p: typeof projects[0]; variant?: 'stack' | 'list' }> = ({ p, variant = 'stack' }) => (
  <div className={`nitro-project-card ${variant === 'list' ? 'nitro-project-card--list' : ''}`} style={{ backgroundColor: p.bg, color: p.textColor }}>
    <div className="nitro-project-card__top">
      <div className="nitro-project-card__meta">
        <span>{p.year}</span>
        <span>{p.cat}</span>
      </div>
      <div className="nitro-project-card__divider" style={{ backgroundColor: p.dividerColor }} />
      <div className="nitro-project-card__title-row">
        <h2 className="nitro-project-card__name">{p.name}</h2>
        <ArrowIcon className="nitro-project-card__arrow" />
      </div>
    </div>
    <div className="nitro-project-card__image">
      <img src={p.img} alt={p.name} loading="lazy" decoding="async" />
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
          <p className="nitro-hero__greeting">Hey, I'm Nick</p>
          <p className="nitro-hero__availability"><span className="nitro-dot" /> available for new projects</p>
        </motion.div>
        <motion.div className="nitro-hero__heading-wrap" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }}>
          <h1 className="nitro-hero__headline">
            a product design partner with focus on{' '}
            <TextRotator words={['no-code websites', 'software interfaces']} interval={3000} />
          </h1>
        </motion.div>
      </div>
    </section>

    <section className="nitro-section nitro-section--projects" id="projects">
      <div className="nitro-projects-stack">
        {projects.map((p, i) => (
          <motion.div key={p.name} className="nitro-project-sticky-wrap" style={{ zIndex: i + 1 }} initial={{ opacity: 0, y: 150 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.05, ease }}>
            <ProjectCard p={p} />
          </motion.div>
        ))}
      </div>
    </section>

    <section className="nitro-section nitro-section--about" id="about">
      <div className="nitro-about-grid">
        <motion.div className="nitro-about-text-col" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }}>
          <div className="nitro-label-row">
            <span className="nitro-label">.about</span>
            <div className="nitro-label-line" />
          </div>
          <h3 className="nitro-about-text">
            my craft is building experiences that bring value to people and celebrate function over form. let's hide the ego and give some freedom to creativity and make the first small step changing the world to a better place
          </h3>
          <div className="nitro-about-cta">
            <Link to="/framer/about" className="nitro-contact-btn">about me <ArrowIcon className="nitro-contact-btn__icon" /></Link>
          </div>
        </motion.div>
        <motion.div className="nitro-about-img-col" initial={{ opacity: 0, y: -300, scale: 0.7 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.2, ease }}>
          <img src="https://framerusercontent.com/images/INr3fWPwNzKVuKbZgjxl5xvZaSA.jpg?scale-down-to=1024" alt="Nick" loading="lazy" decoding="async" />
        </motion.div>
      </div>
    </section>

    <section className="nitro-section nitro-section--notes" id="notes">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }}>
        <div className="nitro-label-row">
          <span className="nitro-label">.three latest notes</span>
          <div className="nitro-label-line" />
        </div>
      </motion.div>
      <div className="nitro-notes-list">
        {notes.map((n, i) => (
          <motion.a key={i} href="#" className="nitro-note-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: i * 0.1, ease }}>
            <div className="nitro-note-card__content">
              <h3>{n.title}</h3>
              <span className="nitro-note-date">{n.date}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>

    <section className="nitro-section nitro-section--contact" id="contact">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }}>
        <div className="nitro-label-row">
          <span className="nitro-label">.say hello</span>
          <div className="nitro-label-line" />
        </div>
        <h2 className="nitro-contact-heading">i'm open for freelance projects, feel free to email me to see how can we collaborate</h2>
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
      <h1 className="nitro-subpage__title">projects</h1>
      <p className="nitro-subpage__desc">
        I help startups and series A—D teams to establish a strong connection between their product and customers
      </p>
    </motion.div>

    {/* Clients */}
    <motion.div className="nitro-clients" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3, ease }}>
      <div className="nitro-label-row">
        <span className="nitro-label">.clients</span>
        <div className="nitro-label-line" />
      </div>
      <div className="nitro-clients__row">
        {clients.map((c) => (
          <span key={c} className="nitro-clients__logo">{c}</span>
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
          <div className="nitro-project-detailed__info">
            <p className="nitro-project-detailed__desc">{p.desc}</p>
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
      <h2 className="nitro-contact-heading">i'm open for freelance projects, feel free to email me to see how can we collaborate</h2>
      <div className="nitro-contact-btn-wrap">
        <Link to="/framer/contact" className="nitro-contact-btn">contact me <ArrowIcon className="nitro-contact-btn__icon" /></Link>
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
    window.location.href = `mailto:hello@example.com?subject=Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.name} (${form.email})`;
  };

  return (
    <div className="nitro-subpage">
      <motion.div className="nitro-subpage__header" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
        <h1 className="nitro-subpage__title">say hello</h1>
        <p className="nitro-subpage__desc">
          let's collaborate. feel free to drop me a line about your project or follow me on social networks
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
            <textarea placeholder="Message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          </div>
          <button type="submit" className="nitro-form-submit">Submit</button>
        </motion.form>

        <motion.div className="nitro-contact-socials" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease }}>
          {(['twitter', 'instagram', 'tiktok', 'youtube'] as const).map((s, i) => {
            const Icon = socialIcons[s];
            return (
              <a key={s} href="#" className="nitro-social-link">
                <span className="nitro-social-link__icon-wrap"><Icon /></span>
                <div className="nitro-social-link__text">
                  <span className="nitro-social-link__name">{s}</span>
                  <span className="nitro-social-link__handle">@stfnco</span>
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
      <span className="nitro-footer__credit">
        built with{' '}
        <a href="https://www.framer.com" target="_blank" rel="noopener noreferrer">framer</a>
      </span>
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
  const isHome = location.pathname === '/framer' || location.pathname === '/framer/';
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

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

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
          <Link to="/framer" className="nitro-nav__logo">.nitro</Link>
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
