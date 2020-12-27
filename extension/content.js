/**
 * @type {TrackerAnalytics}
 */
const Tracker = (new TrackerAnalytics('http://127.0.0.1:3003', {io,rrwebRecord,ClientJS,CryptoJS}));
/**
 *  Start Recording
 */
Tracker.RecordTrace(Tracker.Session());