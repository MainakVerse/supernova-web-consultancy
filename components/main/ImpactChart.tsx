import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Line, LineChart } from 'recharts';

const data = [
  { name: 'Q1', value: 10 },
  { name: 'Q2', value: 20 },
  { name: 'Q3', value: 80 },
  { name: 'Q4', value: 160 },
];

const NEON_COLORS = ['#e6ffff', '#80ffff', '#0099ff', '#0000e6'];

const ImpactChart = () => {
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 768
  );

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getChartDimensions = () => {
    if (windowWidth <= 320) {
      return { width: 200, height: 250 };
    } else if (windowWidth <= 768) {
      return { width: 250, height: 300 };
    } else {
      return { width: 300, height: 350 };
    }
  };

  const dimensions = getChartDimensions();

  const CustomLegend = () => (
    <div className="flex flex-col items-center mt-2 md:mt-4 gap-1 md:gap-2">
      <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-1 md:gap-y-2">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-1 md:gap-2">
            <div
              className="w-2 h-2 md:w-3 md:h-3 rounded-full"
              style={{
                backgroundColor: NEON_COLORS[index % NEON_COLORS.length],
                boxShadow: `0 0 4px ${NEON_COLORS[index % NEON_COLORS.length]}`,
              }}
            />
            <span className="text-white text-[10px] md:text-sm lg:text-base whitespace-nowrap">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="md:col-span-3 rounded-xl md:p-6 border border-green-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]">
      <h2 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-4 text-green-500 text-center">
        Growth Metrics
      </h2>
      <div className="flex flex-col items-center w-full overflow-hidden">
        <BarChart
          width={dimensions.width}
          height={dimensions.height}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <XAxis dataKey="name" tick={{ fill: '#fff' }} />
          <YAxis tick={{ fill: '#fff' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              boxShadow: '0 0 1px #39ff14',
              fontSize: windowWidth <= 320 ? '10px' : '14px',
            }}
          />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={NEON_COLORS[index % NEON_COLORS.length]}
                style={{
                  filter: `drop-shadow(0 0 1px ${NEON_COLORS[index % NEON_COLORS.length]}) drop-shadow(0 0 2px ${NEON_COLORS[index % NEON_COLORS.length]})`,
                }}
              />
            ))}
          </Bar>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ffffff"
            strokeWidth={2}
            dot={{ stroke: '#ffffff', r: 4 }}
          />
        </BarChart>
        <CustomLegend />
      </div>
    </div>
  );
};

export default ImpactChart;
