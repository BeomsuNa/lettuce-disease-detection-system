import React, { useState, useRef, useEffect } from 'react';
import { SAMPLES, type Sample } from './data';
import { cn } from './lib/utils';
import { Info, Target, Layers, Loader2 } from 'lucide-react';

interface Detection {
  class_id: number;
  class_name: string;
  confidence: number;
  bbox: {
    x_min: number;
    y_min: number;
    x_max: number;
    y_max: number;
  };
}

interface DetectionData {
  input_size: number;
  detections: Detection[];
}

interface BBox {
  left: number;
  top: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
}

export default function HomePage() {
  const [selectedSample, setSelectedSample] = useState<Sample>(SAMPLES[0]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const bboxesRef = useRef<HTMLDivElement[]>([]);
  const [bboxes, setBboxes] = useState<BBox[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetections = async () => {
      setLoading(true);
      try {
        const response = await fetch(selectedSample.json);
        if (!response.ok) throw new Error(`Failed to fetch: ${selectedSample.json}`);

        const data: DetectionData = await response.json();
        const inputSize = data.input_size || 640;

        // Extract and transform only bbox data
        const extractedBboxes: BBox[] = data.detections.map((d) => ({
          left: (d.bbox.x_min / inputSize) * 100,
          top: (d.bbox.y_min / inputSize) * 100,
          width: ((d.bbox.x_max - d.bbox.x_min) / inputSize) * 100,
          height: ((d.bbox.y_max - d.bbox.y_min) / inputSize) * 100,
          label: d.class_name,
          confidence: d.confidence
        }));

        setBboxes(extractedBboxes);
      } catch (error) {
        console.error('Error fetching detections:', error);
        setBboxes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDetections();
  }, [selectedSample.json]);
  const getGrade = (confidence: number) => {
    const score = Math.round(confidence * 100);
    if (score >= 50) return { label: '높음' };
    if (score >= 20) return { label: '중간' };
    if (score >= 0) return { label: '낮음' };
    return { label: '없음' };
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 border-b border-gray-100">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          AI-based Lettuce Disease Detection
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          YOLOv11 · Detection 검출 프로젝트
        </p>
      </section>

      {/* Main Demo Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Sample List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Samples</h3>
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
            {SAMPLES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => setSelectedSample(sample)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-3 p-2 rounded-md transition-all text-left group",
                  selectedSample.id === sample.id
                    ? "bg-black text-white"
                    : "hover:bg-gray-50"
                )}
              >
                <img
                  src={sample.thumbnail}
                  alt={sample.label}
                  className="w-10 h-10 rounded object-cover grayscale group-hover:grayscale-0 transition-all"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-medium hidden lg:block">{sample.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center Panel: Image Viewer */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group">
            <div ref={imageContainerRef} className="relative w-full h-full">
              <img
                src={selectedSample.image}
                alt={selectedSample.label}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Bounding Boxes */}
              {!loading && bboxes.map((bbox, idx) => {
                const grade = getGrade(bbox.confidence);
                return (
                  <React.Fragment key={idx}>
                    <div
                      ref={(el) => {
                        if (el) bboxesRef.current[idx] = el;
                      }}
                      className="absolute border-2 border-accent group-hover:border-accent/80 transition-colors"
                      style={{
                        left: `${bbox.left}%`,
                        top: `${bbox.top}%`,
                        width: `${bbox.width}%`,
                        height: `${bbox.height}%`,
                      }}
                    >
                      <div className="absolute -top-6 left-0 bg-accent text-white text-[10px] px-1.5 py-0.5 font-bold whitespace-nowrap uppercase">
                        {bbox.label} ({Math.round(bbox.confidence * 100)}%)
                      </div>
                    </div>

                    {/* Overlay Info */}
                    <div className="absolute bottom-4 left-4 flex gap-4">
                      <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2">
                        <Target size={12} />
                        Detection Rating: <span>{grade.label}</span> ({Math.round(bbox.confidence * 100)}%)
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}

              {!loading && bboxes.length === 0 && (
                <div className="absolute bottom-4 left-4 flex gap-4">
                  <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2">
                    <Target size={12} />
                    Detection Rating: <span>없음</span>
                  </div>
                </div>
              )}


              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                  <Loader2 className="animate-spin text-accent" size={32} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Quick Insight */}
        <div className="lg:col-span-3 space-y-6">
          <div className="card h-full">
            <div className="flex items-center gap-2 mb-6">
              <Layers size={18} className="text-accent" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Quick Insight</h3>
            </div>
            <ul className="space-y-4">
              {selectedSample.insights.map((insight, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                  <span className="text-accent font-bold">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Summary Section */}
      <section className="pt-12 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Model Architecture</h4>
            <p className="text-sm text-gray-600">YOLOv11s 버전을 사용해 학습 및 추론 약 43GB 정도의 학습 데이터를 사용해 학습</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Target Class</h4>
            <p className="text-sm text-gray-600">상추노균병/상추균핵병의 두 가지 질병을 기준으로 학습 진행.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Visualization</h4>
            <p className="text-sm text-gray-600">추론 결과를 bbox, confidence score, detection count로 시각화하여 표시.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
