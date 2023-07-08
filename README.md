# GitHub Anomaly Detector

GitHub Anomaly Detector is a command-line application built with NestJS that integrates with GitHub using webhooks to detect and notify suspicious behavior in an organization. It provides a simple mechanism to perform anomaly detection based on predefined criteria.

## Features

- Receives webhook events from GitHub organization
- Detects and notifies suspicious behavior
- Implements anomaly detection based on predefined criteria
- Prints event details to the console

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/g4lb/github-anomaly-detector
   ```

2. Install dependencies:

   ```bash
   cd github-anomaly-detector
   npm install
   ```

## Configuration

1. Set up a GitHub webhook:
   - Go to the settings of your GitHub organization (e.g., "g4lbe").
   - Navigate to the repository or organization settings.
   - Create a new webhook.
   - Set the Payload URL to the URL where your NestJS application is running, followed by the route defined in the controller (`/webhooks/github`). If you are running the application locally, you can use ngrok to expose your local server to the internet.
   - Choose the appropriate Content type (e.g., `application/json`).
   - Select the events you want to monitor (e.g., push, create, delete).
   - Optionally, set up a secret for securing the communication between your application and GitHub.
   - Save the webhook configuration.

> Note: If you are running the application locally, you can use ngrok to expose your local server to the internet. Start ngrok with the following command:
>
> ```bash
> ngrok http 127.0.0.13000
> ```
>
> Replace `3000` with the port number your NestJS application is running on. Then, use the ngrok-provided URL as the Payload URL for your webhook.

## Usage

1. Start the NestJS application:

   ```bash
   npm run start:dev
   ```

2. Ensure your application is running and accessible at the specified URL or the ngrok URL.

3. Trigger events in your GitHub organization ("g4lbe" in this case).

4. Check the console output of your application for suspicious behavior notifications.

## Customization

You can customize the anomaly detection criteria and notification mechanisms based on your specific requirements. The application's code is modularized, making it easy to add additional checks or integrate different notification services.