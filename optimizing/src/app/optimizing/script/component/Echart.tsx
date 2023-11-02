'use client'

import Script from "next/script";
import { FC } from "react";

// 不能使用nonce，目前在构建时，inline的script添加的nonce为空 - 留个记号
// https://github.com/vercel/next.js/issues/55638

// defaullt strategy is afterInteractive
const Echart: FC<EchartProps> = ({ nonce, onRead }) => (
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

export interface EchartProps {
    nonce: string;
    onRead: () => void;
}

export default Echart;