<img src="../assets/architect-logo-500b@2x.png" style="height:100">

# The most powerful way to build serverless web apps with JS, Python, and Ruby

**Architect provides **everything** you need to build serverless apps that are fast, modern, & MASSIVELY scalable.**

Architect helps you leverage powerful **Amazon Web Services** more easily and quickly.

- [Lambda](https://aws.amazon.com/lambda/) *cloud native* functions for compute 
- [API Gateway](https://aws.amazon.com/api-gateway/) for HTTP
- [Route53](https://aws.amazon.com/route53) for DNS
- [CloudFront](https://aws.amazon.com/cloudfront/) for CDN
- [CloudFormation](https://aws.amazon.com/cloudformation/) for packaging deployments
- [S3](https://aws.amazon.com/s3/) for static assets
- [Simple Notification Service](https://aws.amazon.com/sns/) for event pub/sub functions
- [Simple Queue Service](https://aws.amazon.com/sqs/) for queue functions
- [CloudWatch Events](https://docs.aws.amazon.com/lambda/latest/dg/with-scheduled-events.html) for scheduled functions
- [DynamoDB](https://aws.amazon.com/dynamodb/) for data persistence, querying and trigger functions
- [Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-paramstore.html) for environment variables

**Quickstart**

1. Install Architect

```bash
npm install -g @architect/architect
```

2. Create a project folder

```bash
mkdir testapp
cd testapp
```

3. Run `arc init` to generate a basic project:

```
/
├── src
│   └── http
│       └── get-index/index.js
└── app.arc
```

4. Check out your first `app.arc` file & HTTP function!

```bash
# /project/path/app.arc
@app
your-app-name

@http
get /
```

```javascript
// src/http/get-index/index.js

exports.handler = async function http(request) {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8;' },
    body: '<h1>Hello World! 🎉</h1>'
  }
}
```

## That's it! Ready to ship?

Ensure you've [met the system prerequisites](/en/guides/get-started/detailed-setup) and run: `arc deploy`.

Your new app will be online within seconds.

**Want to join the community and learn more?**

- [Join the Architect community on Slack!](https://join.slack.com/t/architecture-as-text/shared_invite/MjE2MzU4Nzg0NTY1LTE1MDA2NzgyMzYtODE2NzRkOGRmYw)

- Star [`@architect/architect`](https://github.com/architect/architect) on GitHub

- [Follow the detailed setup](/en/guides/get-started/detailed-setup)
