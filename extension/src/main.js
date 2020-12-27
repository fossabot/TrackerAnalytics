// Analytics
class TrackerAnalytics {
    /**
     * @param webSocketUrl
     * @param lib
     */
    constructor(webSocketUrl,lib)
    {
        this.socket    = lib.io.connect(webSocketUrl);
        this.rrweb     = lib.rrwebRecord;
        this.Client    = new lib.ClientJS();
        this.CryptoJS  = lib.CryptoJS;
    }

    /**
     * @returns {*}
     * @constructor
     */
    Session()
    {
        const _p8 = (s) =>
        {
            const p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
        };
        const id = _p8() + _p8(true) + _p8(true) + _p8();
        const timestamp = Date.now();
        const fingerprint = (this.Client).getFingerprint() || 0;
        return ((this.CryptoJS).MD5(`${id}.${timestamp}.${fingerprint}`)).toString();
    }

    EmitEvent(TraceSession, eventName, data)
    {
        (this.socket).emit(eventName, {
            session: TraceSession || null,
            timestamp: Date.now() || null,
            fingerprint: (this.Client).getFingerprint() || null,
            resolution: (this.Client).getCurrentResolution() || null,
            userAgent: (this.Client).getUserAgent() || navigator.userAgent || null,
            browser: (this.Client).getBrowser() || null,
            browserVersion: (this.Client).getBrowserVersion() || null,
            engine: (this.Client).getEngine() || null,
            engineVersion: (this.Client).getEngineVersion() || null,
            os: (this.Client).getOS() || null,
            osVersion: (this.Client).getOSVersion() || null,
            cpu: (this.Client).getCPU() || null,
            isMobileAndroid: (this.Client).isMobileAndroid() || null,
            isMobileIOS: (this.Client).isMobileIOS() || null,
            isMobile: (this.Client).isMobile() || null,
            eventDataJSON: JSON.stringify(data) || null
        });
    }

    /**
     * @param TraceSession
     * @constructor
     */
    RecordTrace(TraceSession)
    {
        /**
         *  Record and Emit sessions
         */
        // this.EmitEvent(TraceSession,'CreateSession',events[events.length-1])
        // TODO: Events maker
        (this.rrweb)({
            emit(event)
            {
                // event.push
            }
        });
    }
}