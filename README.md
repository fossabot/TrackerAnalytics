# TrackerAnalytics

Record users' actions using Browser Events

## Installing
A step by step series of examples that tell you how to get a development env running

```bash
git clone https://github.com/eminmuhammadi/TrackerAnalytics.git && cd TrackerAnalytics
```

```bash
npm install
```

```bash
npm run dev
```

Please, use a Docker for production environment.

## Usage
### Record using Browser
```html
<!doctype html>
<html lang="en">
<head>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.1/extension/lib/client.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.1/extension/lib/crypto.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.1/extension/lib/underscore.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.1/extension/lib/observe.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.1/extension/lib/rrweb.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.1/extension/lib/socket.io.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.1/extension/src/main.js"></script>
</head>
<body>
    <!-- DO NOT USE FOR LOCALHOST -->
    <textarea>Hello World</textarea>
    <script>
        /**
         * @type {TrackerAnalytics}
         */
        // TrackerAnalytics(@webSocketUrl, @modules)
        const Tracker = (new TrackerAnalytics('http://127.0.0.1:3003', {io,rrwebRecord,ClientJS,CryptoJS,_}));
        /**
         *  Start Recording
         */
        Tracker.RecordTrace(Tracker.Session());
    </script>
</body>
</html>
```
### Record using [Extension](/extension) for Google Chrome

### Play recorded interactions
```http://localhost:3003/play?fingerprint=&session=&limit=&offset=``` or ```http://localhost:3003/play?fingerprint=```

NOTE: Please, fill the empty query parameters.

## LICENSE
MIT License

Copyright (c) 2021 Emin Muhammadi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
