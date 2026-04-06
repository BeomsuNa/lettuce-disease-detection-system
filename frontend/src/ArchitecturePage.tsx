import { Server, Cpu, Layout, ArrowRight, Database, PlayCircle } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="space-y-16 py-8">
      {/* System Overview */}
      <section>
        <h2 className="text-2xl font-bold mb-8">System Overview</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
              <Database size={24} className="text-gray-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">Image Input</span>
          </div>
          <ArrowRight className="hidden md:block text-gray-300" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-black rounded-xl shadow-sm flex items-center justify-center">
              <Cpu size={24} className="text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">YOLO Model</span>
          </div>
          <ArrowRight className="hidden md:block text-gray-300" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
              <Server size={24} className="text-gray-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">JSON Output</span>
          </div>
          <ArrowRight className="hidden md:block text-gray-300" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-accent rounded-xl shadow-sm flex items-center justify-center">
              <Layout size={24} className="text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">Visualization</span>
          </div>
        </div>
      </section>

      {/* Detailed Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Cpu size={20} className="text-accent" />
              Model Pipeline
            </h3>
            <div className="space-y-4">
              {[
                { step: 'Input Image', desc: 'Raw greenhouse capture (variable resolution)' },
                { step: 'Model Inference', desc: 'YOLOv11 processing at 640px' },
                { step: 'BBox Detection', desc: 'Coordinate and confidence score generation' },
                { step: 'JSON Export', desc: 'Structured data serialization' },
                { step: 'UI Rendering', desc: 'Absolute positioning overlay on React' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="text-xs font-bold text-gray-300 mt-1">0{idx + 1}</span>
                  <div>
                    <h4 className="text-sm font-bold">{item.step}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Layout size={20} className="text-accent" />
              Frontend Stack
            </h3>
            <div className="card bg-gray-50 border-none">
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span className="font-medium">Framework</span>
                  <span className="text-black">React + Vite</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Styling</span>
                  <span className="text-black">Tailwind CSS</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Animation</span>
                  <span className="text-black">GSAP</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Overlay</span>
                  <span className="text-black">Absolute div-based</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Server size={20} className="text-accent" />
              Backend & Data
            </h3>
            <div className="card bg-gray-50 border-none">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Inference Engine</h4>
                  <p className="text-sm text-gray-600">FastAPI wrapper for YOLOv11 inference, exposing a <code className="bg-gray-200 px-1 rounded">/predict</code> endpoint for real-time analysis.</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Data Flow</h4>
                  <p className="text-sm text-gray-600">User uploads image → Web UI sends to FastAPI → Model returns JSON → Frontend renders bounding boxes dynamically.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Video Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <PlayCircle size={20} className="text-accent" />
              Demo Video
            </h3>
            <div className="aspect-video bg-black rounded-xl relative overflow-hidden shadow-2xl ring-1 ring-gray-100 group">
              <video
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
              >
                <source src="/demoVideo/DemoVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-[10px] text-gray-400 mt-3 text-center">
              Demonstrates FastAPI inference, /predict endpoint request, and real-time UI rendering.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
