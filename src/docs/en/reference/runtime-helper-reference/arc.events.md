---
title: arc.events
description: Helper functions for event functions
sections:
  - Overview
  - Publish
  - Subscribe
---

## Overview

Event functions are special Lambda functions that enable a pub/sub message bus. Architect has helpful methods for working with JSON payloads to make them compatible with Lambda function signatures, and interactive with SNS topics.

Functions defined by `@event` in the `.arc` file correspond to an SNS topic and a Lambda function handler. There are two methods you can use `publish()` and `subscribe()`.

## Publish

You can publish a JSON payload to an `@event` function with a name and payload. If no callback is provided, it will return a promise

```js
let arc = require('@architect/functions')

await arc.events.publish({
  name: 'event-name',
  payload: { "json": "payload"}
})
```


## Subscribe

Architect also has a helper method for subscribing a function to an event. 

```js
let arc = require('@architect/functions')

async function accountVerifyEmail(event) {
  let { email } = event
  // ... do some email-related things here
  return
}

exports.handler = arc.events.subscribe(accountVerifyEmail)
```

