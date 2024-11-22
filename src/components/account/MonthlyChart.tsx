'use client'

import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { memo, useMemo } from 'react'
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { colors } from '@/styles/colorPalette';
import { AxisBottom } from '@visx/axis'
import { format, parseISO } from 'date-fns';
// import { useTooltip, useTooltipInPortal } from '@visx/tooltip'

interface ChartData {
    // x축
    date : string
    // y축
    balance : number
}

interface ChartProps {
    chartData : ChartData[]
    width : number
    height : number
}

const verticalMargin = 120;

const getX = (d: ChartData) => d.date
const getY = (d: ChartData) => d.balance
const formatDate = (date: string) => format(parseISO(date), "M월");



function MonthlyChart({chartData, width, height} : ChartProps) {
    // const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData } = useTooltip<ChartData>()
    
    // console.log("tooltip : ", tooltipOpen );
    // const { containerRef, TooltipInPortal } = useTooltipInPortal({scroll : true});

    // bounds
    const xMax = width;
    const yMax = height - verticalMargin;

    // scales, memoize for performance
    const xScale = useMemo(
        () =>
        scaleBand<string>({
            range: [0, xMax],
            round: true,
            domain: chartData.map(getX),
            padding: 0.4,
        }),
        [xMax, chartData],
    );
    const yScale = useMemo(
        () =>
        scaleLinear<number>({
            range: [yMax, 0],
            round: true,
            domain: [0, Math.max(...chartData.map(getY))],
        }),
        [yMax, chartData],
    );

    return width < 10 ? null : (
        <div>
        <svg width={width} height={height}>
        <rect width={width} height={height} fill="url(#teal)" rx={14} />
        <Group top={verticalMargin / 2}>
            {chartData.map((d) => {
            const date = getX(d);
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(getY(d)) ?? 0);
            const barX = xScale(date);
            const barY = yMax - barHeight;
            return (
                <Bar
                key={date}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={colors.blue}
                />
            );
            })}
        </Group>
        <AxisBottom
          top={yMax + 60}
          scale={xScale}
          tickFormat={formatDate}
          stroke={colors.blue}
          tickStroke={colors.blue}
          tickLabelProps={{
            fill: colors.blue,
            fontSize: 11,
            textAnchor: 'middle',
          }}
        />
        </svg>
        {/* {tooltipOpen && tooltipData && (
            <TooltipInPortal top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
              <div style={{ color: colorScale(tooltipData.key) }}>
                <strong>{tooltipData.key}</strong>
              </div>
              <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
              <div>
                <small>{formatDate(getDate(tooltipData.bar.data))}</small>
              </div>
            </TooltipInPortal>
        )} */}
        </div>
)}


interface WrapperProps {
    height? : number;
    chartData : ChartData[]
}

function ChartWrapper({height = 200, chartData} : WrapperProps){
    return(
        <ParentSize>
        {
            (({ width })=> 
            <MonthlyChart width = {width} height={height} chartData={chartData}/>)
        }
        </ParentSize>
    )
}

export default memo(ChartWrapper);