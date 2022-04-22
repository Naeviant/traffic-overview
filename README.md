# Traffic Overview

[![API Lint](https://github.com/Naeviant/traffic-overview/actions/workflows/api_lint.yml/badge.svg)](https://github.com/Naeviant/traffic-overview/actions/workflows/api_lint.yml)
[![Client Lint](https://github.com/Naeviant/traffic-overview/actions/workflows/client_lint.yml/badge.svg)](https://github.com/Naeviant/traffic-overview/actions/workflows/client_lint.yml)

An unofficial rewrite of National Highway's Traffic England service.

Traffic information from National Highways is fetched every five minutes. CCTV images, Variable Message Sign (VMS) messages and information about incidents is available for Motorways and some major A-Roads.

Important note: this project uses undocumented APIs - hence they may be subject to change (or complete removal) without any warning.

### Setup & Configuration

#### API

1. Open a new terminal.
2. Change into the API directory: `cd ./api/`.
3. Make changes to the configuration file if required: `nano .env`.
4. Install node modules: `npm install`.
5. Run the code: `npm run start`.
6. Navigate to `http://localhost:8080` (by default) in a browser to test the API is working.
7. Allow the API to fetch data (for approximately five minutes).

#### Client

1. Open a new terminal.
2. Change into the client directory: `cd ./client/`.
3. Make changes to the configuration file if required: `nano .env`.
4. Install node modules: `npm install`.
5. Run the code: `npm run start`.
6. Navigate to `http://localhost:3000` (by default) in a browser to access the app.

### LICENSE

> Copyright (c) 2022 Sam Hirst

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> "Software"), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
> LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
> OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
> WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.