// Dashboard.js
import React, { useMemo } from 'react';
import '../assets/Dashboard.css';

// 秒数を「X時間Y分」の形式に変換するヘルパー関数 (変更なし)
const formatTime = (totalSeconds) => {
    if (totalSeconds === 0) {
        return <>0<span className="fs-5 fw-normal ms-1">hour</span></>;
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return (
        <>
            {hours > 0 && <>{hours}<span className="fs-5 fw-normal ms-1">h</span></>}
            {minutes > 0 && <>{minutes}<span className="fs-5 fw-normal ms-1">m</span></>}
        </>
    );
};

// YYYY-MM-DD形式の文字列を返すヘルパー関数
const toYYYYMMDD = (date) => {
    return date.toISOString().split('T')[0];
};

const formatYAxisLabel = (totalSeconds) => {
    if (totalSeconds === 0) return '0 m';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const parts = [];
    if (hours > 0) parts.push(`${hours} h`);
    if (minutes > 0) parts.push(`${minutes} m`);
    return parts.join(' ');
};

const Dashboard = ({ data }) => {
    // グラフのX軸に表示する直近7日間の日付を先に生成
    const chartDates = useMemo(() => {
        const dates = [];
        const today = new Date();
        const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            dates.push({
                label: `${date.getMonth() + 1}/${date.getDate()} ${dayLabels[date.getDay()]}`,
                dateKey: toYYYYMMDD(date),
            });
        }
        return dates;
    }, []);

    const summary = useMemo(() => {
        const now = new Date();
        const todayStr = toYYYYMMDD(now);
        const thisMonthStr = now.toISOString().substring(0, 7);

        let totalSeconds = 0;
        let todaySeconds = 0;
        let monthSeconds = 0;
        const dailyTotals = {};

        data.forEach(item => {
            const itemDateStr = item.created_at.split('T')[0];
            totalSeconds += item.timer_time;
            if (itemDateStr === todayStr) todaySeconds += item.timer_time;
            if (item.created_at.startsWith(thisMonthStr)) monthSeconds += item.timer_time;
            dailyTotals[itemDateStr] = (dailyTotals[itemDateStr] || 0) + item.timer_time;
        });

        // 1. グラフに表示される7日間の最大学習時間を探す
        const maxDailySecondsInView = chartDates.reduce((max, day) => {
            const dailyTime = dailyTotals[day.dateKey] || 0;
            return Math.max(max, dailyTime);
        }, 0);

        // 2. 最大学習時間から、グラフのY軸の最大値を決定する (30分単位で切り上げ)
        //    学習が全くない場合は、デフォルトで1時間(3600秒)とする
        let chartMaxSeconds = 3600; // デフォルト値
        if (maxDailySecondsInView > 0) {
            const halfHour = 1800; // 30分 = 1800秒
            chartMaxSeconds = Math.ceil(maxDailySecondsInView / halfHour) * halfHour;
        }

        return { totalSeconds, todaySeconds, monthSeconds, dailyTotals, chartMaxSeconds };
    }, [data, chartDates]);

    // Y軸のラベルを動的に生成
    const yAxisLabels = useMemo(() => {
        const max = summary.chartMaxSeconds;
        const labels = [max, max * 0.75, max * 0.5, max * 0.25].map((seconds, index) => (
            <span key={index}>{formatYAxisLabel(seconds)}</span>
        ));
        labels.push(<span key="zero">{formatYAxisLabel(0)}</span>);
        return labels;
    }, [summary.chartMaxSeconds]);

    // グラフのバーの高さを計算する関数 (動的な最大値を使用)
    const getBarHeight = (dateKey) => {
        const dailySeconds = summary.dailyTotals[dateKey] || 0;
        // 分母を動的な最大値に変更
        const heightPercentage = Math.min((dailySeconds / summary.chartMaxSeconds) * 100, 100);
        return `${heightPercentage}%`;
    };

    return (
        <div className="container py-5">
            {/* 上部のサマリーカード */}
            <div className="row g-4 mb-5 justify-content-center">
                <div className="col-lg-4">
                    <div className="card stat-card shadow-sm">
                        <div className="card-body text-center p-4">
                            <p className="card-title text-muted">Total Time</p>
                            <h2 className="fw-bold">{formatTime(summary.totalSeconds)}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* グラフエリア */}
            <div className="card stat-card shadow-sm">
                <div className="card-body p-4">
                    <div className="d-flex">
                    <div className="y-axis-labels">
                            {yAxisLabels}
                        </div>
                        <div className="flex-grow-1">
                            <div className="chart-container">
                                <div className="row h-100 w-100 mx-0">
                                    {chartDates.map(day => (
                                        <div key={day.dateKey} className="col d-flex align-items-end justify-content-center p-0" title={`${day.label}: ${formatTime(summary.dailyTotals[day.dateKey] || 0).props.children.join('')}`}>
                                            <div className="chart-bar-item" style={{ height: getBarHeight(day.dateKey) }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="x-axis-labels">
                                {chartDates.map(day => (
                                    <span key={day.dateKey}>{day.label}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;