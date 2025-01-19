import { Roboto_Flex } from 'next/font/google';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Education', value: 150 },
  { name: 'Real Estate', value: 80 },
  { name: 'Consultancy', value: 40 },
  { name: 'Fin Tech', value: 30 },
];

const NEON_COLORS = ['#39ff14', '#ff073a', '#00f0ff', '#ffdd00'];

const IndustriesChart = () => {
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
      return {
        width: 280,
        height: 280,
        innerRadius: 60,
        outerRadius: 90
      };
    } else if (windowWidth <= 768) {
      return {
        width: 320,
        height: 320,
        innerRadius: 80,
        outerRadius: 110
      };
    } else {
      return {
        width: 400,
        height: 400,
        innerRadius: 100,
        outerRadius: 140
      };
    }
  };

  const dimensions = getChartDimensions();

  // Custom legend component
  const CustomLegend = () => (
    <div className="flex flex-col items-center mt-2 md:mt-4 gap-1 md:gap-2">
      <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-1 md:gap-y-2">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-1 md:gap-2">
            <div 
              className="w-2 h-2 md:w-3 md:h-3 rounded-full"
              style={{ 
                backgroundColor: NEON_COLORS[index % NEON_COLORS.length],
                boxShadow: `0 0 4px ${NEON_COLORS[index % NEON_COLORS.length]}`
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
    <div className="md:col-span-3 rounded-xl  md:p-6 border border-yellow-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] ">
      <h2 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-4 text-yellow-500 text-center">
        Industries
      </h2>
      <div className="flex flex-col items-center w-full overflow-hidden">
        <PieChart 
          width={dimensions.width} 
          height={dimensions.height - 60} 
          className="max-w-full"
        >
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={dimensions.innerRadius}
            outerRadius={dimensions.outerRadius}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={NEON_COLORS[index % NEON_COLORS.length]}
                style={{
                  filter: `drop-shadow(0 0 1px ${NEON_COLORS[index % NEON_COLORS.length]}) drop-shadow(0 0 2px ${NEON_COLORS[index % NEON_COLORS.length]})`,
                }}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              color: '#fff',
              boxShadow: '0 0 1px #39ff14',
              fontSize: windowWidth <= 320 ? '10px' : '14px',
            }}
          />
        </PieChart>
        <CustomLegend />
      </div>
    </div>
  );
};

export default IndustriesChart;