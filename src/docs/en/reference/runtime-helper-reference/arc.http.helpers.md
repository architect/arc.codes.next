---
title: arc.http.helpers
description: 160 (or fewer) character description of this document!
sections:
  - Body parser
  - URL
---

## Body parser

`arc.http.helpers.bodyParser` accepts a request and will interpolate the request body into JSON. 

```js
let arc = require('@architect/functions')

exports.handler = async function (req) {
  let body = arc.http.helpers.bodyParser(req)
  return {
    body: JSON.stringify(body)
  }
}
```

## URL
Architect deploys to `staging` and `production` environments with different API Gateway endpoints. The staging endpoint has `/staging` appended to it. The URL helper let's you wrap a path and it will return the correct path for the environment. 

```js
let arc = require('@architect/functions')
let url = arc.http.helpers.url

exports.handler = async function (req) {
  return {
    headers: { "Content-Type": "text/html; charset=UTF-8" },
    body: `<h1> Hello World </h1> <a href = ${url('/about')}> About Link</a>`
  }
}
```
In a staging environment, it will send the user to `/staging/about`, but in testing and production it will be `/about`

