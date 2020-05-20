---
title: package
description: 160 (or fewer) character description of this document!
sections:
  - Overview
  - Usage
  - Flags
---

## Overview

The AWS Serverless Application Model (AWS SAM) is an open-source framework that you can use to build serverless applications on AWS. The `sam.json` specification is used to define your serverless application. `arc package` generates a Cloudformation template from the current `.arc` file. This method will write a sam.json file to the current working directory in your project.

> [Go here to learn more about AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) from the AWS docs.

## Usage

Input `arc package` into your terminal to create a sam.json file in the working directory.

### Example
```js
let parse = require('@architect/parser')
let pkg = require('@architect/package')

// fake out an .arc file as a string
let arcString = `
@app
mybasicapp

@http
get /
`

// parse .arc string into a plain javascript object
let arc = parse(arcString)

// export as sam
let sam = pkg(arc)
console.log(sam)
```

## Flags

ADD ME!

