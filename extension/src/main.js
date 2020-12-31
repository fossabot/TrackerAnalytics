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
        this.underscore= lib._;
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
            isMobileAndroid: (this.Client).isMobileAndroid() || false,
            isMobileIOS: (this.Client).isMobileIOS() || false,
            isMobile: (this.Client).isMobile() || false,
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
        let events = [];
        let __event_i__ = 0;

        (this.rrweb)({
            emit(event)
            {
                /**
                 * It is hard to emit events
                 * using socket.io
                 */
                if(__event_i__===1)
                {
                    events[1]=event;
                    __event_i__++;
                }
                else if(__event_i__===2){
                    events[2]=event;
                }
                else{
                    events[0]=event;
                    __event_i__++;
                }
            }
        });

        (this.underscore).observe(events, () => {
            if(events.length === 2)
            {
                this.EmitEvent(TraceSession,'CreateSession', events[0]);
                this.EmitEvent(TraceSession,'CreateSession', events[1]);
            }
            else {
                this.EmitEvent(TraceSession,'CreateSession', events[2]);
            }
        })
    }
}