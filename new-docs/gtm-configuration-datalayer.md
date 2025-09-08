# GTM Configuration & DataLayer

Google Tag Manager configuration and dataLayer implementation for UAGC's personalization and analytics framework.

:::tip Personalization Integration
This GTM setup supports our **[Personalization Strategy](https://omac049.github.io/UAGC-Strategic-Intelligence/cookie/UAGC-cookie-personalization.html)** for achieving **20-25% RFI increase** through intelligent visitor journey tracking and content personalization.
:::

## Overview

Google Tag Manager serves as the central hub for all tracking, personalization, and analytics implementation across UAGC digital properties. This configuration supports:

- **Visitor Journey Tracking** - 4-stage progression monitoring
- **UTM Attribution** - 25+ parameter governance framework  
- **Personalization Triggers** - Content variant delivery
- **Privacy Compliance** - OneTrust integration for GDPR/CCPA
- **Lead Scoring** - Real-time behavioral scoring updates

## DataLayer Architecture

### Core DataLayer Structure

The dataLayer follows a hierarchical structure supporting both analytics and personalization:

```javascript
window.dataLayer = window.dataLayer || [];

// Standard page tracking
window.dataLayer.push({
  'event': 'page_view_enhanced',
  'page_location': window.location.href,
  'page_title': document.title,
  'page_type': 'program_page',
  'visitor_id': 'vis_abc123xyz',
  'journey_stage': 'interest',
  'visitor_segment': 'military_affiliated',
  'personalization_active': true,
  'utm_source': 'google',
  'utm_medium': 'cpc',
  'utm_campaign': 'fall2025_click-to-lead'
});
```

### Visitor Identity Layer

```javascript
// Visitor identification and segmentation
window.dataLayer.push({
  'visitor_id': 'vis_abc123xyz',
  'visitor_type': 'returning', // new, returning, known_lead
  'journey_stage': 'consideration', // awareness, interest, consideration, intent
  'visitor_segment': 'military_affiliated',
  'previous_visits': 3,
  'total_page_views': 12,
  'lead_score': 48,
  'enrollment_probability': 0.68,
  'cookie_consent_analytics': true,
  'cookie_consent_personalization': true,
  'session_start_time': '2025-03-15T10:30:00Z'
});
```

## Personalization Configuration

### Journey Stage Triggers

#### Awareness Stage Trigger

```javascript
// Trigger: New visitor identification
{
  'trigger_name': 'Journey - Awareness Stage',
  'trigger_type': 'Custom Event',
  'custom_event_name': 'visitor_first_session',
  'conditions': [
    {'variable': 'visitor_type', 'operator': 'equals', 'value': 'new'},
    {'variable': 'journey_stage', 'operator': 'equals', 'value': 'awareness'}
  ]
}
```

#### Interest Stage Trigger

```javascript
// Trigger: Content engagement threshold
{
  'trigger_name': 'Journey - Interest Stage',
  'trigger_type': 'Custom Event', 
  'custom_event_name': 'journey_stage_advance',
  'conditions': [
    {'variable': 'current_stage', 'operator': 'equals', 'value': 'interest'},
    {'variable': 'page_views_session', 'operator': 'greater than', 'value': '2'}
  ]
}
```

#### Consideration Stage Trigger

```javascript
// Trigger: Form interaction or resource download
{
  'trigger_name': 'Journey - Consideration Stage',
  'trigger_type': 'Custom Event',
  'custom_event_name': 'high_intent_behavior',
  'conditions': [
    {'variable': 'event', 'operator': 'matches RegEx', 'value': '(form_start|resource_download|program_comparison)'},
    {'variable': 'journey_stage', 'operator': 'equals', 'value': 'consideration'}
  ]
}
```

### Personalization Tags

#### Content Variant Tag

```javascript
// Tag: Deliver personalized content
{
  'tag_name': 'Personalization - Content Variant',
  'tag_type': 'Custom HTML',
  'html': `
    <script>
      // Personalization logic
      const visitorSegment = {{Visitor Segment}};
      const journeyStage = {{Journey Stage}};
      
      if (visitorSegment === 'military_affiliated' && journeyStage === 'interest') {
        // Show military-specific content
        document.querySelector('.hero-content').innerHTML = 
          '<h1>Military Benefits & Education</h1><p>Use your GI Bill benefits...</p>';
        
        // Track personalization delivery
        dataLayer.push({
          'event': 'personalization_served',
          'variant_id': 'military_hero_v2',
          'personalization_type': 'content_variant'
        });
      }
    </script>
  `,
  'triggers': ['Journey - Interest Stage', 'Military Segment Identified']
}
```

#### Lead Scoring Tag

```javascript
// Tag: Update lead score
{
  'tag_name': 'Lead Scoring - Behavioral Update',
  'tag_type': 'Custom HTML',
  'html': `
    <script>
      // Calculate lead score update
      const currentScore = parseInt({{Lead Score}}) || 0;
      const eventType = {{Event}};
      
      let scoreIncrease = 0;
      switch(eventType) {
        case 'program_view': scoreIncrease = 5; break;
        case 'resource_download': scoreIncrease = 10; break;
        case 'form_start': scoreIncrease = 15; break;
        case 'rfi_submit': scoreIncrease = 25; break;
      }
      
      const newScore = currentScore + scoreIncrease;
      
      // Update lead score in dataLayer
      dataLayer.push({
        'event': 'lead_score_update',
        'previous_score': currentScore,
        'current_score': newScore,
        'score_factor': eventType,
        'predicted_enrollment_probability': newScore / 100
      });
    </script>
  `,
  'triggers': ['All Engagement Events']
}
```

## Variables Configuration

### Built-in Variables

Enable these built-in variables for comprehensive tracking:

- ✅ **Page URL** - Full page URL with parameters
- ✅ **Page Hostname** - Domain tracking
- ✅ **Page Path** - URL path for page categorization  
- ✅ **Page Title** - Document title
- ✅ **Referrer** - Traffic source referrer
- ✅ **Click Element** - Element interaction tracking
- ✅ **Click Text** - Clicked text content
- ✅ **Form Element** - Form interaction details

### Custom Variables

#### Visitor Journey Variables

```javascript
// Variable: Journey Stage
{
  'variable_name': 'Journey Stage',
  'variable_type': 'Data Layer Variable',
  'data_layer_variable_name': 'journey_stage',
  'default_value': 'awareness'
}

// Variable: Visitor Segment  
{
  'variable_name': 'Visitor Segment',
  'variable_type': 'Data Layer Variable',
  'data_layer_variable_name': 'visitor_segment',
  'default_value': 'general'
}

// Variable: Lead Score
{
  'variable_name': 'Lead Score',
  'variable_type': 'Data Layer Variable', 
  'data_layer_variable_name': 'lead_score',
  'default_value': '0'
}
```

#### UTM Tracking Variables

```javascript
// Variable: UTM Source (with fallback)
{
  'variable_name': 'UTM Source Enhanced',
  'variable_type': 'Custom JavaScript',
  'code': `
    function() {
      return {{dlv - utm_source}} || 
             {{URL - utm_source}} || 
             {{Referrer}} === '' ? 'direct' : 'referral';
    }
  `
}

// Variable: Campaign Attribution
{
  'variable_name': 'Campaign Attribution',
  'variable_type': 'Custom JavaScript',
  'code': `
    function() {
      return {
        'source': {{UTM Source Enhanced}},
        'medium': {{dlv - utm_medium}} || 'organic',
        'campaign': {{dlv - utm_campaign}} || 'not_set',
        'content': {{dlv - utm_content}} || '',
        'term': {{dlv - utm_term}} || ''
      };
    }
  `
}
```

### Personalization Variables

```javascript
// Variable: Personalization Eligibility
{
  'variable_name': 'Personalization Eligible',
  'variable_type': 'Custom JavaScript',
  'code': `
    function() {
      const cookieConsent = {{dlv - cookie_consent_personalization}};
      const journeyStage = {{Journey Stage}};
      const visitorType = {{dlv - visitor_type}};
      
      return cookieConsent && 
             journeyStage !== 'awareness' && 
             visitorType !== 'new';
    }
  `
}

// Variable: Content Variant ID
{
  'variable_name': 'Content Variant ID',
  'variable_type': 'Custom JavaScript',
  'code': `
    function() {
      const segment = {{Visitor Segment}};
      const stage = {{Journey Stage}};
      
      // Content variant logic
      if (segment === 'military_affiliated') {
        return stage === 'interest' ? 'military_hero_v2' : 'military_benefits_v1';
      } else if (segment === 'working_professional') {
        return 'flexible_schedule_v1';
      }
      
      return 'default_content';
    }
  `
}
```

## Event Tracking Configuration

### Enhanced E-commerce Events

#### RFI Submission Event

```javascript
// RFI Form Submission
dataLayer.push({
  'event': 'form_submit',
  'form_type': 'rfi',
  'form_id': 'request-information-form',
  'program_interest': 'mba',
  'military_affiliation': 'yes',
  'lead_source': 'organic',
  'journey_stage': 'consideration',
  'ecommerce': {
    'event_name': 'generate_lead',
    'value': 50.00, // Lead value
    'currency': 'USD',
    'items': [{
      'item_id': 'rfi_mba',
      'item_name': 'MBA Program Interest',
      'item_category': 'graduate_programs',
      'quantity': 1,
      'price': 50.00
    }]
  }
});
```

#### Application Start Event

```javascript
// Application Process Initiation
dataLayer.push({
  'event': 'begin_checkout',
  'journey_stage': 'intent',
  'application_type': 'graduate',
  'program_code': 'MBA',
  'lead_score': 75,
  'ecommerce': {
    'value': 200.00, // Application value
    'currency': 'USD',
    'items': [{
      'item_id': 'app_mba',
      'item_name': 'MBA Application',
      'item_category': 'applications',
      'quantity': 1,
      'price': 200.00
    }]
  }
});
```

### Privacy & Compliance Events

#### Cookie Consent Tracking

```javascript
// OneTrust Integration
dataLayer.push({
  'event': 'cookie_consent_update',
  'consent_analytics': true,
  'consent_marketing': false,
  'consent_personalization': true,
  'consent_timestamp': new Date().toISOString(),
  'consent_version': 'v2.1',
  'onetrust_active_groups': 'C0001,C0003', // Analytics + Personalization
  'visitor_id': {{Visitor ID}}
});
```

## Implementation Best Practices

### Performance Optimization

1. **Lazy Loading**: Load personalization scripts only when needed
2. **Caching**: Cache visitor segments for session duration
3. **Error Handling**: Graceful fallbacks for failed personalization
4. **Timeout Protection**: 3-second maximum for personalization delivery

### Testing & Validation

#### GTM Preview Mode Checklist

- ✅ All UTM parameters captured correctly
- ✅ Visitor journey stages advance properly  
- ✅ Personalization triggers fire when expected
- ✅ Lead scoring updates accurately
- ✅ Privacy consent respected
- ✅ Cross-domain tracking maintains visitor ID

#### DataLayer Validation Script

```javascript
// DataLayer validation utility
function validateDataLayer() {
  const dl = window.dataLayer || [];
  const required = ['visitor_id', 'journey_stage', 'visitor_segment'];
  
  const latest = dl[dl.length - 1];
  const missing = required.filter(field => !latest[field]);
  
  if (missing.length > 0) {
    console.warn('Missing required dataLayer fields:', missing);
  }
  
  return missing.length === 0;
}
```

## Troubleshooting Guide

### Common Issues

| Issue | Symptoms | Solution |
|-------|----------|----------|
| **UTM Parameters Missing** | Attribution gaps in reporting | Check URL parameter preservation |
| **Journey Stage Not Advancing** | Visitors stuck in awareness | Verify event trigger conditions |
| **Personalization Not Showing** | Default content always displays | Check cookie consent status |
| **Lead Scores Not Updating** | Scores remain static | Validate behavioral event firing |

### Debug Tools

1. **GTM Preview Mode** - Real-time tag firing validation
2. **GA4 DebugView** - Event parameter verification  
3. **Browser Console** - DataLayer inspection
4. **OneTrust Developer Tools** - Cookie consent validation

## Governance & Maintenance

- **Monthly Review** of trigger performance and optimization
- **Quarterly Audit** of personalization effectiveness
- **Annual Privacy Review** for compliance updates
- **Continuous Testing** of new personalization concepts

:::warning Implementation Note
All personalization tracking must be implemented with proper cookie consent integration. Ensure OneTrust categories are properly configured before enabling personalization features.
:::
