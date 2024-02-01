<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/KvJellyBean/weather-app">
    <img src="./src/images/logoBanner.jpeg" alt="Logo Banner">
  </a>

<h3 align="center">Weathify</h3>

  <p align="center">
    A responsive weather application delivering up-to-the-minute conditions and detailed hourly and daily forecasts for the entire week.
    <br />
    <a href="https://kvjellybean.github.io/weather-app/">View Demo</a>
    ·
    <a href="https://github.com/KvJellyBean/weather-app/issues">Report Bug</a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ul>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Weathify GIF][product-gif]](https://github.com/KvJellyBean/weather-app)

Weathify is your ultimate weather companion, providing a seamless and responsive experience to keep you well-informed about the current weather conditions and forecasts. With its user-friendly interface, Weathify delivers accurate hourly and daily weather predictions for the entire week, helping you plan your activities with confidence. The application's responsive design ensures a consistent and visually appealing experience across various devices, allowing you to access precise weather insights anytime, anywhere. Stay ahead of the elements and make informed decisions with Weathify, your go-to weather app for reliable forecasts and real-time updates.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Quickly set up a local copy by following these simple steps for a seamless start.

### Prerequisites

- Web browser (Google Chrome recommended)
- Node package manager (npm)
  ```sh
  npm install npm@latest -g
  ```

### Installation

- Clone the repository to your local machine
  ```sh
    git clone https://github.com/KvJellyBean/weather-app.git
  ```
- Navigate to your local project
  ```sh
  cd weather-app
  ```
- Install dependencies
  ```sh
    npm install
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

- Build and start the project
  ```sh
    npm run start
  ```
- If the project is not yet open, open it using `http://localhost:8080`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Real-time Weather Data Integration
  - [x] Implement API integration for geocoding to convert user-input city names into geographical coordinates.
  - [x] Successfully retrieve current weather conditions and forecasts using a reliable weather API.
  - [x] Utilize `date-fns` and `date-fns-tz` plugin for handling date and time
- [x] User Preferences and Local Storage
  - [x] Allow users to customize or change units (Celsius/Fahrenheit)
  - [x] Implement local storage to persist user preference settings and the last searched city.
  - [x] Provide a seamless experience by loading the user's last searched city upon revisiting the app.
- [x] Responsive Web Design
- [x] Time-based styling
  - [x] Enhance visual appeal by adapting background colors, images, or other elements to reflect day or night conditions.
  - [x] Implement dynamic styling adjustments based on the time of day at the searched city.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

If you have suggestions to enhance this project, feel free to fork the repo and submit a pull request. Alternatively, you can open an issue with the "enhancement" tag. Your contributions are highly valued and will help make this project even better. Thank you for your support! 🚀

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[product-gif]: ./src/images/weatherApp.gif
