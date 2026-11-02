import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Cloud, Terminal, CheckCircle2, Copy, Check, FileCode, Layers, ShieldCheck } from 'lucide-react';

export const ProjectGuideModal: React.FC = () => {
  const { isProjectGuideOpen, setIsProjectGuideOpen } = useShop();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isProjectGuideOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display">
                Cloud Computing Project & Netlify Deployment Guide
              </h2>
              <p className="text-xs text-slate-400">
                Documentation & viva preparation for Dhand Stationery frontend portal
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProjectGuideOpen(false)}
            className="text-slate-400 hover:text-white p-2 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Section 1: Project Overview */}
          <section className="bg-amber-50/50 rounded-xl p-4 border border-amber-200/70">
            <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2 mb-1.5">
              <Layers className="w-4 h-4 text-amber-700" />
              Project Architecture: Static Jamstack Cloud Deployment
            </h3>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              This application has been engineered as a pure frontend web application leveraging modern <strong>Jamstack principles</strong> (JavaScript, APIs, Markup). It does not require a bulky SQL database or server runtime to execute, allowing it to be globally distributed over <strong>Content Delivery Network (CDN) Edge nodes</strong> with ultra-low latency and 99.99% uptime.
            </p>
          </section>

          {/* Section 2: Step-by-Step Netlify Deployment */}
          <section>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Cloud className="w-4.5 h-4.5 text-sky-600" />
              How to Deploy on Netlify (2 Easy Methods)
            </h3>

            <div className="space-y-4">
              {/* Method 1: Netlify Drag & Drop */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900 text-sm">
                    Method 1: 1-Click Drag & Drop via Netlify Drop (Fastest for College Submissions)
                  </h4>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Recommended
                  </span>
                </div>
                <ol className="list-decimal list-inside text-xs text-slate-600 space-y-2 leading-relaxed">
                  <li>
                    Run the build command locally: <code className="bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[11px]">npm run build</code>
                  </li>
                  <li>
                    This generates a production-ready <code className="bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[11px]">dist/</code> directory containing compiled HTML, CSS, JavaScript, and assets.
                  </li>
                  <li>
                    Open <strong>app.netlify.com/drop</strong> in your browser (log in with your student GitHub or email).
                  </li>
                  <li>
                    Drag and drop the entire <code className="bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[11px]">dist</code> folder into the Netlify Drop area.
                  </li>
                  <li>
                    Netlify will instantly provision an active live URL (e.g., <code className="text-amber-800 font-mono">https://dhand-stationery.netlify.app</code>).
                  </li>
                </ol>
              </div>

              {/* Method 2: Git Repository Integration */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60">
                <h4 className="font-semibold text-slate-900 text-sm mb-2">
                  Method 2: Continuous Deployment via GitHub Repository
                </h4>
                <div className="text-xs text-slate-600 space-y-2">
                  <p>When connecting this repository to Netlify via GitHub, use the pre-configured settings:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-slate-200 font-mono text-[11px]">
                    <div>
                      <span className="text-slate-400 block font-sans text-[10px]">Build Command:</span>
                      <span className="text-slate-900 font-bold">npm run build</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-sans text-[10px]">Publish Directory:</span>
                      <span className="text-slate-900 font-bold">dist</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    The included <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">netlify.toml</code> and <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">public/_redirects</code> files automatically ensure client-side routing works without 404 errors.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Essential Configuration Files */}
          <section>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
              <FileCode className="w-4.5 h-4.5 text-amber-600" />
              Included Netlify Configuration Files
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* netlify.toml snippet */}
              <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl text-xs font-mono relative">
                <div className="flex justify-between items-center text-slate-400 pb-1 mb-2 border-b border-slate-800">
                  <span className="text-[11px]">/netlify.toml</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        '[build]\n  publish = "dist"\n  command = "npm run build"\n\n[[redirects]]\n  from = "/*"\n  to = "/index.html"\n  status = 200',
                        'toml'
                      )
                    }
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedKey === 'toml' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="text-[11px] overflow-x-auto text-amber-300">
{`[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`}
                </pre>
              </div>

              {/* _redirects snippet */}
              <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl text-xs font-mono relative">
                <div className="flex justify-between items-center text-slate-400 pb-1 mb-2 border-b border-slate-800">
                  <span className="text-[11px]">/public/_redirects</span>
                  <button
                    onClick={() => copyToClipboard('/*    /index.html   200', 'redirects')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedKey === 'redirects' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="text-[11px] overflow-x-auto text-amber-300">
{`/*    /index.html   200`}
                </pre>
                <p className="text-[10px] text-slate-400 mt-2 font-sans">
                  Directs Netlify Edge to route any page refresh to index.html for smooth client-side single page routing.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Cloud Computing Viva Talking Points */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Viva Preparation: Why This Fits Cloud Computing
            </h3>
            <ul className="list-disc list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <li>
                <strong>Cloud Service Model:</strong> PaaS (Platform as a Service) & Edge CDN Hosting via Netlify / Vercel.
              </li>
              <li>
                <strong>Storage Strategy:</strong> HTML5 Web Storage API (<code className="font-mono text-amber-800">localStorage</code>) provides persistent user sessions, cart state, and order history on the client side without needing heavy relational database servers.
              </li>
              <li>
                <strong>Cloud Scalability:</strong> Static assets are cached across global Points of Presence (PoPs), serving thousands of concurrent users with zero server CPU overhead.
              </li>
              <li>
                <strong>Green Computing:</strong> Zero idle server energy consumption compared to 24/7 dedicated virtual machines.
              </li>
            </ul>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={() => setIsProjectGuideOpen(false)}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Got It, Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
};
