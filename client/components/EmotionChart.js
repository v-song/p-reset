import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const EmotionChart = ({ emotions }) => {
  const ref = useRef();

  useEffect(() => {
    if (!emotions) return
    const data = Object.entries(emotions).map(([emotion, count]) => ({ emotion, count }));

    const svg = d3.select(ref.current);
    const xScale = d3.scaleBand().range([0, 400]).padding(0.4);
    const yScale = d3.scaleLinear().range([400, 0]);

    xScale.domain(data.map((d) => d.emotion));
    yScale.domain([0, d3.max(data, (d) => d.count)]);

    const barChart = svg.append('g');
    barChart.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.emotion))
      .attr('y', (d) => yScale(d.count))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => 400 - yScale(d.count))
      .attr('fill', '#69b3a2');

      barChart.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d.emotion)
      .attr('x', (d) => xScale(d.emotion) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.count) - 10)
      .attr('text-anchor', 'middle');
  }, [emotions]);

  return <svg ref={ref} />;
};

export default EmotionChart;