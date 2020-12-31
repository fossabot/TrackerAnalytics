# TrackerAnalytics

```html
<script src="https://raw.githubusercontent.com/eminmuhammadi/TrackerAnalytics/0.1.0/dist/TrackerAnalytics.min.js"></script>
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