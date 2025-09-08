# Analytics Standards

This document outlines the standards and best practices for analytics implementation across the UAGC website.

:::tip Strategic Resources
For comprehensive SEO and analytics strategy, see our **[Strategic Intelligence Suite](https://omac049.github.io/UAGC-Strategic-Intelligence/)** which includes:
- **[SEO & CRO Strategy](https://omac049.github.io/UAGC-Strategic-Intelligence/seo-cro-audit-uagc.html)** - 40-60% traffic growth analysis
- **[Personalization Strategy](https://omac049.github.io/UAGC-Strategic-Intelligence/cookie/UAGC-cookie-personalization.html)** - 20-25% RFI increase framework
- **[SEO QBR Dashboard](https://omac049.github.io/uagc_seo_cro_qbr/)** - Quarterly performance review
- **[LLM Optimization Strategy](https://omac049.github.io/uagc-seo-llm-optimization/)** - Search visibility optimization
:::

## Quick Navigation

- [UTM Framework & Attribution](#utm-framework--attribution)
- [Personalization Tracking](#personalization-tracking)
- [Visitor Journey Analytics](#visitor-journey-analytics)
- [Privacy & Compliance](#privacy--compliance)
- [Success Metrics](#success-metrics)

## GA4 Implementation

### Event Naming Conventions

We follow these standard naming conventions for GA4 events:

- Use snake_case for event names
- Keep names descriptive but concise
- Follow a consistent verb_noun pattern where possible

Examples of standardized event names:
- `page_view`
- `form_start`
- `form_submit` 
- `form_error`
- `click_cta`
- `download_document`

### Parameters and Values

Standard parameters to include with events:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `page_location` | Full URL of the page | `https://www.uagc.edu/admissions` |
| `page_title` | Title of the page | `Admissions - UAGC` |
| `event_category` | Category of the event | `form`, `navigation`, `engagement` |
| `event_label` | Descriptive label | `RFI Form`, `Hero CTA` |
| `item_id` | ID of the item interacted with | `rfi-form-homepage` |

## DataLayer Implementation

### DataLayer Structure

Our dataLayer follows this structure:

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'event': 'event_name',
  'eventCategory': 'category',
  'eventAction': 'action',
  'eventLabel': 'label',
  'additionalData1': 'value',
  'additionalData2': 'value'
});
```

### Common DataLayer Events

Events that should always be tracked:

- Page views
- Form interactions (start, complete, error)
- CTA clicks
- Video interactions (play, pause, complete)
- File downloads
- Optimizely experiment views and conversions

## Experiment Tracking

### Optimizely Integration

When setting up experiments, ensure these tracking elements are in place:

1. Experiment view event when variation is shown
2. Conversion events for primary and secondary metrics
3. Custom dimension for experiment name and variation

Example GA4 event for experiment view:
```javascript
window.dataLayer.push({
  'event': 'experiment_view',
  'experimentName': 'homepage_hero_test',
  'experimentVariation': 'variation_1',
  'experimentId': 'EXP123'
});
```

## Implementation Verification

Before launch, verify that:

1. All required events fire correctly
2. Custom dimensions pass the right values
3. Events show up in GA4 DebugView
4. DataLayer contains all required information
5. No duplicate events are firing

## UTM Framework & Attribution

### UTM Parameter Governance

Based on our **[Personalization Strategy](https://omac049.github.io/UAGC-Strategic-Intelligence/cookie/UAGC-cookie-personalization.html)**, we implement a comprehensive 25-parameter tracking framework to achieve **90%+ campaign attribution preservation**.

#### Standard UTM Parameters

| Parameter | Format & Example |
|-----------|------------------|
| `utm_source` | lowercase, no spaces<br/>`facebook`, `google`, `email` |
| `utm_medium` | channel type<br/>`cpc`, `social`, `email`, `display` |
| `utm_campaign` | `[timing]_[initiative]`<br/>`fall2025_click-to-lead` |
| `utm_content` | `[type]_[identifier]`<br/>`video_testimonial`, `text_cta` |
| `utm_term` | keywords with + signs<br/>`online+mba+program` |

#### Custom Tracking Parameters

| Parameter | Purpose | Example |
|-----------|---------|---------|
| `sourceid` | Internal tracking ID | `18SGB`, `src123456` |
| `affiliateid` | Partner identification | `partner_eduportal` |
| `clickid` | Unique click tracking | `clk_abc123xyz` |
| `utm_vendor` | Lead gen vendor | `leadgenpartner` |
| `adgroup` | Google/Bing Ads targeting | `mba_degree_programs` |

#### Campaign Structure Examples

**Awareness Campaign:**
```
https://www.uagc.edu/programs/mba?utm_source=google&utm_medium=cpc&utm_campaign=fall2025_awareness&utm_content=text_mba&utm_term=online+mba+program
```

**Click-to-Lead Campaign:**
```
https://www.uagc.edu/programs/mba?utm_source=google&utm_medium=cpc&utm_campaign=fall2025_click-to-lead&utm_content=text_mba&adgroup=mba_degree_programs&ad=headline_test_a
```

## Personalization Tracking

### Visitor Journey Stages

Our personalization framework tracks users through **4 distinct journey stages**:

| Stage | Description | Key Events | Duration |
|-------|-------------|------------|----------|
| **Awareness** | First-time visitor discovery | `visitor_first_session`, `utm_capture` | 0-7 days |
| **Interest** | Content engagement & exploration | `program_view`, `resource_download` | 7-30 days |
| **Consideration** | Form interactions & lead capture | `form_start`, `rfi_submit` | 30-60 days |
| **Intent** | Application & enrollment actions | `application_start`, `enrollment_complete` | 60-90 days |

### Personalization Events

#### Journey Progression Events

```javascript
// Journey stage advancement
window.dataLayer.push({
  'event': 'journey_stage_advance',
  'previous_stage': 'awareness',
  'current_stage': 'interest',
  'journey_days': 5,
  'visitor_segment': 'military_affiliated',
  'personalization_active': true
});
```

#### Content Personalization Events

```javascript
// Personalized content delivery
window.dataLayer.push({
  'event': 'personalization_served',
  'personalization_type': 'content_variant',
  'variant_id': 'military_hero_v2',
  'visitor_segment': 'military_affiliated',
  'journey_stage': 'interest',
  'ab_test_active': true
});
```

#### Lead Scoring Events

```javascript
// Real-time lead scoring updates
window.dataLayer.push({
  'event': 'lead_score_update',
  'previous_score': 35,
  'current_score': 48,
  'score_factors': ['program_view', 'resource_download'],
  'predicted_enrollment_probability': 0.68
});
```

## Visitor Journey Analytics

### Cookie-Based Visitor Identification

Our **90-day cookie persistence** framework tracks visitor progression:

#### Visitor Segments

| Segment | Identification Criteria | Personalization Strategy |
|---------|------------------------|--------------------------|
| **New Visitor** | First session, no cookie | Generic awareness content |
| **Returning Visitor** | Existing cookie, < 30 days | Progressive engagement content |
| **Military Affiliated** | UTM military params or form data | Military-specific benefits focus |
| **Program Specific** | Visited specific program pages | Targeted program content |
| **High Intent** | RFI submitted, multiple sessions | Application-focused messaging |

#### Cross-Domain Tracking

```javascript
// Cross-domain visitor persistence
window.dataLayer.push({
  'event': 'cross_domain_tracking',
  'source_domain': 'uagc.edu',
  'destination_domain': 'apply.uagc.edu',
  'visitor_id': 'vis_abc123xyz',
  'journey_stage': 'consideration',
  'session_continuity': true
});
```

### Attribution Preservation

#### Multi-Touch Attribution Events

```javascript
// Attribution touchpoint tracking
window.dataLayer.push({
  'event': 'attribution_touchpoint',
  'touchpoint_type': 'paid_search',
  'campaign_id': 'fall2025_click-to-lead',
  'touchpoint_sequence': 3,
  'time_since_first_touch': 1440, // minutes
  'attribution_value': 0.35
});
```

## Privacy & Compliance

### Cookie Consent Integration

#### OneTrust Integration Events

```javascript
// Cookie consent tracking
window.dataLayer.push({
  'event': 'cookie_consent_update',
  'consent_analytics': true,
  'consent_marketing': true,
  'consent_personalization': false,
  'consent_timestamp': '2025-03-15T10:30:00Z',
  'consent_version': 'v2.1'
});
```

#### GDPR/CCPA Compliance Events

```javascript
// Privacy regulation compliance
window.dataLayer.push({
  'event': 'privacy_compliance_action',
  'action_type': 'data_deletion_request',
  'regulation': 'GDPR',
  'visitor_id': 'vis_abc123xyz',
  'request_timestamp': '2025-03-15T10:30:00Z'
});
```

### Data Minimization

Only collect necessary data points:
- **Required**: Journey stage, visitor segment, conversion events
- **Optional**: Demographic data (with consent)
- **Prohibited**: PII without explicit consent and purpose

## Success Metrics

### Personalization KPIs

Based on our strategic targets:

| Metric | Target | Current | Tracking Method |
|--------|--------|---------|-----------------|
| **Campaign Attribution Preservation** | 90%+ | TBD | UTM parameter persistence |
| **RFI Submission Increase** | 20-25% | Baseline | A/B testing vs. control |
| **Lead Scoring Accuracy** | 87%+ | TBD | Enrollment correlation analysis |
| **ROI Improvement** | 10%+ | TBD | Revenue per visitor tracking |
| **Conversion Rate Lift** | 5%+ | TBD | Funnel optimization analysis |

### Attribution Accuracy Monitoring

```javascript
// Attribution accuracy validation
window.dataLayer.push({
  'event': 'attribution_validation',
  'original_utm_source': 'google',
  'final_conversion_source': 'google',
  'attribution_match': true,
  'journey_duration_days': 14,
  'touchpoint_count': 5
});
```

### Performance Impact Tracking

```javascript
// Personalization performance impact
window.dataLayer.push({
  'event': 'personalization_performance',
  'page_load_impact_ms': 45,
  'script_execution_time_ms': 12,
  'cookie_size_bytes': 2048,
  'performance_score': 'good'
});
```

## Implementation Timeline

### Phase 1: Foundation (Q3 2025)
- UTM parameter standardization
- Basic visitor journey tracking
- Cookie consent implementation

### Phase 2: Launch (Q4 2025)
- Personalization campaign activation
- Advanced attribution tracking
- Lead scoring implementation

### Phase 3: Scale (2026)
- Full cross-domain tracking
- Advanced segmentation
- Continuous optimization

## Governance

- **Omar** oversees all analytics implementation and standards
- **Personalization Committee** approves tracking additions for visitor journey
- Any changes to tracking structure must be approved before implementation
- Documentation must be updated when new tracking patterns are introduced
- **Privacy Review** required for any new data collection points
- **Quarterly Review** of personalization metrics and optimization opportunities 