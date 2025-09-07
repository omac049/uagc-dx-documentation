import React, { useState, useEffect } from 'react';
import styles from './TimestampTracker.module.css';
import clsx from 'clsx';

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

// ================================
// ADDITIONAL UTILITY COMPONENTS
// ================================

// StatusBadge Component - For feature/implementation status
interface StatusBadgeProps {
  status: 'completed' | 'in-progress' | 'planned' | 'deprecated' | 'urgent' | 'review' | 'testing';
  text?: string;
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  completed: {
    color: 'var(--ifm-color-success)',
    bgColor: 'var(--ifm-color-success-lightest)',
    icon: '✅',
    defaultText: 'Completed'
  },
  'in-progress': {
    color: 'var(--ifm-color-warning-dark)',
    bgColor: 'var(--ifm-color-warning-lightest)',
    icon: '🚧',
    defaultText: 'In Progress'
  },
  planned: {
    color: 'var(--ifm-color-info-dark)',
    bgColor: 'var(--ifm-color-info-lightest)',
    icon: '📋',
    defaultText: 'Planned'
  },
  deprecated: {
    color: 'var(--ifm-color-danger-dark)',
    bgColor: 'var(--ifm-color-danger-lightest)',
    icon: '⚠️',
    defaultText: 'Deprecated'
  },
  urgent: {
    color: '#ff4444',
    bgColor: '#ffe6e6',
    icon: '🔥',
    defaultText: 'Urgent'
  },
  review: {
    color: 'var(--ifm-color-secondary-dark)',
    bgColor: 'var(--ifm-color-secondary-lightest)',
    icon: '👀',
    defaultText: 'Review Needed'
  },
  testing: {
    color: '#8e44ad',
    bgColor: '#f8e6ff',
    icon: '🧪',
    defaultText: 'Testing'
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  text,
  size = 'medium',
  showIcon = true,
  className
}) => {
  const config = statusConfig[status];
  const displayText = text || config.defaultText;

  const sizeStyles = {
    small: { fontSize: '0.7rem', padding: '2px 6px', borderRadius: '8px' },
    medium: { fontSize: '0.8rem', padding: '4px 8px', borderRadius: '10px' },
    large: { fontSize: '0.9rem', padding: '6px 12px', borderRadius: '12px' }
  };

  return (
    <span
      className={clsx('status-badge', `status-${status}`, `size-${size}`, className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: showIcon ? '4px' : '0',
        color: config.color,
        backgroundColor: config.bgColor,
        border: `1px solid ${config.color}33`,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        ...sizeStyles[size]
      }}
    >
      {showIcon && <span role="img" aria-label={status}>{config.icon}</span>}
      <span>{displayText}</span>
    </span>
  );
};

