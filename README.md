# react-from-scratch

just React, just WebPack - minimal NPM dependencies

## Rationale

Using latest React.js, WebPack, and TypeScript bootstrap a working application with the minimal required NPM dependencies.

As of latest commit, the project is using ONLY the following essential packages:

```text
    "html-webpack-plugin": "5.6.3",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "ts-loader": "9.5.2",
    "typescript": "5.7.3",
    "webpack": "5.98.0",
    "webpack-cli": "6.0.1",
    "webpack-dev-server": "5.2.0"
```

## Running

Clone this repository, change to it, and:

```shell
npm install
npm run start
```

You can then open the browser and navigate to [http://localhost:3000](http://localhost:3000). With the developer tools open, you can inspect the code, and put breakpoints. Source maps are included!

## Next steps

For a more out-of-the-box experience, but maintaining the minimalist approach, consider [react-webpack-starter](https://github.com/valera-rozuvan/react-webpack-starter). That project is what would happen to this project if we go on to add routing, state management, asset (images, styles) loading, environment variables, linting, and builds for production.

## License

This project is licensed under the MIT license. See [LICENSE](LICENSE) for more information.

Copyright (c) 2025 [Valera Rozuvan](https://valera.rozuvan.net/)
