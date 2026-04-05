import React, { useState, useRef } from 'react';
import {
  Terminal,
  Upload,
  Layout,
  Settings,
  Database,
  ShieldAlert,
  ChevronRight,
  Code2,
  Cpu,
  Loader2,
  X,
  Plus
} from 'lucide-react';
import { cn } from './lib/utils';

interface Detection {
  class_name: string;
  confidence: number;
  bbox: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

interface AnalysisResult {
  image_width: number;
  image_height: number;
  detections: Detection[];
}

export default function DeveloperPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'config'>('analysis');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Launch actual analysis with FastAPI
  const startAnalysis = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const data: AnalysisResult = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("이미지 분석 중 오류가 발생했습니다. 백엔드 서버 상태를 확인해주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Reset state
  const resetUpload = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setAnalysisResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />

          <div className="relative">
            {/* Loading Overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl animate-in fade-in duration-300">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <p className="text-lg font-bold text-gray-900">Neural Analysis in Progress...</p>
                <p className="text-sm text-gray-500 font-medium">Processing image through model pipeline...</p>
              </div>
            )}

            {!previewUrl ? (
              <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300 transition-all">
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
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-4 bg-black text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
                  >
                    Select Hardware Image
                  </button>
                  <p className="text-xs text-gray-400 font-mono text-center">SUPPORTED: .JPG, .PNG • MAX: 20MB</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                <div className="relative group rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center min-h-[400px]">
                  {/* Image and BBox Container */}
                  <div className="relative inline-block max-w-full">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full max-h-[600px] object-contain rounded-lg"
                    />
                    
                    {/* BBox Overlay */}
                    {analysisResult && (
                      <div className="absolute inset-0 pointer-events-none">
                        {analysisResult.detections.map((det, i) => {
                          const top = (det.bbox.y1 / analysisResult.image_height) * 100;
                          const left = (det.bbox.x1 / analysisResult.image_width) * 100;
                          const width = ((det.bbox.x2 - det.bbox.x1) / analysisResult.image_width) * 100;
                          const height = ((det.bbox.y2 - det.bbox.y1) / analysisResult.image_height) * 100;

                          return (
                            <div 
                              key={i}
                              className="absolute border-2 border-indigo-500 bg-indigo-500/10 transition-all duration-300"
                              style={{
                                top: `${top}%`,
                                left: `${left}%`,
                                width: `${width}%`,
                                height: `${height}%`,
                              }}
                            >
                              <div className="absolute -top-6 left-0 flex items-center gap-1.5 px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded shadow-sm whitespace-nowrap">
                                <span className="uppercase">{det.class_name}</span>
                                <span className="opacity-75">{(det.confidence * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={resetUpload}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="flex flex-col justify-between py-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">Image Metadata</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Filename</p>
                          <p className="text-xs font-mono font-bold truncate">{selectedFile?.name}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Size</p>
                          <p className="text-xs font-mono font-bold">{(selectedFile?.size || 0 / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-gray-900">Analysis Options</h4>
                      <div className="space-y-2">
                        {['Bounding Box Prediction', 'Disease Classification', 'Confidence Scoring'].map((opt) => (
                          <div key={opt} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 hover:border-indigo-100 bg-gray-50/30 transition-colors">
                            <div className="w-4 h-4 rounded border border-indigo-500 bg-indigo-50 flex items-center justify-center">
                              <div className="w-2 h-2 bg-indigo-500 rounded-sm" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-8 space-y-3">
                    <button 
                      onClick={startAnalysis}
                      disabled={isAnalyzing}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Cpu size={18} />
                      )}
                      {isAnalyzing ? "Analyzing..." : "Start Neural Analysis"}
                    </button>
                    <button 
                      onClick={resetUpload}
                      disabled={isAnalyzing}
                      className="w-full py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
                    >
                      Cancel and Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Analysis Results Display */}
            {analysisResult && (
              <div className="mt-8 bg-white border border-gray-100 rounded-3xl p-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Analysis Result</h3>
                    <p className="text-sm text-gray-500 font-medium">Model successfully identified {analysisResult.detections.length} regions.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    COMPLETED
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysisResult.detections.map((det, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-indigo-100 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded leading-none">OBJECT {String(i + 1).padStart(2, '0')}</span>
                        <span className="text-xs font-bold text-indigo-600">{(det.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{det.class_name}</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-gray-400">
                          <span>X-Range</span>
                          <span>{det.bbox.x1} - {det.bbox.x2}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-gray-400">
                          <span>Y-Range</span>
                          <span>{det.bbox.y1} - {det.bbox.y2}</span>
                        </div>
                      </div>
                      <div className="mt-4 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-1000" 
                          style={{ width: `${det.confidence * 100}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                  
                  {analysisResult.detections.length === 0 && (
                    <div className="col-span-full py-12 text-center">
                      <p className="text-gray-400 font-medium italic">No objects detected in this image.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
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
