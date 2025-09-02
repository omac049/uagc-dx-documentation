---
comments: true
---

# BigQuery Pipelines

This guide covers the configuration and use of BigQuery for analytics data pipelines at UAGC.

## Overview

BigQuery is our data warehouse solution that stores and processes analytics data from GA4 and other sources. We use it to:

- Create custom reports beyond what GA4 interface provides
- Build data pipelines for dashboards and BI tools
- Perform complex analysis on user behavior and marketing performance

## Data Sources

Our BigQuery pipelines pull data from several sources:

- GA4 export (primary web analytics data)
- CRM data exports (enrollment and student data)
- Marketing campaign data
- Ad platform data

## Standard Pipeline Setup

### GA4 to BigQuery Connection

The GA4 data is automatically exported to BigQuery through the following setup:

1. GA4 property linked to BigQuery project
2. Data streams configured for daily export
3. Schema maintained by Google with automated updates

### Access and Permissions

Access to BigQuery is managed through:

- **Analyst Role**: Read-only access to all datasets
- **Engineer Role**: Read and transform capabilities
- **Admin Role**: Full configuration access

Contact Omar to request appropriate access levels.

## Common Queries

### Basic User Path Analysis

```sql
SELECT
  event_date,
  user_pseudo_id,
  event_name,
  page_location,
  page_title
FROM
  `uagc-analytics.analytics_XXXXXX.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250501' AND '20250531'
  AND event_name IN ('page_view', 'form_start', 'form_submit')
ORDER BY
  user_pseudo_id,
  event_timestamp
```

### Conversion Path Analysis

```sql
SELECT
  user_pseudo_id,
  ARRAY_AGG(
    STRUCT(
      event_timestamp,
      event_name,
      page_location,
      traffic_source.source AS traffic_source
    )
    ORDER BY event_timestamp ASC
  ) AS user_journey
FROM
  `uagc-analytics.analytics_XXXXXX.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250501' AND '20250531'
  AND user_pseudo_id IN (
    SELECT DISTINCT user_pseudo_id
    FROM `uagc-analytics.analytics_XXXXXX.events_*`
    WHERE 
      _TABLE_SUFFIX BETWEEN '20250501' AND '20250531'
      AND event_name = 'generate_lead'
  )
GROUP BY
  user_pseudo_id
```

## Dashboard Connections

We connect BigQuery to several visualization platforms:

1. **Google Data Studio/Looker Studio**: Primary dashboarding tool
2. **Tableau**: For advanced visualizations
3. **Custom internal dashboards**: Built on our intranet

## Troubleshooting

### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Missing data | Check export settings in GA4 admin |
| Query timeout | Optimize query or use scheduled queries |
| Permission denied | Contact Omar to verify access roles |
| Cost concerns | Use query optimization and partitioning |

### Query Optimization Tips

1. Always filter by date using _TABLE_SUFFIX
2. Include LIMIT when developing new queries
3. Use partitioned and clustered tables when possible
4. Avoid SELECT * in production queries

## Support and Resources

- **Internal Contact**: Omar (SEO & Tracking Manager)
- **Documentation**: [Google BigQuery Documentation](https://cloud.google.com/bigquery/docs)
- **GA4 Schema Reference**: [GA4 BigQuery Export schema](https://support.google.com/analytics/answer/7029846)

## Request New Analysis

To request a new analysis or dashboard:

1. Create an Asana task using the **Analytics Request** template
2. Include specific KPIs and metrics needed
3. Note the time range for analysis
4. Specify visualization preferences

## Maintenance Schedule

The BigQuery export pipeline is maintained according to this schedule:

- **Daily**: Automated monitoring for failed exports
- **Weekly**: Performance optimization review
- **Monthly**: Cost optimization review
- **Quarterly**: Schema and pipeline architecture review

---

!!! note "Training Available"
    Contact Omar to schedule a training session for accessing and querying BigQuery data. 