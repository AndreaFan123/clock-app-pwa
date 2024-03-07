# Clock App (PWA)

This project was from [Frontend Mentor](https://www.frontendmentor.io/challenges/clock-app-LMFaxFwrM).

## Description

This is a clock app that shows the current time and date based on the location. The app will detect if it's day or night and change the background accordingly, also there's a toggle button for expending more information.

## Tech Stack

- React TS
- CSS
- Jest
- vite

## API's

- [World Time](http://worldtimeapi.org/) API
- [IP Geolocation](https://ipbase.com/) API
- [Quote](https://github.com/lukePeavey/quotable) API

## Features

- [x] Show current time and date.
- [x] Show location / timezone.
- [x] Show day or night background.
- [x] Show more information.
  - [x] A button to expend more information of day of the year, day of the week, week number.
- [x] Show a random quote.
  - [x] A icon to refresh the quote.

## Installation

```bash
git clone
```

```bash
cd clock-app
```

```bash
npm install

# or
yarn install

# or
pnpm install
```

```bash
npm start
```

## Testing

1. To test if geoLocation is working when the app is loaded.
2. To test if background is changing based on the time of the day.
3. To test if the quote is fetching a new quote when the refresh button is clicked.
4. To test the toggle button is working.
5. To test if the time and location is showing correctly.
