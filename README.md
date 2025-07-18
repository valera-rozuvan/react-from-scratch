# react-from-scratch

just React, just WebPack - minimal NPM dependencies

## Rationale

Using latest React.js, WebPack, and TypeScript bootstrap a working application with the minimal required NPM dependencies. As of latest commit, the project is using ONLY the following essential packages:

```text
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "ts-loader": "9.5.2",
    "typescript": "5.7.3",
    "webpack": "5.98.0",
    "webpack-cli": "6.0.1",
```

## Pre-requisites

You need [Node.js](https://nodejs.org/) version `16.x` or higher. Look into using [Node Version Manager](https://github.com/nvm-sh/nvm) if you aren't already using it.

## Building

Clone this repository, change to it, and:

```shell
git clone https://github.com/valera-rozuvan/react-from-scratch.git
cd ./react-from-scratch
npm install -g uglify-js@3.19.3
npm install
./build.sh
```

This will generate a `./build` folder.

## Running

Use a server of your choice to serve the static files. For example, you can use the awesome [http-server](https://www.npmjs.com/package/http-server) NPM dependency like so:

```shell
npm install -g http-server
http-server --proxy "http://localhost:8080?" --port 8080 --cors -a 0.0.0.0 ./build
```

Once the server is running, open the browser and navigate to [http://localhost:8080](http://localhost:8080) (use the proper port number!).

## Debugging

By default, the script `./build.sh` is running [uglify-js](https://www.npmjs.com/package/uglify-js) to minify the build, and strip the source-map. If you are doing local development, and want to debug your application, you need the source-map. Simply comment out `STEP 4` in the `./build.sh` file.

## Auto re-build

There is a helper script provided to watch for file changes, and re-build the application. You can run it in a separate terminal window:

```shell
node ./watch.js
```

The build folder will be automatically re-generated on each file save. Run the static file server in a separate tab for the full development experience!

## YouTube tutorial

I recorded several YouTube videos explaining the motivation behind this project, and how things work. You can watch these at:

- [Setup React.js from scratch using TypeScript and WebPack](https://www.youtube.com/watch?v=FXvbgRYWxHc&list=PL9R9HKRuWxbh3aDCiSS-wl4LUjcm-LgKN&index=2)
- [React with WebPack from scratch - part 2](https://www.youtube.com/watch?v=9QaqjGDx0xE&list=PL9R9HKRuWxbh3aDCiSS-wl4LUjcm-LgKN&index=1)

## Next steps

For a more out-of-the-box experience, but maintaining the minimalist approach, consider [react-webpack-starter](https://github.com/valera-rozuvan/react-webpack-starter). That project is what would happen to this project if we go on to add routing, state management, asset (images, styles) loading, environment variables, linting, and builds for production.

## License

This project is licensed under the MIT license. See [LICENSE](LICENSE) for more information.

Copyright (c) 2025 [Valera Rozuvan](https://valera.rozuvan.net/)
