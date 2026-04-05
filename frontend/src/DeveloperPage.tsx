import React, { useState } from 'react';
import { 
  Terminal, 
  Upload, 
  Layout, 
  Settings, 
  Database, 
  ShieldAlert,
  ChevronRight,
  Code2,
  Cpu
} from 'lucide-react';
import { cn } from './lib/utils';

export default function DeveloperPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'config'>('overview');

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <ShieldAlert size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Developer Access Only</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Control Center
          </h1>
          <p className="text-gray-500 max-w-xl text-lg font-medium leading-relaxed">
            Internal workspace for model testing, data analysis and system configuration.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2",
              activeTab === 'overview' ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-800"
            )}
          >
            <Layout size={16} /> Overview
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2",
              activeTab === 'analysis' ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-800"
            )}
          >
            <Cpu size={16} /> Data Lab
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2",
              activeTab === 'config' ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-800"
            )}
          >
            <Settings size={16} /> System
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Model Pipeline Status</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-xs font-bold uppercase mb-1">Backend</p>
                    <p className="text-xl font-mono text-emerald-400">ONLINE</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-xs font-bold uppercase mb-1">Model V3</p>
                    <p className="text-xl font-mono">READY</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-xs font-bold uppercase mb-1">GPU Util</p>
                    <p className="text-xl font-mono">12%</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-xs font-bold uppercase mb-1">Latency</p>
                    <p className="text-xl font-mono">42ms</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Terminal size={120} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-gray-100 rounded-2xl p-6 hover:border-indigo-100 transition-colors bg-white">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Database size={20} />
                </div>
                <h4 className="font-bold text-lg mb-2">Dataset Health</h4>
                <p className="text-sm text-gray-500 mb-4 font-medium">Monitoring data distribution and annotation quality across environments.</p>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-indigo-500 w-[84%]" />
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase">84% Quality Check Passed</span>
              </div>
              <div className="border border-gray-100 rounded-2xl p-6 hover:border-emerald-100 transition-colors bg-white">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <Code2 size={20} />
                </div>
                <h4 className="font-bold text-lg mb-2">API Documentation</h4>
                <p className="text-sm text-gray-500 mb-4 font-medium">Quick access to Swagger/OpenAPI documentation and endpoint testing.</p>
                <button className="text-sm font-bold text-emerald-600 flex items-center gap-1 hover:gap-2 transition-all">
                  Open Docs <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Terminal size={16} /> Recent Events
              </h4>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-700">Model interference triggered</p>
                      <p className="text-[10px] text-gray-400 font-mono">0.002s latency • env: dev</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-indigo-600 rounded-2xl p-6 text-white text-center">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">System Version</p>
              <p className="text-3xl font-black mb-4">v2.4.0-BETA</p>
              <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-900/20">
                Check for Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center bg-gray-50/50">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-20 h-20 bg-white shadow-xl rounded-2xl flex items-center justify-center mx-auto text-indigo-600 border border-gray-100">
                <Upload size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Upload Test Data</h3>
                <p className="text-gray-500 font-medium">
                  Drop an image or select a file to run real-time inference and visualize bounding boxes.
                </p>
              </div>
              <button className="px-8 py-4 bg-black text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
                Select Hardware Image
              </button>
              <p className="text-xs text-gray-400 font-mono">SUPPORTED: .JPG, .PNG • MAX: 20MB</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="animate-in fade-in zoom-in-95 duration-300 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Environment', value: 'Development', desc: 'Standard dev environment settings' },
            { title: 'Inference Backend', value: 'FastAPI / PyTorch', desc: 'Active processing engine' },
            { title: 'Debug Logging', value: 'Enabled', desc: 'Verbose console and system logs' },
            { title: 'Auto-Refresh', value: 'Off', desc: 'Real-time data polling' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl group hover:border-gray-900 transition-colors">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">{item.title}</p>
                <p className="text-lg font-bold text-gray-900 mb-1">{item.value}</p>
                <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
              </div>
              <div className="w-12 h-6 bg-gray-100 rounded-full p-1 cursor-pointer group-hover:bg-gray-200 transition-colors">
                <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm", item.value === 'Enabled' || item.value === 'Development' ? "translate-x-6 bg-indigo-600" : "")} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
