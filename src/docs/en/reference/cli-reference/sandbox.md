---
title: sandbox
description: Documentation for Sandbox Local Development Environment
sections:
  - Usage
  - Flags
  - Init scripts
---

## Overview

Architect dev server: run full Architect projects locally & offline in a sandbox. Sandbox is an http server and an in-memory database that runs your Architect project locally and offline. It emulates most of the application services defined in the `.arc` file. Beyond HTTP traffic, Sandbox can also emulate serverless WebSockets, SNS events, and SQS queues.
Starts a local web server and in-memory database for previewing code defined by `.arc`.

Sandbox can be called directly from the terminal or a JavaScript API. This makes it a good environment for previewing work and for invoking Lambdas during automated testing.

## Usage

Local Preview and Offline

JavaScript API
```js
let sandbox = require('@architect/sandbox')
```

## Flags

ADD ME!


## Init scripts

ADD ME!