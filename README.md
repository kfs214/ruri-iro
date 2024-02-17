# RUri-iro: Personalized Profile Sheets Generator

RUri-iro simplifies the creation of customized profile sheets. Users can effortlessly generate personalized profiles by completing a user-friendly form. This includes adding a photo and responding to selected questions, resulting in unique and tailored profile sheets.

forkしてPR出してみる

## Project Details

This application is built with [Next.js](https://nextjs.org/) and was bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Material UI has been incorporated for enhanced design components.

## Installation

To get started, clone the repository and install the necessary dependencies using npm:

```bash
npm install
```

## Usage

Once the dependencies are installed, run the development server:

```bash
npm run dev
```

Access the application at [http://localhost:3000](http://localhost:3000) in your preferred browser.

## Build

To build the application, execute the following command:

```bash
npm run build
```

The resulting build will be stored in the `.next` directory.

## Deploy with AWS Amplify

To deploy with AWS Amplify, follow these steps:

1. Set up an Amplify app using the AWS Management Console. Detailed instructions can be found in the [documentation](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html). Note that this application is configured as a Server-Side Rendering (SSR) application.
2. Adjust the following settings in the Amplify app:
   1. **App settings > Build settings > Build image settings > Edit**
      1. Build image: `Amazon Linux:2023`
      2. Live package updates: `Node.js version 20`
