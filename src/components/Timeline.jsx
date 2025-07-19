import React, { useMemo } from 'react';

// 日付文字列を「YYYY/MM/DD」形式にフォーマットする
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

// 秒数を「HH:MM:SS」形式にフォーマットする
const formatDuration = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return [hours, minutes, seconds]
    .map(val => String(val).padStart(2, '0'))
    .join(':');
};

const Timeline = ({ logs }) => {
  // useMemoを使って、logsが変更された時だけソート処理を再実行する
  const sortedLogs = useMemo(() => {
    if (!logs || logs.length === 0) {
      return [];
    }
    // 新しい順にソートする
    return [...logs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [logs]);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col" className="text-end">Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedLogs.length > 0 ? (
            sortedLogs.map(log => (
              <tr key={log.id}>
                <td>{formatDate(log.created_at)}</td>
                <td>{log.description || '学習'}</td>
                <td className="text-end">{formatDuration(log.timer_time)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted p-4">
                学習記録はまだありません。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Timeline;