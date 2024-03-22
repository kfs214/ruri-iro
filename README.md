# RUri-iro: Personalized Profile Sheets Generator <!-- omit in toc -->

RUri-iro simplifies the creation of customized profile sheets. Users can effortlessly generate personalized profiles by completing a user-friendly form. This includes adding a photo and responding to selected questions, resulting in unique and tailored profile sheets.

## Table of Contents<!-- omit in toc -->

- [Project Details](#project-details)
- [Development](#development)
  - [Installation](#installation)
  - [Run locally](#run-locally)
  - [Testing](#testing)
  - [Recommended VSCode Extensions](#recommended-vscode-extensions)
  - [On Commit](#on-commit)
  - [Environment Variables](#environment-variables)
    - [Local Development](#local-development)
      - [Example:](#example)
    - [AWS Amplify Environment](#aws-amplify-environment)
- [Build and Deploy](#build-and-deploy)
  - [Build](#build)
  - [Deploy with AWS Amplify](#deploy-with-aws-amplify)
- [Contribution](#contribution)

## Project Details

This application is built with [Next.js](https://nextjs.org/) and was bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Material UI has been incorporated for enhanced design components.

## Development

### Installation

To get started, clone the repository and install the necessary dependencies using npm:

```bash
npm install
```

### Run locally

Once the dependencies are installed, run the development server:

```bash
npm run dev
```

Access the application at [http://localhost:3000](http://localhost:3000) in your preferred browser.

### Testing

Playwright is set up to perform automated end-to-end (E2E) tests. To run all test cases, execute the following command:

```bash
npm test
```

### Recommended VSCode Extensions

Recommended VSCode Extensions are configured in [extensions.json](./.vscode/extensions.json). To install them, refer to the official documentation on [Recommended extensions](https://code.visualstudio.com/docs/editor/extension-marketplace#_recommended-extensions)

### On Commit

[`lint-staged`](https://github.com/lint-staged/lint-staged) is configured to run linters against staged Git files.

ESlint warnings are not allowed. If you need to disable some ESlint rule, you can use `eslint-disable-next-line` to disable a specific rule on a specific line.  
For more detail: [Using configuration comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1)

### Environment Variables

The project includes specific environment variable(s) for

- Google Tag Manager

A dummy value is initially set for development within the `.env` file. If you need to modify or override any environment variable(s), follow the instructions provided below.

#### Local Development

For local development, customize or override the environment variable(s) by creating a `.env.local` file in the project root.

##### Example:

```env
# Google Tag Manager
GTM_ID=GTM-XXXXXX
```

#### AWS Amplify Environment

When working with AWS Amplify, refer to the official documentation on [Environment variables - AWS Amplify Hosting | Set environment variables](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html#setting-env-vars) for instructions on configuring environment variables specific to your Amplify environment.

## Build and Deploy

### Build

To build the application, execute the following command:

```bash
npm run build
```

The resulting build will be stored in the `.next` directory.

### Deploy with AWS Amplify

To deploy with AWS Amplify, follow these steps:

1. Set up an Amplify app using the AWS Management Console. Detailed instructions can be found in the [documentation](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html). Note that this application is configured as a Server-Side Rendering (SSR) application.
2. Adjust the following settings in the Amplify app:
   1. **App settings > Build settings > Build image settings > Edit**
      1. Build image: `Amazon Linux:2023`
      2. Live package updates: `Node.js version 20`

## Contribution

Your contributions are highly appreciated and encouraged! 🚀  
Check out our contribution guide and lend a hand 🙏  
[CONTRIBUTING.md](./.github/CONTRIBUTING.md)
