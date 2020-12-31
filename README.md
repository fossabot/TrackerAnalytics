# TrackerAnalytics

```html
<script src="https://cdn.jsdelivr.net/gh/eminmuhammadi/TrackerAnalytics@latest/dist/TrackerAnalytics.min.js"></script>
```

```javascript
/**
 * @type {TrackerAnalytics}
 */
const Tracker = (new TrackerAnalytics('http://127.0.0.1:3003', {io,rrwebRecord,ClientJS,CryptoJS,_}));
/**
 *  Start Recording
 */
Tracker.RecordTrace(Tracker.Session());
```