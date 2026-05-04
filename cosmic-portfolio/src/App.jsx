import React, { useState } from 'react';

function App() {
  // State for the OmniStream API Demo
  const [topic, setTopic] = useState('');
  const [apiStatus, setApiStatus] = useState('idle');

  // State for the Contact Form
  const [formStatus, setFormStatus] = useState('idle');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic) return;
    setApiStatus('loading');
    try {
      // Pointing to your local FastAPI server (Update this to your Render URL later!)
      const response = await fetch('http://127.0.0.1:8000/api/omnistream/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, style: 'faceless', client_email: 'demo@website.com' })
      });
      const data = await response.json();
      if(data.status === 'success') setApiStatus('success');
      else setApiStatus('error');
    } catch (error) {
      setApiStatus('error');
    }
    setTimeout(() => setApiStatus('idle'), 5000); // Reset UI after 5 seconds
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    const form = e.target;
    const data = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 8000); // Reset after 8 seconds
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-darker text-slate-300 font-sans selection:bg-cosmic-accent selection:text-white">
      
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 bg-cosmic-darker/80 backdrop-blur-md fixed w-full top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-white font-bold text-xl tracking-tight">
            Cosmic IT<span className="text-cosmic-accent">.</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-start justify-center min-h-[80vh]">
        <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs font-mono text-cosmic-accent mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cosmic-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cosmic-accent"></span>
          </span>
          <span>Accepting New Clients</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 max-w-4xl">
          We build systems that run your business on <span className="text-transparent bg-clip-text bg-linear-to-r from-cosmic-accent to-blue-500">autopilot.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          A full-stack architecture firm specializing in custom mobile applications, zero-overhead web infrastructure, and AI-driven workflow orchestration.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="#solutions" className="bg-white text-cosmic-darker text-center font-semibold px-6 py-3 rounded-md hover:bg-slate-200 transition-all cursor-pointer">
            View Solution Packages
          </a>
          <a href="#capabilities" className="bg-transparent border border-slate-700 text-center text-white font-semibold px-6 py-3 rounded-md hover:border-slate-500 hover:bg-slate-800 transition-all cursor-pointer">
            Explore Capabilities
          </a>
        </div>
      </main>

      {/* Capabilities Grid - Flexing the Tech Skills */}
      <section id="capabilities" className="py-24 bg-slate-900/20 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Core Capabilities</h2>
            <p className="text-slate-400 max-w-2xl">We don't just write code; we architect scalable ecosystems. Here is the technical foundation of our work.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Capability 1 */}
            <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cosmic-accent/50 transition-colors group">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 text-cosmic-accent group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Full-Stack Web Engineering</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Custom, high-performance web applications built with modern frameworks (React, Python, Node). We build internal dashboards and scalable SaaS products.</p>
            </div>

            {/* Capability 2 */}
            <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cosmic-accent/50 transition-colors group">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 text-cosmic-accent group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Native & Cross-Platform Mobile</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Client-facing iOS and Android applications developed in Flutter. We turn your services into accessible, high-retention products living in your customer's pocket.</p>
            </div>

            {/* Capability 3 */}
            <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cosmic-accent/50 transition-colors group">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 text-cosmic-accent group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Technical SEO & Visibility</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Code-level search engine optimization. We optimize load times, semantic structure, and metadata to ensure your web properties dominate search rankings.</p>
            </div>

            {/* Capability 4 */}
            <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cosmic-accent/50 transition-colors group">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 text-cosmic-accent group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI & Serverless Automation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Replacing repetitive tasks with intelligent logic. We integrate LLMs and API webhooks to build zero-maintenance automated workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Showcase - OmniStream AI */}
      <section id="omnistream" className="py-24 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Text Content */}
            <div className="lg:w-1/2">
              <div className="inline-block bg-cosmic-accent/10 text-cosmic-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-cosmic-accent/20">
                Featured Case Study
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                OmniStream AI <span className="text-slate-500 font-light">Command Center</span>
              </h2>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                We built a fully automated, serverless video production engine. Users input a topic, and our custom Python backend orchestrates scriptwriting, voiceover generation, and video stitching using GitHub Actions—all controlled from a sleek frontend interface.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-slate-300"><span className="text-cosmic-accent mr-3">✦</span> Zero-VPS Serverless Architecture</li>
                <li className="flex items-center text-sm text-slate-300"><span className="text-cosmic-accent mr-3">✦</span> Custom Python / FastAPI Backend</li>
                <li className="flex items-center text-sm text-slate-300"><span className="text-cosmic-accent mr-3">✦</span> Fully Automated LLM Workflow</li>
              </ul>
              
              {/* Interactive API Demo */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 max-w-md mb-8">
                <p className="text-xs text-slate-400 font-mono mb-3 uppercase tracking-wider">Test the API directly:</p>
                <form onSubmit={handleGenerate} className="flex space-x-2">
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic (e.g., Stoicism)" 
                    className="grow bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-cosmic-accent"
                    disabled={apiStatus === 'loading' || apiStatus === 'success'}
                  />
                  <button 
                    type="submit" 
                    disabled={apiStatus === 'loading' || apiStatus === 'success'}
                    className="bg-cosmic-accent text-cosmic-darker font-bold px-4 py-2 rounded-md hover:bg-cosmic-glow transition-colors text-sm disabled:opacity-50 cursor-pointer"
                  >
                    {apiStatus === 'loading' ? 'Igniting...' : apiStatus === 'success' ? 'Sent!' : 'Generate'}
                  </button>
                </form>
                {apiStatus === 'success' && <p className="text-cosmic-accent text-xs mt-2 font-mono">200 OK: Payload delivered to Python Backend.</p>}
                {apiStatus === 'error' && <p className="text-red-400 text-xs mt-2 font-mono">Error: Make sure your local Python API is running.</p>}
              </div>
            </div>

            {/* Screenshot Mockup Container */}
            <div className="lg:w-1/2 w-full">
              <div className="rounded-xl border border-slate-700 bg-slate-900 shadow-2xl shadow-cosmic-accent/10 overflow-hidden transform transition-transform hover:scale-[1.02] duration-300">
                {/* Fake Browser Header */}
                <div className="bg-slate-800 px-4 py-3 flex items-center border-b border-slate-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="mx-auto bg-slate-900 rounded text-[10px] text-slate-500 px-4 py-1 font-mono">
                    omnistream-ai.cosmic.dev
                  </div>
                </div>
                
                {/* App Content Placeholder */}
                <div className="relative aspect-video bg-cosmic-darker flex flex-col justify-center items-center text-center group cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-slate-800/50 to-slate-900/50 flex flex-col items-center justify-center p-6">
                    <svg className="w-16 h-16 text-slate-600 mb-4 group-hover:text-cosmic-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <p className="text-slate-400 font-mono text-sm">[ Drop OmniStream AI Screenshot Here ]</p>
                    <p className="text-slate-500 text-xs mt-2">1920x1080 recommended</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Solution Packages - Selling the Outcome */}
      <section id="solutions" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">High-Impact Solutions</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Stop buying disjointed code. We package our capabilities into comprehensive solutions that solve specific business bottlenecks.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Package 1 */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-cosmic-dark flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">The Digital Engine</h3>
              <p className="text-slate-400 text-sm mb-6 h-12">For businesses that need to dominate their local market search and capture leads.</p>
              <ul className="space-y-4 mb-8 grow text-sm">
                <li className="flex items-start"><span className="text-cosmic-accent mr-2">✓</span> Custom Web Application</li>
                <li className="flex items-start"><span className="text-cosmic-accent mr-2">✓</span> Deep Technical SEO Optimization</li>
                <li className="flex items-start"><span className="text-cosmic-accent mr-2">✓</span> Automated Lead Capture Forms</li>
              </ul>
              <a href="#contact" className="text-center w-full py-3 rounded border border-slate-700 hover:bg-slate-800 transition-colors font-semibold block">Discuss Project</a>
            </div>

            {/* Package 2 (Highlighted) */}
            <div className="p-8 rounded-2xl border border-cosmic-accent bg-slate-900/80 flex flex-col relative transform lg:-translate-y-4 shadow-2xl shadow-cosmic-accent/10">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cosmic-accent text-cosmic-darker px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Most Requested
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">The Automated App</h3>
              <p className="text-slate-400 text-sm mb-6 h-12">Turn your service into a mobile app backed by an automated workflow.</p>
              <ul className="space-y-4 mb-8 grow text-sm">
                <li className="flex items-start"><span className="text-cosmic-accent mr-2">✓</span> iOS & Android App Development</li>
                <li className="flex items-start"><span className="text-cosmic-accent mr-2">✓</span> Custom Business Logic Backend</li>
                <li className="flex items-start"><span className="text-cosmic-accent mr-2">✓</span> API Integrations (Payments, CRM)</li>
                <li className="flex items-start"><span className="text-cosmic-accent mr-2">✓</span> Zero-Overhead Hosting Setup</li>
              </ul>
              <a href="#contact" className="text-center w-full py-3 rounded bg-cosmic-accent text-cosmic-darker hover:bg-cosmic-glow transition-colors font-bold block">Discuss Project</a>
            </div>

            {/* Package 3 */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-cosmic-dark flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">The AI Ecosystem</h3>
              <p className="text-slate-400 text-sm mb-6 h-12">Enterprise-grade custom software and AI agents for internal operations.</p>
              <ul className="space-y-4 mb-8 grow text-sm">
                <li className="flex items-start"><span className="text-cosmic-accent mr-2">✓</span> Custom Internal Dashboard</li>
                <li className="flex items-start"><span className="text-cosmic-accent mr-2">✓</span> Multi-step AI Automation</li>
                <li className="flex items-start"><span className="text-cosmic-accent mr-2">✓</span> Custom Python Data Pipelines</li>
              </ul>
              <a href="#contact" className="text-center w-full py-3 rounded border border-slate-700 hover:bg-slate-800 transition-colors font-semibold block">Discuss Project</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Serverless Form */}
      <section id="contact" className="py-24 border-t border-slate-800/50 bg-slate-900/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Info */}
            <div className="lg:w-1/3">
              <div className="inline-block bg-cosmic-accent/10 text-cosmic-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-cosmic-accent/20">
                Initiate Project
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Build It.</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Ready to move past generic templates and build a system that actually scales your business? Drop your project details here.
              </p>
              <div className="space-y-6">
                <div className="flex items-center text-slate-300">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-4 border border-slate-700 text-cosmic-accent">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <span className="font-mono text-sm">hello@cosmicit.dev</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-4 border border-slate-700 text-cosmic-accent">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <span className="font-mono text-sm">Avg response: 24 hours</span>
                </div>
              </div>
            </div>

            {/* Form Elements */}
            <div className="lg:w-2/3">
              {formStatus === 'success' ? (
                <div className="bg-cosmic-accent/10 border border-cosmic-accent rounded-xl p-8 text-center h-full flex flex-col items-center justify-center">
                  <svg className="w-16 h-16 text-cosmic-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <h3 className="text-2xl font-bold text-white mb-2">Request Received</h3>
                  <p className="text-slate-400">Your architecture request has been sent successfully. We will be in touch within 24 hours to discuss the next steps.</p>
                </div>
              ) : (
                <form action="https://formspree.io/f/xpqbdzwp" method="POST" onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-400">Name</label>
                      <input type="text" id="name" name="name" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-400">Work Email</label>
                      <input type="email" id="email" name="email" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent transition-colors" placeholder="john@company.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="project" className="text-sm font-medium text-slate-400">Project Type</label>
                    <div className="relative">
                      <select id="project" name="project" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent transition-colors appearance-none cursor-pointer">
                        <option value="app">The Automated App Package</option>
                        <option value="engine">The Digital Engine Package</option>
                        <option value="ai">The AI Ecosystem Package</option>
                        <option value="custom">Custom Architecture / Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-400">Project Details</label>
                    <textarea id="message" name="message" rows="5" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent transition-colors resize-none" placeholder="Tell us about the bottleneck you're trying to solve..."></textarea>
                  </div>

                  <div className="flex items-center justify-between">
                    <button type="submit" disabled={formStatus === 'loading'} className="bg-cosmic-accent text-cosmic-darker font-bold px-8 py-4 rounded-lg hover:bg-cosmic-glow transition-colors w-full md:w-auto cursor-pointer disabled:opacity-70 flex justify-center items-center">
                      {formStatus === 'loading' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-cosmic-darker" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Processing...
                        </>
                      ) : 'Submit Architecture Request'}
                    </button>
                    {formStatus === 'error' && <p className="text-red-400 text-sm ml-4 font-mono">Failed to send. Check your connection.</p>}
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-slate-900/30 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-500 text-sm font-mono">
          <p>© {new Date().getFullYear()} Cosmic IT Solutions. Architected with React & Tailwind.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;