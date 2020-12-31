# TrackerAnalytics

```html
<!doctype html>
<html lang="en">
<head>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.0/extension/lib/client.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.0/extension/lib/crypto.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.0/extension/lib/underscore.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.0/extension/lib/observe.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.0/extension/lib/rrweb.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.0/extension/lib/socket.io.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@0.1.0/extension/src/main.js"></script>
</head>
<body>
    <!-- DO NOT USE FOR LOCALHOST -->
    <textarea>Hello World</textarea>
    <script>
        /**
         * @type {TrackerAnalytics}
         */
        const Tracker = (new TrackerAnalytics('http://127.0.0.1:3003', {io,rrwebRecord,ClientJS,CryptoJS,_}));
        /**
         *  Start Recording
         */
        Tracker.RecordTrace(Tracker.Session());
    </script>
</body>
</html>
```