---
title: deploy
description: 160 (or fewer) character description of this document!
sections:
  - Overview
  - Usage
  - Flags
---

## `Overview`

`@architect/deploy` is a deployment module that deploys Architect applications to cloud infrastructure. `arc deploy` deploys code in `src` with CloudFormation and public by directly uploading files to S3.

This module also deploys code found in `/src` to `staging`. If `ARC_DEPLOY=production` is set, the code in `/src` will be deployed to `production`. (A lot of other things happen under the hood, outlined below.)

If the local `.arc` file has defined (and created) `@static` buckets, then the contents of `.static` are deployed to the appropriate S3 bucket. 

**To deploy your project to AWS, you'll need:**

- A supported runtime
- AWS CLI
- (Which requires Python)
- AWS account with admin privileges
- Your credentials file set up at:
  - *nix: ~/.aws/credentials
  - Windows: C:\Users\USER_NAME\.aws\credentials

## Looking under the hood at `deploy`

`arc`'s deploy process does a number of things during each deploy! In summary:

1.) Checks for valid `package.json` & `package-lock.json` files in each function
2.) Removes each function's local `node_modules` folder and does a fresh install of all modules
3.) Populates each function with [`arc` shared code](/guides/sharing-common-code) via `/src/shared`
4.) Compresses and uploads each function directory to its corresponding Lambda

> Reminder: All `arc` NPM scripts require `profile` and `region` variables set, either as  environment variables or in `@aws` within your `.arc` manifest. Learn more in the [Prerequisites guide](/quickstart).

<script src="https://asciinema.org/a/181947.js" id="asciicast-181947" async data-autoplay="true" data-size="big"></script>

## Usage

### Deploy code to staging

- `arc deploy` deploys to a staging stack
- `arc deploy dirty` overwrites static lambda with local source (fast!)
- `arc deploy production` deploys to a production stack
- `arc deploy static` deploys static assets only

Additional considerations:

- If `package.json`, `requirements.txt` or `Gemfile` are found deps will be installed
- Copies `src/shared` and `src/views`

## Flags

ADD ME!

