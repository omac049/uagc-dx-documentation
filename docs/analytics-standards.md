# Analytics Standards

This document outlines the standards and best practices for analytics implementation across the UAGC website.

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

## Governance

- Omar oversees all analytics implementation and standards
- Any changes to tracking structure must be approved before implementation
- Documentation must be updated when new tracking patterns are introduced 