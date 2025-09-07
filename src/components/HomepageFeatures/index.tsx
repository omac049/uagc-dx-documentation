import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { StatusBadge, QuickActions, MetricsCard } from '../TimestampTracker';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Getting Started',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Onboarding guides, daily operations, and foundational information
        to get you up and running with the DX team processes.
      </>
    ),
    link: '/getting-started'
  },
  {
    title: 'QA & Development',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Development standards, QA processes, release management,
        and technical documentation for maintaining uagc.edu.
      </>
    ),
    link: '/guides/qa-smoke-test'
  },
  {
    title: 'Analytics & Tracking',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        GA4, GTM, BigQuery pipelines, and comprehensive tracking
        implementation for data-driven decision making.
      </>
    ),
    link: '/analytics-standards'
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <a href={link} className={styles.featureLink}>{title}</a>
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  // UAGC-specific quick actions for the team
  const uagcQuickActions = [
    {
      label: 'QA Smoke Test',
      href: '/guides/qa-smoke-test',
      icon: '🧪',
      description: 'Run comprehensive site testing checklist'
    },
    {
      label: 'Analytics Check',
      href: '/analytics-standards',
      icon: '📈',
      description: 'Verify GA4 and GTM implementation'
    },
    {
      label: 'Performance Audit',
      href: '/guides/performance-web-vitals',
      icon: '⚡',
      description: 'Check Core Web Vitals and page speed'
    },
    {
      label: 'Accessibility Scan',
      href: '/wcag-compliance',
      icon: '♿',
      description: 'WCAG compliance verification tools'
    },
    {
      label: 'SEO Health Check',
      href: '/guides/seo-hygiene',
      icon: '🔍',
      description: 'Technical SEO audit and recommendations'
    },
    {
      label: 'Team Directory',
      href: '/who-does-what',
      icon: '👥',
      description: 'Contact info and responsibilities'
    }
  ];

  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Quick Actions Section */}
      <section style={{ padding: '2rem 0', background: 'var(--ifm-background-surface-color)' }}>
        <div className="container">
          <div className="row">
            <div className="col col--8">
              <QuickActions 
                title="🚀 Common DX Tasks"
                actions={uagcQuickActions}
                layout="grid"
              />
            </div>
            <div className="col col--4">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>📊 Site Health</h3>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    <MetricsCard
                      title="Pages Documented"
                      value={32}
                      icon="📚"
                      size="small"
                      change={{ value: 8, period: 'this month' }}
                    />
                    <MetricsCard
                      title="Search Performance"
                      value={98.2}
                      format="percentage"
                      icon="🔍"
                      size="small"
                      color="var(--ifm-color-success)"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>🏷️ Implementation Status</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <StatusBadge status="completed" text="GA4 Setup" size="small" />
                    <StatusBadge status="in-progress" text="A/B Testing" size="small" />
                    <StatusBadge status="planned" text="PWA" size="small" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
