import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FAILURE_CASES, SUCCESS_CASES, type SuccessCase } from './data';
import { CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';



interface SuccessCaseProps {
  caseItem: SuccessCase;
  handleMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const SuccessCaseCard = React.forwardRef<HTMLDivElement, SuccessCaseProps>(
  ({ caseItem, handleMouseEnter, handleMouseLeave }, ref) => {
    return (
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="card group overflow-hidden flex flex-col h-full"
      >
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6 relative">
          <img
            src={caseItem.image}
            alt={caseItem.issue}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-4 flex-grow flex flex-col">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">Success Case</span>
            <h4 className="text-sm font-bold leading-snug mt-1">{caseItem.issue}</h4>
          </div>
          <div className="pt-4 mt-auto border-t border-gray-50">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Reason</span>
            <p className="text-xs text-gray-600 italic mt-1 leading-relaxed">{caseItem.reason}</p>
          </div>
        </div>
      </div>
    );
  }
);

SuccessCaseCard.displayName = 'SuccessCaseCard';

export default function AnalysisPage() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: -5, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <div className="space-y-16 py-8">
      {/* Model Decision */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="text-accent" />
          <h2 className="text-2xl font-bold">모델 선택</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card border-l-4 border-l-accent">
            <h3 className="text-lg font-bold mb-4">Input Size Comparison</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>YOLOv11-640</span>
                <span className="font-bold text-black">Selected</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-gray-100 rounded">
                <span>YOLOv11-960</span>
                <span>No significant gain</span>
              </div>
              <p className="pt-2">
                질병 탐지에 있어서 제일 중요한 것은 정확한 질병 탐지율입니다.
                총합스코어와 오차율 스코어를 고려했을 때 이미지의 사이즈를 640px로 설정하는 것이 가장 효율적이라고 판단해 해당 모델을 사용하게 되었습니다

              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-gray-500 italic">
              "Efficiency in AI is not just about the highest resolution, but the optimal balance between performance and resource consumption."
            </p>
          </div>
        </div>
      </section>

      {/* Success Cases */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <CheckCircle2 className="text-green-500" />
          <h2 className="text-2xl font-bold">성공사례</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SUCCESS_CASES.map((caseItem, idx) => (
            <SuccessCaseCard
              key={caseItem.id}
              caseItem={caseItem}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
            />
          ))}
        </div>
      </section>



      {/* Failure Cases */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <AlertCircle className="text-red-500" />
          <h2 className="text-2xl font-bold">실패사례</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FAILURE_CASES.map((caseItem, idx) => (
            <div
              key={caseItem.id}
              ref={(el) => {
                if (el) cardsRef.current[SUCCESS_CASES.length + idx] = el;
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="card flex flex-col h-full"
            >
              <img
                src={caseItem.image}
                alt={caseItem.issue}
                className="w-full aspect-video object-cover rounded mb-6  hover:grayscale-0 transition-all"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-4 flex-grow">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">Issue</span>
                  <p className="text-sm font-bold">{caseItem.issue}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Model Behavior</span>
                  <p className="text-xs text-gray-600">{caseItem.behavior}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Cause</span>
                  <p className="text-xs text-gray-600">{caseItem.cause}</p>
                </div>
                <div className="pt-4 mt-auto border-t border-gray-50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Insight</span>
                  <p className="text-xs text-gray-600 italic">{caseItem.insight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Insights */}
      <section className="bg-black text-white p-12 rounded-2xl">
        <h2 className="text-2xl font-bold mb-8">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">1</div>
            <h4 className="font-bold">Scale Sensitivity</h4>
            <p className="text-sm text-gray-400">Significant weakness observed in detecting lesions smaller than 1% of total image area.</p>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">2</div>
            <h4 className="font-bold">Pattern Recognition</h4>
            <p className="text-sm text-gray-400">High sensitivity to background textures that mimic the irregular shapes of disease lesions.</p>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">3</div>
            <h4 className="font-bold">Boundary Stability</h4>
            <p className="text-sm text-gray-400">Bounding boxes tend to fluctuate in ambiguous regions where disease boundaries are not sharp.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
