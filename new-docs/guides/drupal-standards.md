# Drupal Coding Standards & Snippet Library

This guide provides coding standards, best practices, and reusable code snippets for Drupal development at UAGC.

!!! warning "Important"
    Following these standards is mandatory for all Drupal development to ensure code quality, maintainability, and security.

## Coding Standards

Our Drupal development follows the official [Drupal Coding Standards](https://www.drupal.org/docs/develop/standards) with some additional team-specific guidelines.

### PHP Standards

=== "Formatting"
    - Use 2 spaces for indentation (not tabs)
    - Line length should not exceed 80 characters
    - Opening braces for classes and functions on the same line
    - Use meaningful variable and function names
    ```php
    function example_module_get_content($node_id, $options = []) {
      $result = [];
      // Implementation here
      return $result;
    }
    ```

=== "Documentation"
    - All functions require docblock comments
    - Comments should explain "why", not "what"
    - Use `@param`, `@return`, `@throws` tags properly
    ```php
    /**
     * Retrieves formatted content for a specific node.
     *
     * @param int $node_id
     *   The node ID to fetch content for.
     * @param array $options
     *   (optional) Additional options for content retrieval.
     *
     * @return array
     *   Structured array of node content.
     *
     * @throws \Drupal\Core\Entity\EntityMalformedException
     *   When the node cannot be loaded or is invalid.
     */
    function example_module_get_content($node_id, $options = []) {
      // Implementation here
    }
    ```

=== "Naming Conventions"
    - Module names: lowercase, underscores for spaces
    - Function names: [module_name]_[description]
    - Classes: CamelCase
    - Variables: snake_case
    - Constants: ALL_CAPS_WITH_UNDERSCORES

### JavaScript Standards

- Follow Drupal JavaScript coding standards
- Use ES6 features with Babel transpilation
- Document with JSDoc comments
- Maintain proper namespacing for behaviors

### CSS/SCSS Standards

- Use BEM (Block Element Modifier) methodology
- Maintain proper component namespacing
- Structure SCSS files by component
- Use variables for colors, fonts, and spacing

## Security Best Practices

1. **Input Validation & Sanitization**
   - Always validate and sanitize user input
   - Use Drupal's sanitization functions
   - Implement proper access checks

2. **Database Queries**
   - Use parameterized queries with `db_query()`
   - Implement entity queries instead of raw SQL when possible
   - Never use user input directly in queries

3. **Form API Usage**
   - Implement proper form validation
   - Use CSRF tokens with `#token`
   - Check user permissions

## Performance Considerations

- Implement appropriate caching strategies
- Use lazy loading where appropriate
- Optimize database queries
- Implement efficient render arrays

## Snippet Library

### Entity Loading

```php
// Load a node by ID
$node = \Drupal\node\Entity\Node::load($node_id);

// Load multiple nodes
$nodes = \Drupal\node\Entity\Node::loadMultiple($node_ids);

// Load by properties
$query = \Drupal::entityQuery('node')
  ->condition('type', 'article')
  ->condition('status', 1)
  ->range(0, 10);
$nids = $query->execute();
$nodes = \Drupal\node\Entity\Node::loadMultiple($nids);
```

### Custom Block Creation

```php
use Drupal\block_content\Entity\BlockContent;

// Create a custom block
$block = BlockContent::create([
  'type' => 'basic',
  'info' => 'Block title',
  'body' => [
    'value' => 'Block content here',
    'format' => 'full_html',
  ],
]);
$block->save();
```

### Form API Example

```php
/**
 * Implements hook_form().
 */
function example_module_form($form, &$form_state) {
  $form['name'] = [
    '#type' => 'textfield',
    '#title' => t('Name'),
    '#required' => TRUE,
    '#maxlength' => 64,
  ];
  
  $form['email'] = [
    '#type' => 'email',
    '#title' => t('Email'),
    '#required' => TRUE,
  ];
  
  $form['submit'] = [
    '#type' => 'submit',
    '#value' => t('Submit'),
  ];
  
  return $form;
}

/**
 * Form validation handler.
 */
function example_module_form_validate($form, &$form_state) {
  // Validation logic here
}

/**
 * Form submission handler.
 */
function example_module_form_submit($form, &$form_state) {
  // Submission handling here
}
```

### Custom AJAX Callback

```php
/**
 * Implements form with AJAX callback.
 */
function example_module_ajax_form($form, &$form_state) {
  $form['selection'] = [
    '#type' => 'select',
    '#title' => t('Choose an option'),
    '#options' => [
      '1' => t('Option 1'),
      '2' => t('Option 2'),
    ],
    '#ajax' => [
      'callback' => 'example_module_ajax_callback',
      'wrapper' => 'ajax-container',
      'method' => 'replace',
      'effect' => 'fade',
    ],
  ];
  
  $form['container'] = [
    '#type' => 'container',
    '#attributes' => ['id' => 'ajax-container'],
  ];
  
  return $form;
}

/**
 * AJAX callback function.
 */
function example_module_ajax_callback($form, &$form_state) {
  // Process and return the container element
  return $form['container'];
}
```

## Module Structure

Follow this structure for custom modules:

```
example_module/
├── example_module.info.yml
├── example_module.module
├── example_module.install
├── example_module.libraries.yml
├── example_module.routing.yml
├── example_module.services.yml
├── example_module.permissions.yml
├── src/
│   ├── Controller/
│   ├── Form/
│   ├── Plugin/
│   └── Service/
├── templates/
├── css/
├── js/
└── tests/
```

## Code Review Checklist

Before submitting code for review:

- [ ] Code follows Drupal coding standards
- [ ] All functions have proper documentation
- [ ] Security best practices are followed
- [ ] Performance considerations addressed
- [ ] Tests have been written and pass
- [ ] No PHP errors or warnings
- [ ] Module dependencies properly defined
- [ ] No hardcoded values that should be configurable

**Key Contact:** Jason (Senior Backend Drupal Engineer) 