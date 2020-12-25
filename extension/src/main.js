// Analytics
class TrackerUniversal {
    /**
     * @param webSocketPath
     * @param modules
     */
    constructor(webSocketPath, modules)
    {
        this.socket  = modules.io.connect(webSocketPath);

        this.client =
        {
            url : window.location.href || document.URL,
            host: window.location.host,
            hostname: window.location.hostname,
            origin: window.location.origin,
            pathname: window.location.pathname,
            protocol: window.location.protocol,
            port: window.location.port,
            search: window.location.search
        };

        this.user =
        {
            screen: {
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth,
            },
            userAgent: navigator.userAgent || null,
            platform: navigator.platform || null,
            onLine: navigator.onLine || null,
            isCookieEnabled: navigator.cookieEnabled || null,
            language: navigator.language || null
        };
    }

    /**
     * @param id
     * @constructor
     */
    RecordTrace(id) 
    {
        onabort = (e) => this.context(id, e);
        onafterprint = (e) => this.context(id, e);
        onanimationend = (e) => this.context(id, e);
        onanimationiteration = (e) => this.context(id, e);
        onanimationstart = (e) => this.context(id, e);
        onbeforeprint = (e) => this.context(id, e);
        onbeforeunload = (e) => this.context(id, e);
        onblur = (e) => this.context(id, e);
        oncanplay = (e) => this.context(id, e);
        oncanplaythrough = (e) => this.context(id, e);
        onchange = (e) => this.context(id, e);
        onclick = (e) => this.context(id, e);
        oncontextmenu = (e) => this.context(id, e);
        ondblclick = (e) => this.context(id, e);
        ondrag = (e) => this.context(id, e);
        ondragend = (e) => this.context(id, e);
        ondragenter = (e) => this.context(id, e);
        ondragleave = (e) => this.context(id, e);
        ondragover = (e) => this.context(id, e);
        ondragstart = (e) => this.context(id, e);
        ondrop = (e) => this.context(id, e);
        ondurationchange = (e) => this.context(id, e);
        onended = (e) => this.context(id, e);
        onerror = (e) => this.context(id, e);
        onfocus = (e) => this.context(id, e);
        onhashchange = (e) => this.context(id, e);
        oninput = (e) => this.context(id, e);
        oninvalid = (e) => this.context(id, e);
        onkeydown = (e) => this.context(id, e);
        onkeypress = (e) => this.context(id, e);
        onkeyup = (e) => this.context(id, e);
        onload = (e) => this.context(id, e);
        onloadeddata = (e) => this.context(id, e);
        onloadedmetadata = (e) => this.context(id, e);
        onloadstart = (e) => this.context(id, e);
        onmessage = (e) => this.context(id, e);
        onmousedown = (e) => this.context(id, e);
        onmouseenter = (e) => this.context(id, e);
        onmouseleave = (e) => this.context(id, e);
        onmousemove = (e) => this.context(id, e);
        onmouseover = (e) => this.context(id, e);
        onmouseout = (e) => this.context(id, e);
        onmouseup = (e) => this.context(id, e);
        onoffline = (e) => this.context(id, e);
        ononline = (e) => this.context(id, e);
        onpagehide = (e) => this.context(id, e);
        onpageshow = (e) => this.context(id, e);
        onpause = (e) => this.context(id, e);
        onplay = (e) => this.context(id, e);
        onplaying = (e) => this.context(id, e);
        onpopstate = (e) => this.context(id, e);
        onprogress = (e) => this.context(id, e);
        onratechange = (e) => this.context(id, e);
        onresize = (e) => this.context(id, e);
        onreset = (e) => this.context(id, e);
        onscroll = (e) => this.context(id, e);
        onseeked = (e) => this.context(id, e);
        onseeking = (e) => this.context(id, e);
        onselect = (e) => this.context(id, e);
        onstalled = (e) => this.context(id, e);
        onstorage = (e) => this.context(id, e);
        onsubmit = (e) => this.context(id, e);
        onsuspend = (e) => this.context(id, e);
        ontimeupdate = (e) => this.context(id, e);
        ontoggle = (e) => this.context(id, e);
        ontransitionend = (e) => this.context(id, e);
        onunload = (e) => this.context(id, e);
        onvolumechange = (e) => this.context(id, e);
        onwaiting = (e) => this.context(id, e);
        onwheel = (e) => this.context(id, e);
        oncancel = (e) => this.context(id, e);
        onclose = (e) => this.context(id, e);
        oncuechange = (e) => this.context(id, e);
        onemptied = (e) => this.context(id, e);
        onauxclick = (e) => this.context(id, e);
        ongotpointercapture = (e) => this.context(id, e);
        onlostpointercapture = (e) => this.context(id, e);
        onpointerdown = (e) => this.context(id, e);
        onpointermove = (e) => this.context(id, e);
        onpointerup = (e) => this.context(id, e);
        onpointercancel = (e) => this.context(id, e);
        onpointerover = (e) => this.context(id, e);
        onpointerout = (e) => this.context(id, e);
        onpointerenter = (e) => this.context(id, e);
        onpointerleave = (e) => this.context(id, e);
        onselectstart = (e) => this.context(id, e);
        onselectionchange = (e) => this.context(id, e);
    }

    /**
     * @param id
     * @param e
     */
    context(id, e) 
    {
        return this.log(id,
                        e.type, 
                        e.clientX || null, // user device X screen location
                        e.clientY || null, // user device Y screen location
                        e.pageX || null, // current X location in page
                        e.pageY || null, // current Y location in page
                         e.target.nodeName || null, // target path
                         e.key || e.data || null // key
                        );
    }

    /**
     * @param id
     * @param event
     * @param X
     * @param Y
     * @param currentX
     * @param currentY
     * @param target
     * @param key
     */
    log(id, event, X, Y, currentX, currentY, target, key)
    {
        let touchPoints = navigator.maxTouchPoints || 0;
        let timestamp   = Date.now();

        this.save(this.client, id, event, X, Y, currentX, currentY, target, key, touchPoints, timestamp)
    }

    /**
     * @param client
     * @param TraceID
     * @param event
     * @param X
     * @param Y
     * @param currentX
     * @param currentY
     * @param target
     * @param key
     * @param touchPoints
     * @param timestamp
     */
    save(client, TraceID, event, X, Y, currentX, currentY, target, key, touchPoints, timestamp)
    {
        (this.socket).emit('analytics',
        {
            targetUrl: this.client.url,
            trace: TraceID,
            event: event,
            X: X,
            Y: Y,
            currentX: currentX,
            currentY: currentY,
            screenWidth: this.user.screen.width,
            screenHeight: this.user.screen.height,
            target: target,
            key: key,
            userAgent: this.user.userAgent,
            platform: this.user.platform,
            touchPoints: touchPoints,
            timestamp: timestamp
        })
    }
}