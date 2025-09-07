import React, { useState, useEffect } from 'react';
import styles from './TimestampTracker.module.css';

interface TimestampTrackerProps {
  showLive?: boolean;
  showLastModified?: boolean;
  showNextReview?: boolean;
  lastModifiedDate?: string;
  nextReviewDate?: string;
  updateInterval?: number; // in seconds
}

const TimestampTracker: React.FC<TimestampTrackerProps> = ({
  showLive = true,
  showLastModified = true,
  showNextReview = true,
  lastModifiedDate,
  nextReviewDate = "January 15, 2025",
  updateInterval = 60 // Update every minute
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [pageLoadTime] = useState<Date>(new Date());

  useEffect(() => {
    if (!showLive) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, updateInterval * 1000);

    return () => clearInterval(interval);
  }, [updateInterval, showLive]);

  const formatDateTime = (date: Date, includeTime: boolean = true) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(includeTime && {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const isReviewOverdue = (reviewDate: string) => {
    const review = new Date(reviewDate);
    const now = new Date();
    return now > review;
  };

  return (
    <div className={styles.timestampTracker}>
      {showLive && (
        <div className={styles.liveTime}>
          <span className={styles.indicator}>🕐</span>
          <strong>Current Time:</strong> {formatDateTime(currentTime)}
        </div>
      )}
      
      {showLastModified && (
        <div className={styles.lastModified}>
          <span className={styles.indicator}>📝</span>
          <strong>Page Loaded:</strong> {getRelativeTime(pageLoadTime)} 
          <span className={styles.exact}>({formatDateTime(pageLoadTime)})</span>
        </div>
      )}
      
      {showNextReview && (
        <div className={`${styles.nextReview} ${isReviewOverdue(nextReviewDate) ? styles.overdue : ''}`}>
          <span className={styles.indicator}>
            {isReviewOverdue(nextReviewDate) ? '⚠️' : '📅'}
          </span>
          <strong>Next Review:</strong> {nextReviewDate}
          {isReviewOverdue(nextReviewDate) && (
            <span className={styles.overdueText}> (Overdue - Please Update)</span>
          )}
        </div>
      )}

      <div className={styles.updateStatus}>
        <span className={styles.statusIndicator}>🟢</span>
        <strong>Auto-Update:</strong> Active 
        <span className={styles.updateInfo}>
          (Updates every {updateInterval}s)
        </span>
      </div>

      <div className={styles.quickActions}>
        <button 
          className={styles.actionButton}
          onClick={() => window.location.reload()}
          title="Refresh page to get latest timestamps"
        >
          🔄 Refresh
        </button>
        <button 
          className={styles.actionButton}
          onClick={() => {
            const timestamp = formatDateTime(new Date());
            navigator.clipboard.writeText(`Updated: ${timestamp}`);
            alert('Timestamp copied to clipboard!');
          }}
          title="Copy current timestamp"
        >
          📋 Copy Timestamp
        </button>
      </div>
    </div>
  );
};

export default TimestampTracker;
