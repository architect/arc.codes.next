---
title: Single page apps
description: 160 (or fewer) character description of this document!
sections:
  - Overview
  - Aliasing
---

## Overview

There are many ways to build a single-page application. Larger applications can benefit from using a frontend library and bundler. Various libraries help us organize code, and the bundler helps us package it for optimal production delivery. In this tutorial, we will go over some common patterns you should use to build single-page-apps with Architect.

## Static and dynamic API endpoints coexisting at the same origin

Architect provides two methods to proxy static assets through API Gateway. This means your single page application and API can share the same domain name, session support and database access *without CORS* and *without 3rd party proxies*. 

For this guide we'll use the following `.arc` file:

```bash
@app
spa

@http
get /

@static
staging spa-stage-bukkit
production spa-prod-bukkit
```

> 👉🏽 Note: S3 buckets are global to all of AWS so you may need to try a few different names!

## Proxy Public

Lambda is _very good_ at reading and processing text from S3. To enable the proxy add the following to the root Lambda:

```javascript
// src/http/get-index/index.js
let arc = require('@architect/functions')

exports.handler = arc.proxy.public()
```

Now all static assets in `./public` will be served from the root of your application.

The `arc.proxy.public` function accepts an optional configuration param `spa` which will force loading `index.html` no matter what route is invoked (note however that routes defined in `.arc` will take precedence). 

```javascript
// src/http/get-index/index.js
let arc = require('@architect/functions')

exports.handler = arc.proxy.public({spa:true})
```

Set `{spa:false}`, or omit, if you want the proxy to return a `404` error when a directory or file does not exist. 

> **Bonus:** when `404.html` is present that file will be returned

> **Quirks** - No binary files: images, audio video need to be served via S3 static URLs

## Aliasing

The `arc.proxy.public` accepts an `alias` configuration object for mapping pretty URLs:

```javascript
// src/http/get-index/index.js
let arc = require('@architect/functions')

exports.handler = arc.proxy.public({
  alias: {
    '/home': '/templates/home.html',
  }
})
```
