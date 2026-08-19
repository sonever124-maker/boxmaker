import React from 'react';
import { CalculatedDimensions } from '../types';

interface Box2DProps {
  calc: CalculatedDimensions;
}

const MARGIN_LABEL = '여유 (40)';

const Box2D: React.FC<Box2DProps> = ({ calc }) => {
  const { tPrime, wPrime, hPrime, totalX, totalY } = calc;

  const viewW = 480;
  const pad = 40;
  const scale = (viewW - pad * 2) / totalX;
  const viewH = totalY * scale + pad * 2;

  const cols = [
    { w: tPrime, label: '두께', tone: 'fill-blue-100 stroke-blue-400' },
    { w: wPrime, label: '가로', tone: 'fill-blue-50 stroke-blue-400' },
    { w: tPrime, label: '두께', tone: 'fill-blue-100 stroke-blue-400' },
  ];

  const rows = [
    { h: 40, label: MARGIN_LABEL, tone: 'fill-gray-100 stroke-gray-300' },
    { h: tPrime, label: '두께', tone: 'fill-blue-100 stroke-blue-400' },
    { h: hPrime, label: '세로', tone: 'fill-blue-50 stroke-blue-400' },
    { h: tPrime, label: '두께', tone: 'fill-blue-100 stroke-blue-400' },
    { h: hPrime, label: '세로', tone: 'fill-blue-50 stroke-blue-400' },
  ];

  let yCursor = pad;
  const rowRects = rows.map((row, i) => {
    const y = yCursor;
    const h = row.h * scale;
    yCursor += h;
    return { ...row, y, h, key: `row-${i}` };
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-800">전개도 (재단 치수)</h3>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-500">
            총 재단 크기{' '}
            <span className="text-blue-600">
              {totalX} × {totalY} mm
            </span>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${viewW} ${viewH + 30}`}
          className="w-full min-w-[320px]"
          style={{ maxHeight: 480 }}
        >
          {rowRects.map((row) => {
            let xCursor = pad;
            return (
              <g key={row.key}>
                {cols.map((col, ci) => {
                  const w = col.w * scale;
                  const x = xCursor;
                  xCursor += w;
                  const isMarginRow = row.label === MARGIN_LABEL;
                  return (
                    <g key={`${row.key}-${ci}`}>
                      <rect
                        x={x}
                        y={row.y}
                        width={w}
                        height={row.h}
                        className={isMarginRow ? 'fill-gray-100 stroke-gray-300' : col.tone}
                        strokeWidth={1}
                      />
                      {w > 24 && row.h > 12 && (
                        <text
                          x={x + w / 2}
                          y={row.y + row.h / 2}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="fill-gray-600"
                          fontSize={10}
                          fontWeight={700}
                        >
                          {isMarginRow ? '' : `${col.label}`}
                        </text>
                      )}
                    </g>
                  );
                })}
                {row.label === MARGIN_LABEL && row.h > 10 && (
                  <text
                    x={pad + (totalX * scale) / 2}
                    y={row.y + row.h / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-gray-500"
                    fontSize={10}
                    fontWeight={700}
                  >
                    {row.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* 외곽선 */}
          <rect
            x={pad}
            y={pad}
            width={totalX * scale}
            height={totalY * scale}
            fill="none"
            stroke="#1d4ed8"
            strokeWidth={2}
          />

          {/* 하단 총가로 치수선 */}
          <text
            x={pad + (totalX * scale) / 2}
            y={viewH + 20}
            textAnchor="middle"
            className="fill-gray-700"
            fontSize={12}
            fontWeight={900}
          >
            {totalX} mm
          </text>
        </svg>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        상단 여유 40mm + 두께 · 세로가 반복되는 형태의 감싸는 전개도입니다. (좌우: 두께 · 가로 · 두께)
      </p>
    </div>
  );
};

export default Box2D;
