/**
 * @type {TrackerUniversal}
 */
const Tracker = (new TrackerUniversal('ws://localhost:3003', {io}));
/**
 *  Start Recording
 */
Tracker.RecordTrace("Testing example.com");