// ContactCard Component - For team member quick actions
interface ContactCardProps {
  name: string;
  role: string;
  email?: string;
  slack?: string;
  avatar?: string;
  responsibilities?: string[];
  status?: 'available' | 'busy' | 'offline';
  compact?: boolean;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  name,
  role,
  email,
  slack,
  avatar,
  responsibilities = [],
  status = 'available',
  compact = false
}) => {
  const statusColors = {
    available: '#4CAF50',
    busy: '#FF9800',
    offline: '#9E9E9E'
  };

  const handleContact = (type: 'email' | 'slack') => {
    if (type === 'email' && email) {
      window.location.href = `mailto:${email}`;
    } else if (type === 'slack' && slack) {
      // Open Slack deep link or web app
      window.open(`slack://user?team=YOUR_TEAM_ID&id=${slack}`, '_blank');
    }
  };

  return (
    <div
      className={clsx('contact-card', { 'contact-card--compact': compact })}
      style={{
        display: 'flex',
        alignItems: compact ? 'center' : 'flex-start',
        gap: '12px',
        padding: compact ? '8px 12px' : '16px',
        background: 'var(--ifm-background-color)',
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {avatar ? (
          <img
            src={avatar}
            alt={`${name} avatar`}
            style={{
              width: compact ? '32px' : '48px',
              height: compact ? '32px' : '48px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div
            style={{
              width: compact ? '32px' : '48px',
              height: compact ? '32px' : '48px',
              borderRadius: '50%',
              background: 'var(--ifm-color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: compact ? '14px' : '18px'
            }}
          >
            {name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: statusColors[status],
            border: '2px solid var(--ifm-background-color)'
          }}
          title={`Status: ${status}`}
        />
      </div>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <h4 style={{ margin: 0, fontSize: compact ? '14px' : '16px' }}>{name}</h4>
        </div>
        <p style={{ margin: 0, fontSize: compact ? '12px' : '14px', color: 'var(--ifm-color-content-secondary)' }}>
          {role}
        </p>
        
        {!compact && responsibilities.length > 0 && (
          <div style={{ marginTop: '8px' }}>
            {responsibilities.slice(0, 2).map((resp, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  padding: '2px 6px',
                  margin: '2px 4px 2px 0',
                  background: 'var(--ifm-color-emphasis-100)',
                  borderRadius: '4px',
                  color: 'var(--ifm-color-content-secondary)'
                }}
              >
                {resp}
              </span>
            ))}
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          {email && (
            <button
              onClick={() => handleContact('email')}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                border: '1px solid var(--ifm-color-primary)',
                background: 'transparent',
                color: 'var(--ifm-color-primary)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              📧 Email
            </button>
          )}
          {slack && (
            <button
              onClick={() => handleContact('slack')}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                border: '1px solid var(--ifm-color-secondary)',
                background: 'transparent',
                color: 'var(--ifm-color-secondary)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              💬 Slack
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// QuickActions Component - For common task shortcuts
interface QuickActionsProps {
  title?: string;
  actions: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: string;
    external?: boolean;
    description?: string;
  }>;
  layout?: 'grid' | 'list';
  compact?: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  title = 'Quick Actions',
  actions,
  layout = 'grid',
  compact = false
}) => {
  const handleAction = (action: any) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      if (action.external) {
        window.open(action.href, '_blank');
      } else {
        window.location.href = action.href;
      }
    }
  };

  return (
    <div className="quick-actions" style={{ marginBottom: '1.5rem' }}>
      {title && (
        <h3 style={{ 
          fontSize: compact ? '1rem' : '1.2rem', 
          marginBottom: '1rem',
          color: 'var(--ifm-color-content)' 
        }}>
          {title}
        </h3>
      )}
      <div
        style={{
          display: layout === 'grid' ? 'grid' : 'flex',
          gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fit, minmax(200px, 1fr))' : undefined,
          flexDirection: layout === 'list' ? 'column' : undefined,
          gap: compact ? '8px' : '12px'
        }}
      >
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => handleAction(action)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: compact ? '8px 12px' : '12px 16px',
              background: 'var(--ifm-background-color)',
              border: '2px solid var(--ifm-color-emphasis-200)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              fontSize: compact ? '13px' : '14px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-200)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {action.icon && (
              <span style={{ fontSize: compact ? '16px' : '18px' }}>
                {action.icon}
              </span>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '500', color: 'var(--ifm-color-content)' }}>
                {action.label}
              </div>
              {action.description && !compact && (
                <div style={{ 
                  fontSize: '12px', 
                  color: 'var(--ifm-color-content-secondary)',
                  marginTop: '2px'
                }}>
                  {action.description}
                </div>
              )}
            </div>
            {action.external && (
              <span style={{ fontSize: '12px', opacity: 0.6 }}>↗</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// MetricsCard Component - For displaying analytics/metrics
interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
  };
  icon?: string;
  color?: string;
  format?: 'number' | 'percentage' | 'currency' | 'duration';
  size?: 'small' | 'medium' | 'large';
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'var(--ifm-color-primary)',
  format = 'number',
  size = 'medium'
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'percentage':
        return `${val.toFixed(1)}%`;
      case 'currency':
        return `$${val.toLocaleString()}`;
      case 'duration':
        return `${val}ms`;
      default:
        return val.toLocaleString();
    }
  };

  const sizeStyles = {
    small: { padding: '12px', fontSize: '0.9rem' },
    medium: { padding: '16px', fontSize: '1rem' },
    large: { padding: '20px', fontSize: '1.1rem' }
  };

  return (
    <div
      className="metrics-card"
      style={{
        background: 'var(--ifm-background-color)',
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease',
        ...sizeStyles[size]
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h4 style={{ 
          margin: 0, 
          color: 'var(--ifm-color-content-secondary)', 
          fontSize: size === 'small' ? '0.8rem' : '0.9rem',
          fontWeight: '500'
        }}>
          {title}
        </h4>
        {icon && (
          <span style={{ fontSize: size === 'small' ? '18px' : '20px' }}>
            {icon}
          </span>
        )}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span 
          style={{ 
            fontSize: size === 'small' ? '1.5rem' : size === 'large' ? '2.2rem' : '2rem',
            fontWeight: 'bold',
            color: color,
            lineHeight: 1
          }}
        >
          {formatValue(value)}
        </span>
        
        {change && (
          <span
            style={{
              fontSize: '0.8rem',
              color: change.value > 0 ? '#4CAF50' : change.value < 0 ? '#f44336' : 'var(--ifm-color-content-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            {change.value > 0 ? '↗' : change.value < 0 ? '↘' : '→'}
            {Math.abs(change.value)}% {change.period}
          </span>
        )}
      </div>
    </div>
  );
};
