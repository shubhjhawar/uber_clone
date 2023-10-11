# UberClone React Native Project

## Project Overview

This repository contains the source code for an UberClone React Native application. The project uses various Google Maps APIs to render maps, provide directions, calculate distances, estimate travel times, and price different types of rides, all presented in a visually appealing and user-friendly manner.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Setting Up API Keys](#setting-up-api-keys)
- [Project Structure](#project-structure)
- [Running the App](#running-the-app)
- [Contributing](#contributing)

## Features

- **Map Rendering:** Utilizes the Google Maps API to display interactive maps in the app.

- **Directions:** Provides users with turn-by-turn directions for their chosen route.

- **Distance Calculation:** Calculates the distance between two points and offers real-time updates during the trip.

- **Travel Time Estimation:** Estimates the travel time based on the chosen route and current traffic conditions.

- **Price Estimation:** Offers fare estimation for different types of rides (e.g., UberX, Uber Black) based on distance and time.

- **Slick User Interface:** Presents the information in an aesthetically pleasing and user-friendly manner to enhance the user experience.

## Technologies Used

- React Native
- Google Maps API
- Redux for state management
- React Navigation for navigation
- Expo for development and deployment

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.

2. Install all project dependencies using `npm install` or `yarn install`.

3. Set up the required API keys (see [Setting Up API Keys](#setting-up-api-keys)).

4. Start the development server using `npm start` or `yarn start`.

5. Follow the instructions provided in the console to run the app on an emulator or physical device.

## Setting Up API Keys

To use the Google Maps APIs, you will need to obtain API keys. Here's how you can set them up:

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/).

2. Enable the following APIs for your project:
   - Google Maps JavaScript API
   - Google Maps Directions API
   - Google Maps Distance Matrix API
   - Google Maps Geocoding API

3. Create API keys for these APIs and restrict them to your project.

4. Create a `.env` file in the project root and add your API keys as follows:
   ```env
   GOOGLE_MAPS_APIKEY=YOUR_GOOGLE_MAPS_APIKEY
   ```

5. Make sure to add your `.env` file to your `.gitignore` file to keep your API keys secret.

## Project Structure

The project follows a standard React Native project structure. Key directories and files include:

- `screens/` - The main screen components.
- `redux/` - Redux actions, reducers, and store configuration.
- `components/` - Reusable components.
- `App.js` - The entry point of the application.

## Running the App

You can run the app using Expo by following these commands:

- Start the development server:
  ```
  npx expo start
  ```

- Scan the QR code using the Expo Go app on your mobile device or use an emulator.

## Contributing

Contributions to this project are welcome! If you find any issues or have ideas for improvements, please feel free to open an issue or submit a pull request. Make sure to follow the [Contributing Guidelines](CONTRIBUTING.md).
