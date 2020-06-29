---
title: arc.http.helpers
description: 160 (or fewer) character description of this document!
sections:
  - Body parser
  - URL
---

## Body parser

`arc.http.helpers.bodyParser` accepts a  base64 encoded string request body and will interpolate a request body into an object. `bodyParser` will interpolate request bodies based on `Content-Type` from the headers. Architect request bodies are always base64 encoded strings with `req.isBase64Encoded=true`.

```js
let arc = require('@architect/functions')

exports.handler = async function (req) {
  let body = arc.http.helpers.bodyParser(req)
  return {
    headers: {"Content-type": "text/html; charset=UTF-8"},    
    body: `<pre>${JSON.stringify(body)}</pre>`
  }
}
```

multipart/form-data
```js
// incoming POST request with {"key":"value"}
{
  httpMethod: 'POST',
  body: 'LS1YLUlOU09NTklBLUJPVU5EQVJZDQpDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9ImtleSINCg0KdmFsdWUNCi0tWC1JTlNPTU5JQS1CT1VOREFSWS0tDQo=',
  headers: {
    'content-type': 'multipart/form-data; boundary=X-INSOMNIA-BOUNDARY',
  }
}
// result of bodyParser
{
  "base64": "LS1YLUlOU09NTklBLUJPVU5EQVJZDQpDb250ZW50LURpc3Bvc2l0aW9uOiBmb3JtLWRhdGE7IG5hbWU9ImtleSINCg0KdmFsdWUNCi0tWC1JTlNPTU5JQS1CT1VOREFSWS0tDQo="
}
```

application/x-wwww-form-urlencoded
```js
// incoming POST request with {"key":"value"}
{
  httpMethod: 'POST',
  body: 'a2V5PXZhbHVl',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  }
}
// result of bodyParser
[Object: null prototype] { key: 'value' }
```

application/json
```js
// incoming POST request with {"key":"value"}
{
  httpMethod: 'POST',
  body: 'ewoJImtleSI6InZhbHVlIgp9',
  headers: {
    'content-type': 'application/json',
  }
}
// result of bodyParser
{ key: 'value' }
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

