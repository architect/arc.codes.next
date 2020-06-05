---
title: Background tasks
description: A tutorial for using functions as background tasks with @events, @scheduled, and @queues
sections:
  - Overview
  - Events example
  - Scheduled example
  - Queues example
---

## Overview

Background tasks are a common workload and perfect for serverless environments. They reinforce event-driven architecture and allow you to do asynchronous work across a distributed system.

Architect has three main primitives of background functions:
- [@events](/en/reference/functions/event-functions)
 - A pub/sub service that uses SNS topics.
- [@scheduled]
 - Cron functions that are invoked at a specific rate
- [@queues]
 - A distributed message queue that uses SQS.

Each type of function enables a reliable way for Lambda functions to call one another while also remaining stateless. This allows your distributed system to process data before it has to be committed to a persistent store. Imagine background tasks as more memory for your main functions to do more work that it doesn't have to deal with right away.

## @events example

`@events` give your application a pub/sub message bus with [AWS Simple Notification Service(SNS)](https://docs.aws.amazon.com/sns/latest/dg/welcome.html). 
In this tutorial, we will create an event topic, POST JSON data to a Lambda function do some work on it. Any `@event` function subscribed to the named topic will catch the event object, at least once. The event functions are also good for creating a one to many pattern. The same original event object can be sent to any number of functions 

1. We will start with a fresh project and install dependencies.

``` md
npm init @architect ./arc-event-app
```
2. Open up your `.arc` file and add the `@event` pragma along with a POST route 

```md
# .arc
@app
arc-event-app

@http
get /
post /yolo

@events
yolo
```
Now we can write our `get-index` handler. This handler sends an HTML string that contains a form. Anytime a user visits the index route, they will be able to receive this form and POST some data.

```javascript
// src/http/get-index/index.js
  exports.handler = async function http() {
    let form = `<form action=/yolo method=post>
    <button>YOLO</button>
  </form>`
    let html = `<!doctype html>
  <html><body>${ form }</body></html>`
    return { 
      statusCode: 200, 
      headers: { 'content-type': 'text/html' },
      body: html
    }
  }
```

Next we're going to create the event function in `/src/events`. This function is automatically subscribed to the topic created from the `.arc` namespace and will receive a JSON payload published to it.
```javascript
// src/events/oh/index.js

exports.handler = async function (event) {
  console.log('got event', JSON.stringify(event, null, 2))
  return true
}
```

The final step is creating an endpoint that the frontend can POST data to. Good thing we can make another Lambda function, and the `@architect/functions` library will handle publishing and service discovery of the SNS topic. Since each function is separated in it's execution, we will have to install it locally and declare a `package.json` in the function folder. 

``` bash
cd src/http/post-hello/index.js
npm init -y
npm install @architect/functions
```
After the library is installed we can now use it for a clean method to interact with the SNS topic. The function accepts a JSON payload with two keys: `name` and `payload`.
``` javascript
// src/http/post-hello/index.js
let arc = require('@architect/functions')

async function yolo() {
  await arc.events.publish({
    // the name of the event
    name: 'yolo', 
    // the JSON payload you want to send
    payload: { 
      message: 'swag',
      timestamp: new Date(Date.now()).toISOString()
    }
  })
  return { location: '/' } 
}

exports.handler = arc.http.async(yolo)
```
Test it locally by running `npm start` in your terminal from the project root. Architect's Sandbox environment will emulate the same behavior once your project is deployed. Within the event function, you can split logic among code from `src/shared`.

## @scheduled example
Another common background task is `@scheduled` functions. These functions are invoked on a schedule defined in the `.arc` file. These functions are good for cleanup tasks or kicking off other kinds of health checks. Let's make a new project and add a `@scheduled` function. 

The first thing we will need is a fresh Architect project. We can create one directly from the terminal.
```bash
mkdir -p arc-scheduled-app && cd arc-scheduled-app && npm init @architect
```
Now we can open up the `.arc` file and add a scheduled function to the manifest.

```md
# .arc

# your project namespace
@app 
arc-scheduled-app

# http functions and routes
@http
get /

# scheduled functions listed by name and rate
@scheduled
daily rate(1 day)
```
Architect will look for the function named `daily` in the `src/scheduled/daily` folder. So let's go ahead and write one.

```javascript
// src/scheduled/daily/index.js

exports.handler = async function scheduled (event) {
  console.log(JSON.stringify(event, null, 2))
  return
}
```

When this function is deployed, it is subscribed to an AWS CloudWatch Event. The event will invoke this function to handle the event payload coming into it. It should be treated as something that happens in the background of your main application to handle work on a regular and periodic cycle. 

Let's take a look at the `sam.yaml` document that Architect generates to see how the resource will be created. 

From the terminal, run `arc deploy --dry-run` and take a look at `sam.yaml` in the project's root directory. 

```yaml
"Daily": {
      "Type": "AWS::Serverless::Function",
      "Properties": {
        "Handler": "index.handler",
        "CodeUri": "./src/scheduled/daily",
        "Runtime": "nodejs12.x",
        "MemorySize": 1152,
        "Timeout": 5,
        "Environment": {
          "Variables": {
            "ARC_ROLE": {
              "Ref": "Role"
            },
            "ARC_CLOUDFORMATION": {
              "Ref": "AWS::StackName"
            },
            "ARC_APP_NAME": "arc-scheduled-app",
            "ARC_HTTP": "aws_proxy",
            "NODE_ENV": "staging",
            "SESSION_TABLE_NAME": "jwe"
          }
        },
        "Role": {
          "Fn::Sub": [
            "arn:aws:iam::${AWS::AccountId}:role/${roleName}",
            {
              "roleName": {
                "Ref": "Role"
              }
            }
          ]
        },
        "Events": {
          "DailyEvent": {
            "Type": "Schedule",
            "Properties": {
              "Schedule": "rate(1 day)"
            }
          }
        }
      }
    },
```

The `Events` property on the `Daily` function shows that this is a scheduled event with a rate of being invoked once a day. The rate expression starts when the rule is created at the time of deployment. For more information about schedule rules, follow the [AWS documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html).


## @queues example

`@queus` are very similar to `@events` because they also allow for asynchronous message processing. `@queues` will provision an AWS SQS queue and register a lambda function to handle messages that are sent to the queue. There are notable differences between `@queues` and `@events`. While `@events` push events, `@queues` poll for messages from the queue. Queues work on the first message in the queue before moving onto the next. Queues will also keep retrying until it is delivered for up to 4 days. 

Let's make an example message queue by starting with a fresh Architect project. 

```bash
mkdir -p arc-queues-app && cd arc-queues-app && npm init @architect
```
Open up the `.arc` file and modify the manifest to include our `@scheduled` function as follows: 

```md
# .arc
@app
arc-queues-app

@http
get /

@queues
account-signup
```

The queue function is automatically subscribed and polling for event objects published on that namespace. You can use this pattern to move data between Lambda functions and using the queue as a temporary data store. To write a queue function, make a new file in `src/queues/`

```javascript
// src/queues/account-signup/index.js
exports.handler = async function queue (event) {
  console.log(JSON.stringify(event, null, 2))
  console.log('got queue event')
  return
}
```

Now we can modify our `get-index` function to publish a message as follows: 
```javascript
let arc = require('@architect/functions')

exports.handler = async function http(req) {
  let name = 'account-signup'
  let payload = {body: req.headers, text: 'yolo'}
  await arc.queues.publish({name, payload})
  return {statusCode: 201}
}
```
In order to use `@architect/functions` we need to install it inside the function folder.
```bash 
cd src/http/get-index
npm init -y
npm install @architect/functions
```

Run `npm start` from root of the project to start Sandbox. Navigate to http://localhost:3333 and take a look in the terminal for our `console.log` output. 

You should see the `@queue` event object being logged in the console of Sandbox. 
```json
{
 "name": "account-signup",
  "payload": {
    "body": {
      "Host": "localhost:3333",
      "connection": "keep-alive",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
      "accept": "image/webp,image/apng,image/*,*/*;q=0.8",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "no-cors",
      "sec-fetch-dest": "image",
      "referer": "http://localhost:3333/",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
      "Cookie": "_idx=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4R0NNIn0..8-pHGAaGk2-rEySH.8gPKAYigValRtyydQWK-6SsBT912l-e2UlQx5Q.1XKtFyhnEnkWYbzqg8wTEQ; _ga=GA1.1.193824757.1590076796"
    },
    "text": "yolo" 
}
```
This event has `name` and `payload` keys which are reflected in the records when the queue is polled.
You should also see the output from the `account-signup` function handler: 

```console
{
  "Records": [
    {
      "body": "{\"body\":{\"Host\":\"localhost:3333\",\"connection\":\"keep-alive\",\"User-Agent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36\",\"accept\":\"image/webp,image/apng,image/*,*/*;q=0.8\",\"sec-fetch-site\":\"same-origin\",\"sec-fetch-mode\":\"no-cors\",\"sec-fetch-dest\":\"image\",\"referer\":\"http://localhost:3333/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"en-US,en;q=0.9\",\"Cookie\":\"_idx=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4R0NNIn0..8-pHGAaGk2-rEySH.8gPKAYigValRtyydQWK-6SsBT912l-e2UlQx5Q.1XKtFyhnEnkWYbzqg8wTEQ; _ga=GA1.1.193824757.1590076796\"},\"text\":\"yolo\"}"
    }
  ]
}
got queue event
```