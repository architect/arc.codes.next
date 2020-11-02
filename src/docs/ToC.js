let guides = [
  {
    'Get started': [
      'Quickstart',
      'Detailed setup',
      'Project Layout',
      'Going beyond "Hello World"',
      'Meet your new superpowers',
      'Upgrade guides',
    ]
  },
  {
    'Tutorials': [
      'Developing with cloud functions',
      'Working locally & offline',
      'Code sharing across functions',
      'Cloud function middleware',
      'Single page apps',
      'HTTP & WebSocket sessions',
      'Modeling & persisting data',
      'Background tasks',
      'Implementing CORS',
      'Logging & monitoring your app',
      'Assigning a domain name to your app',
      'Adding WebSockets to your app',
      'Using dependencies in your functions',
      'Extending Architect with macros',
      'Multiple AWS Accounts'
    ]
  },
  {
    'AWS': [
      'Configuration',
      'AWS credentials',
      'Custom IAM roles',
    ]
  }
]

let reference = [
  'Architect project structure',
  {
    'Architect manifest & config': [
      'Project manifest & config',
      'Function config file',
      'Environment file',
      'Playground',
    ]
  },
  {
    'arc pragmas': [
      '@app',
      '@aws',
      '@domain',
      '@events',
      '@http',
      '@indexes',
      '@proxy',
      '@queues',
      '@scheduled',
      '@static',
      '@tables',
      '@ws'
    ]
  },
  {
    'Static assets': [
      'Static',
      'CDN',
    ]
  },
  {
    'Functions': [
      'HTTP functions',
      'Database functions',
      'Scheduled functions',
      'Event functions',
      'Queue functions',
      'WebSocket functions',
    ]
  },
  {
    'Databases': [
      'Tables',
      'Indexes',
    ]
  },
  'Macros',
  {
    'CLI reference': [
      'deploy',
      'env',
      'hydrate',
      'init',
      'logs',
      'package',
      'repl',
      'sandbox',
    ]
  },
  {
    'Runtime helper reference': [
      'arc-events',
      'arc-http',
      'arc-http-async',
      'arc-http-helpers',
      'arc-http-proxy',
      'arc-http-session',
      'arc-queues',
      'arc-static',
      'arc-tables',
      'arc-ws',
    ]
  },
]

let about = [
  'Mission',
  'Governance',
  'Community',
  'Contributor guide',
  'Help wanted',
]

module.exports = {
  guides,
  reference,
  about
}
