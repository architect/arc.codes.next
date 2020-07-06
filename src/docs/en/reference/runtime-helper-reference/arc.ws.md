---
title: arc.ws
description: 160 (or fewer) character description of this document!
sections:
  - Overview
  - Send messages
---

## Overview

The `@ws` primitive creates a WebSocket endpoint and stateless handler functions: `connect`, `disconnect` and `default`.


## Send messages

`arc.ws.send` - publish web socket events

```js 
/**
 *
 * @param {Object} params
 * @param {String} params.id - the ws connecton id (required)
 * @param {String} params.payload - a json event payload (required)
 * @param {Function} callback - a node style errback (optional)
 * @returns {Promise} - returned if no callback is supplied
 */

arc.ws.send({
  id: webSocketId
  payload: { "foo": "bar"}
})
```
