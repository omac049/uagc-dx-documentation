# GA4 Setup & Event Tracking

This document provides information about Google Analytics 4 (GA4) implementation and event tracking for the UAGC Digital Experience.

## Overview

Google Analytics 4 (GA4) is the primary analytics platform used for tracking user interactions across the UAGC digital properties. This guide covers the setup, configuration, and event tracking strategy.

## GA4 Implementation

### Account Structure

- **GA4 Property**: UAGC Digital Experience
- **Data Streams**: 
  - Website: uagc.edu
  - Mobile Apps: iOS and Android applications
  - Other Digital Properties: Connected through data streams

### Basic Configuration

The following configurations have been implemented in GA4:

- **Cross-domain tracking** to maintain user sessions across domains
- **Enhanced measurement** for automatic event collection
- **Google Signals** for demographic and interest reporting
- **User-ID** implementation for cross-device tracking
- **BigQuery export** for raw data analysis

## Event Tracking Strategy

Our event tracking follows a hierarchical model with four categories:

1. **Automatically collected events** - Built-in GA4 events (page_view, scroll, etc.)
2. **Enhanced measurement events** - GA4 automatic tracking (outbound clicks, file downloads, etc.)
3. **Recommended events** - Standard GA4 events (login, sign_up, etc.)
4. **Custom events** - UAGC-specific events (program_interest, application_step, etc.)

### Core Event Parameters

All tracked events should include these parameters when applicable:

- `page_location`: Full URL where the event occurred
- `page_title`: Title of the page
- `source`: Traffic source (where available)
- `user_role`: Type of user (prospect, student, etc.)
- `event_category`: General event category
- `event_label`: Specific event descriptor

## Event Implementation

### Implementation Methods

Events are implemented through:

1. **Google Tag Manager** - Primary method for most events
2. **Data Layer** - For complex or developer-implemented events
3. **GA4 Configuration Tag** - For basic configuration parameters

### Event Naming Conventions

Event names follow this pattern:

- Use lowercase snake_case
- Begin with an action verb (view, click, submit)
- Include the element type (form, button, link)
- Be descriptive but concise

Examples:
- `view_program_details`
- `start_application`
- `complete_form`
- `download_resource`

## Key Events Tracked

### Enrollment Funnel Events

- `view_program` - User views a program page
- `program_interest` - User indicates interest in a program
- `start_application` - User begins application process
- `application_step_complete` - User completes application step
- `application_submit` - User submits completed application
- `enrollment_complete` - User completes enrollment

### Engagement Events

- `resource_download` - User downloads a document
- `video_start` - User starts a video
- `video_complete` - User completes a video
- `form_start` - User starts filling a form
- `form_submit` - User submits a form
- `chat_start` - User initiates chat
- `search_perform` - User performs site search

## Event Validation

All implemented events should be validated through:

1. **GA4 DebugView** - For real-time testing
2. **Tag Assistant** - For tag verification
3. **BigQuery Export** - For data validation
4. **GA4 Reporting** - For event reporting validation

## Reporting & Analysis

### Standard Reports

GA4 standard reports provide insights on:

- **Acquisition**: Traffic sources and campaign performance
- **Engagement**: User interaction and content performance
- **Monetization**: Conversion goal performance
- **Retention**: User return rates and loyalty

### Custom Reports

Custom reports have been created for:

- **Enrollment Funnel Analysis** - Tracking progression through stages
- **Content Effectiveness** - Measuring content engagement
- **Program Performance** - Comparing program interest and conversion
- **Marketing Campaign Attribution** - Evaluating campaign effectiveness

## Related Documentation

- [Analytics Strategy & Governance](analytics-standards.md)
- [KPIs for Enrollment Funnel](enrollment-funnel-kpis.md)
- [GTM Configuration & dataLayer](gtm-configuration-datalayer.md)
- [BigQuery Pipelines](guides/bigquery.md) 