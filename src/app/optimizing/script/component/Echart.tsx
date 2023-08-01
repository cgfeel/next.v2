'use client'

import Script from "next/script";
import { FC } from "react";

interface EchartProps {
    onRead: () => void;
}

// 指定图表的配置项和数据
const option = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
        data: ['销量']
    },
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
        {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }
    ]
};

// defaullt strategy is afterInteractive
const Echart: FC<EchartProps> = ({ onRead }) => (
    <>
        <div 
            id="container" 
            style={{
                width: 600,
                height: 400,
            }}
        />
        <Script
            id="echart"
            src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"
            onLoad={() => console.log('onLoad')}
            onReady={() => {
                // 基于准备好的dom，初始化echarts实例
                const data = `
                    const myChart = echarts.init(
                        document.getElementById('container'), null, { crossOrigin: 'anonymous' }
                    );

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                `;

                eval(data);
                onRead();

                console.log('onReady');
            }}
        />
    </>
);

export default Echart;