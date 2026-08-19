import React from 'react';
import { CalculatedDimensions } from '../types';

interface BoxIllustrationProps {
  calc: CalculatedDimensions;
}

// 실제 mm 값을 화면에 보기 좋은 픽셀 크기로 눌러 담는 스케일 함수
const scaleTo = (mm: number, min: number, max: number) => {
  const clamped = Math.min(Math.max(mm, 1), 600);
  const ratio = Math.min(clamped / 300, 1);
  return min + (max - min) * ratio;
};

const BoxIllustration: React.FC<BoxIllustrationProps> = ({ calc }) => {
  const { tPrime, wPrime, hPrime } = calc;

  const frontW = scaleTo(wPrime, 80, 220);
  const frontH = scaleTo(hPrime, 80, 220);
  const depth = scaleTo(tPrime, 20, 60);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div
          className="shrink-0"
          style={{ perspective: '900px', width: frontW + depth + 40, height: frontH + depth + 40 }}
        >
          <div
            className="relative"
            style={{
              width: frontW,
              height: frontH,
              margin: '20px',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(-18deg) rotateY(-28deg)',
            }}
          >
            {/* 앞면 (가로 x 세로) */}
            <div
              className="absolute inset-0 bg-blue-500/90 border-2 border-blue-700 rounded-sm flex items-center justify-center"
              style={{ transform: `translateZ(${depth / 2}px)` }}
            >
              <span className="text-white font-black text-xs sm:text-sm text-center px-2">
                {wPrime} × {hPrime}
              </span>
            </div>
            {/* 옆면 (두께) */}
            <div
              className="absolute top-0 bottom-0 bg-blue-700/90 border-2 border-blue-900"
              style={{
                width: depth,
                right: -depth,
                transform: `rotateY(90deg) translateZ(${depth / 2}px)`,
                transformOrigin: 'left',
              }}
            />
            {/* 윗면 (두께) */}
            <div
              className="absolute left-0 right-0 bg-blue-400/90 border-2 border-blue-700"
              style={{
                height: depth,
                top: -depth,
                transform: `rotateX(90deg) translateZ(${depth / 2}px)`,
                transformOrigin: 'bottom',
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <p className="text-xs font-bold text-gray-400 mb-1">가로 (W')</p>
            <p className="text-xl font-black text-gray-900">{wPrime}</p>
            <p className="text-[11px] text-gray-400 mt-1">+10mm 보정</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <p className="text-xs font-bold text-gray-400 mb-1">세로 (H')</p>
            <p className="text-xl font-black text-gray-900">{hPrime}</p>
            <p className="text-[11px] text-gray-400 mt-1">+10mm 보정</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <p className="text-xs font-bold text-gray-400 mb-1">두께 (T')</p>
            <p className="text-xl font-black text-gray-900">{tPrime}</p>
            <p className="text-[11px] text-gray-400 mt-1">+5mm 보정</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxIllustration;
