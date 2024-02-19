export default {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  jest: {
    testEnvironment: "jsdom",
  },
};
