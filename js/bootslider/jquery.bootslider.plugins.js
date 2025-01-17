function getFrameID(e) {
    var t = document.getElementById(e);
    if (t) {
        if (/^iframe$/i.test(t.tagName)) return e;
        var n = t.getElementsByTagName("iframe");
        if (!n.length) return null;
        for (var r = 0; r < n.length; r++) {
            if (/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com(\/|$)/i.test(n[r].src)) break
        }
        t = n[r];
        if (t.id) return t.id;
        do {
            e += "-frame"
        } while (document.getElementById(e));
        t.id = e;
        return e
    }
    return null
}

function onYouTubePlayerAPIReady() {
    YT_ready(true)
}

function onPlayerStateChange(e) {
    var t = $(e.target.a).attr("data-bootslider-target");
    if (t != "undefined") {
        switch (e.data) {
            case YT.PlayerState.ENDED:
                {
                    BOOTSLIDER[t].playTimer()
                }
                break;
            case YT.PlayerState.PAUSED:
                {
                    BOOTSLIDER[t].playTimer()
                }
                break;
            case YT.PlayerState.PLAYING:
                {
                    BOOTSLIDER[t].pauseTimer()
                }
                break
        }
    }
}

function ready(e) {
    Froogaloop(e).addEvent("play", function(t) {
        vimeoplay(e)
    });
    Froogaloop(e).addEvent("pause", function(t) {
        vimeopause(e)
    });
    Froogaloop(e).addEvent("finish", function(t) {
        vimeofinish(e)
    })
}

function vimeoplay(e) {
    var t = $("#" + e).attr("data-bootslider-target");
    if (t != "undefined") {
        BOOTSLIDER[t].pauseTimer()
    }
}

function vimeopause(e) {
    var t = $("#" + e).attr("data-bootslider-target");
    if (t != "undefined") {
        BOOTSLIDER[t].playTimer()
    }
}

function vimeofinish(e) {
    var t = $("#" + e).attr("data-bootslider-target");
    if (t != "undefined") {
        BOOTSLIDER[t].playTimer()
    }
}(function(e) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else if (typeof exports === "object") {
        module.exports = e
    } else {
        e(jQuery)
    }
})(function(e) {
    function u(t) {
        var n = t || window.event,
            o = r.call(arguments, 1),
            u = 0,
            f = 0,
            l = 0,
            c = 0;
        t = e.event.fix(n);
        t.type = "mousewheel";
        if ("detail" in n) {
            l = n.detail * -1
        }
        if ("wheelDelta" in n) {
            l = n.wheelDelta
        }
        if ("wheelDeltaY" in n) {
            l = n.wheelDeltaY
        }
        if ("wheelDeltaX" in n) {
            f = n.wheelDeltaX * -1
        }
        if ("axis" in n && n.axis === n.HORIZONTAL_AXIS) {
            f = l * -1;
            l = 0
        }
        u = l === 0 ? f : l;
        if ("deltaY" in n) {
            l = n.deltaY * -1;
            u = l
        }
        if ("deltaX" in n) {
            f = n.deltaX;
            if (l === 0) {
                u = f * -1
            }
        }
        if (l === 0 && f === 0) {
            return
        }
        c = Math.max(Math.abs(l), Math.abs(f));
        if (!s || c < s) {
            s = c
        }
        u = Math[u >= 1 ? "floor" : "ceil"](u / s);
        f = Math[f >= 1 ? "floor" : "ceil"](f / s);
        l = Math[l >= 1 ? "floor" : "ceil"](l / s);
        t.deltaX = f;
        t.deltaY = l;
        t.deltaFactor = s;
        o.unshift(t, u, f, l);
        if (i) {
            clearTimeout(i)
        }
        i = setTimeout(a, 200);
        return (e.event.dispatch || e.event.handle).apply(this, o)
    }

    function a() {
        s = null
    }
    var t = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        n = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        r = Array.prototype.slice,
        i, s;
    if (e.event.fixHooks) {
        for (var o = t.length; o;) {
            e.event.fixHooks[t[--o]] = e.event.mouseHooks
        }
    }
    e.event.special.mousewheel = {
        version: "3.1.6",
        setup: function() {
            if (this.addEventListener) {
                for (var e = n.length; e;) {
                    this.addEventListener(n[--e], u, false)
                }
            } else {
                this.onmousewheel = u
            }
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var e = n.length; e;) {
                    this.removeEventListener(n[--e], u, false)
                }
            } else {
                this.onmousewheel = null
            }
        }
    };
    e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
});
(function(e) {
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define(["jquery"], e)
    } else {
        e(jQuery)
    }
})(function(e) {
    function N(t) {
        if (t && t.allowPageScroll === undefined && (t.swipe !== undefined || t.swipeStatus !== undefined)) {
            t.allowPageScroll = u
        }
        if (t.click !== undefined && t.tap === undefined) {
            t.tap = t.click
        }
        if (!t) {
            t = {}
        }
        t = e.extend({}, e.fn.swipe.defaults, t);
        return this.each(function() {
            var n = e(this);
            var r = n.data(x);
            if (!r) {
                r = new C(this, t);
                n.data(x, r)
            }
        })
    }

    function C(T, N) {
        function nt(t) {
            if (jt()) {
                return
            }
            if (e(t.target).closest(N.excludedElements, X).length > 0) {
                return
            }
            var n = t.originalEvent ? t.originalEvent : t;
            var r, i = S ? n.touches[0] : n;
            V = y;
            if (S) {
                $ = n.touches.length
            } else {
                t.preventDefault()
            }
            P = 0;
            H = null;
            z = null;
            B = 0;
            F = 0;
            I = 0;
            R = 1;
            U = 0;
            J = Ut();
            W = Xt();
            Ht();
            if (!S || $ === N.fingers || N.fingers === m || gt()) {
                It(0, i);
                K = en();
                if ($ == 2) {
                    It(1, n.touches[1]);
                    F = I = Jt(J[0].start, J[1].start)
                }
                if (N.swipeStatus || N.pinchStatus) {
                    r = ft(n, V)
                }
            } else {
                r = false
            }
            if (r === false) {
                V = E;
                ft(n, V);
                return r
            } else {
                Ft(true)
            }
            return null
        }

        function rt(e) {
            var t = e.originalEvent ? e.originalEvent : e;
            if (V === w || V === E || Bt()) {
                return
            }
            var n, r = S ? t.touches[0] : t;
            var i = qt(r);
            Q = en();
            if (S) {
                $ = t.touches.length
            }
            V = b;
            if ($ == 2) {
                if (F == 0) {
                    It(1, t.touches[1]);
                    F = I = Jt(J[0].start, J[1].start)
                } else {
                    qt(t.touches[1]);
                    I = Jt(J[0].end, J[1].end);
                    z = Qt(J[0].end, J[1].end)
                }
                R = Kt(F, I);
                U = Math.abs(F - I)
            }
            if ($ === N.fingers || N.fingers === m || !S || gt()) {
                H = Zt(i.start, i.end);
                vt(e, H);
                P = Gt(i.start, i.end);
                B = $t();
                zt(H, P);
                if (N.swipeStatus || N.pinchStatus) {
                    n = ft(t, V)
                }
                if (!N.triggerOnTouchEnd || N.triggerOnTouchLeave) {
                    var s = true;
                    if (N.triggerOnTouchLeave) {
                        var o = tn(this);
                        s = nn(i.end, o)
                    }
                    if (!N.triggerOnTouchEnd && s) {
                        V = at(b)
                    } else {
                        if (N.triggerOnTouchLeave && !s) {
                            V = at(w)
                        }
                    }
                    if (V == E || V == w) {
                        ft(t, V)
                    }
                }
            } else {
                V = E;
                ft(t, V)
            }
            if (n === false) {
                V = E;
                ft(t, V)
            }
        }

        function it(e) {
            var t = e.originalEvent;
            if (S) {
                if (t.touches.length > 0) {
                    Pt();
                    return true
                }
            }
            if (Bt()) {
                $ = Y
            }
            e.preventDefault();
            Q = en();
            B = $t();
            if (ht()) {
                V = E;
                ft(t, V)
            } else {
                if (N.triggerOnTouchEnd || N.triggerOnTouchEnd == false && V === b) {
                    V = w;
                    ft(t, V)
                } else {
                    if (!N.triggerOnTouchEnd && Tt()) {
                        V = w;
                        lt(t, V, c)
                    } else {
                        if (V === b) {
                            V = E;
                            ft(t, V)
                        }
                    }
                }
            }
            Ft(false);
            return null
        }

        function st() {
            $ = 0;
            Q = 0;
            K = 0;
            F = 0;
            I = 0;
            R = 1;
            Ht();
            Ft(false)
        }

        function ot(e) {
            var t = e.originalEvent;
            if (N.triggerOnTouchLeave) {
                V = at(w);
                ft(t, V)
            }
        }

        function ut() {
            X.unbind(L, nt);
            X.unbind(D, st);
            X.unbind(O, rt);
            X.unbind(M, it);
            if (_) {
                X.unbind(_, ot)
            }
            Ft(false)
        }

        function at(e) {
            var t = e;
            var n = dt();
            var r = ct();
            var i = ht();
            if (!n || i) {
                t = E
            } else {
                if (r && e == b && (!N.triggerOnTouchEnd || N.triggerOnTouchLeave)) {
                    t = w
                } else {
                    if (!r && e == w && N.triggerOnTouchLeave) {
                        t = E
                    }
                }
            }
            return t
        }

        function ft(e, t) {
            var n = undefined;
            if (Et() || wt()) {
                n = lt(e, t, f)
            } else {
                if ((yt() || gt()) && n !== false) {
                    n = lt(e, t, l)
                }
            }
            if (_t() && n !== false) {
                n = lt(e, t, h)
            } else {
                if (Dt() && n !== false) {
                    n = lt(e, t, p)
                } else {
                    if (Mt() && n !== false) {
                        n = lt(e, t, c)
                    }
                }
            }
            if (t === E) {
                st(e)
            }
            if (t === w) {
                if (S) {
                    if (e.touches.length == 0) {
                        st(e)
                    }
                } else {
                    st(e)
                }
            }
            return n
        }

        function lt(u, a, d) {
            var v = undefined;
            if (d == f) {
                X.trigger("swipeStatus", [a, H || null, P || 0, B || 0, $]);
                if (N.swipeStatus) {
                    v = N.swipeStatus.call(X, u, a, H || null, P || 0, B || 0, $);
                    if (v === false) {
                        return false
                    }
                }
                if (a == w && bt()) {
                    X.trigger("swipe", [H, P, B, $]);
                    if (N.swipe) {
                        v = N.swipe.call(X, u, H, P, B, $);
                        if (v === false) {
                            return false
                        }
                    }
                    switch (H) {
                        case t:
                            X.trigger("swipeLeft", [H, P, B, $]);
                            if (N.swipeLeft) {
                                v = N.swipeLeft.call(X, u, H, P, B, $)
                            }
                            break;
                        case n:
                            X.trigger("swipeRight", [H, P, B, $]);
                            if (N.swipeRight) {
                                v = N.swipeRight.call(X, u, H, P, B, $)
                            }
                            break;
                        case r:
                            X.trigger("swipeUp", [H, P, B, $]);
                            if (N.swipeUp) {
                                v = N.swipeUp.call(X, u, H, P, B, $)
                            }
                            break;
                        case i:
                            X.trigger("swipeDown", [H, P, B, $]);
                            if (N.swipeDown) {
                                v = N.swipeDown.call(X, u, H, P, B, $)
                            }
                            break
                    }
                }
            }
            if (d == l) {
                X.trigger("pinchStatus", [a, z || null, U || 0, B || 0, $, R]);
                if (N.pinchStatus) {
                    v = N.pinchStatus.call(X, u, a, z || null, U || 0, B || 0, $, R);
                    if (v === false) {
                        return false
                    }
                }
                if (a == w && mt()) {
                    switch (z) {
                        case s:
                            X.trigger("pinchIn", [z || null, U || 0, B || 0, $, R]);
                            if (N.pinchIn) {
                                v = N.pinchIn.call(X, u, z || null, U || 0, B || 0, $, R)
                            }
                            break;
                        case o:
                            X.trigger("pinchOut", [z || null, U || 0, B || 0, $, R]);
                            if (N.pinchOut) {
                                v = N.pinchOut.call(X, u, z || null, U || 0, B || 0, $, R)
                            }
                            break
                    }
                }
            }
            if (d == c) {
                if (a === E || a === w) {
                    clearTimeout(et);
                    if (Nt() && !Lt()) {
                        Z = en();
                        et = setTimeout(e.proxy(function() {
                            Z = null;
                            X.trigger("tap", [u.target]);
                            if (N.tap) {
                                v = N.tap.call(X, u, u.target)
                            }
                        }, this), N.doubleTapThreshold)
                    } else {
                        Z = null;
                        X.trigger("tap", [u.target]);
                        if (N.tap) {
                            v = N.tap.call(X, u, u.target)
                        }
                    }
                }
            } else {
                if (d == h) {
                    if (a === E || a === w) {
                        clearTimeout(et);
                        Z = null;
                        X.trigger("doubletap", [u.target]);
                        if (N.doubleTap) {
                            v = N.doubleTap.call(X, u, u.target)
                        }
                    }
                } else {
                    if (d == p) {
                        if (a === E || a === w) {
                            clearTimeout(et);
                            Z = null;
                            X.trigger("longtap", [u.target]);
                            if (N.longTap) {
                                v = N.longTap.call(X, u, u.target)
                            }
                        }
                    }
                }
            }
            return v
        }

        function ct() {
            var e = true;
            if (N.threshold !== null) {
                e = P >= N.threshold
            }
            return e
        }

        function ht() {
            var e = false;
            if (N.cancelThreshold !== null && H !== null) {
                e = Wt(H) - P >= N.cancelThreshold
            }
            return e
        }

        function pt() {
            if (N.pinchThreshold !== null) {
                return U >= N.pinchThreshold
            }
            return true
        }

        function dt() {
            var e;
            if (N.maxTimeThreshold) {
                if (B >= N.maxTimeThreshold) {
                    e = false
                } else {
                    e = true
                }
            } else {
                e = true
            }
            return e
        }

        function vt(e, s) {
            if (N.allowPageScroll === u || gt()) {
                e.preventDefault()
            } else {
                var o = N.allowPageScroll === a;
                switch (s) {
                    case t:
                        if (N.swipeLeft && o || !o && N.allowPageScroll != d) {
                            e.preventDefault()
                        }
                        break;
                    case n:
                        if (N.swipeRight && o || !o && N.allowPageScroll != d) {
                            e.preventDefault()
                        }
                        break;
                    case r:
                        if (N.swipeUp && o || !o && N.allowPageScroll != v) {
                            e.preventDefault()
                        }
                        break;
                    case i:
                        if (N.swipeDown && o || !o && N.allowPageScroll != v) {
                            e.preventDefault()
                        }
                        break
                }
            }
        }

        function mt() {
            var e = St();
            var t = xt();
            var n = pt();
            return e && t && n
        }

        function gt() {
            return !!(N.pinchStatus || N.pinchIn || N.pinchOut)
        }

        function yt() {
            return !!(mt() && gt())
        }

        function bt() {
            var e = dt();
            var t = ct();
            var n = St();
            var r = xt();
            var i = ht();
            var s = !i && r && n && t && e;
            return s
        }

        function wt() {
            return !!(N.swipe || N.swipeStatus || N.swipeLeft || N.swipeRight || N.swipeUp || N.swipeDown)
        }

        function Et() {
            return !!(bt() && wt())
        }

        function St() {
            return $ === N.fingers || N.fingers === m || !S
        }

        function xt() {
            return J[0].end.x !== 0
        }

        function Tt() {
            return !!N.tap
        }

        function Nt() {
            return !!N.doubleTap
        }

        function Ct() {
            return !!N.longTap
        }

        function kt() {
            if (Z == null) {
                return false
            }
            var e = en();
            return Nt() && e - Z <= N.doubleTapThreshold
        }

        function Lt() {
            return kt()
        }

        function At() {
            return ($ === 1 || !S) && (isNaN(P) || P === 0)
        }

        function Ot() {
            return B > N.longTapThreshold && P < g
        }

        function Mt() {
            return !!(At() && Tt())
        }

        function _t() {
            return !!(kt() && Nt())
        }

        function Dt() {
            return !!(Ot() && Ct())
        }

        function Pt() {
            G = en();
            Y = event.touches.length + 1
        }

        function Ht() {
            G = 0;
            Y = 0
        }

        function Bt() {
            var e = false;
            if (G) {
                var t = en() - G;
                if (t <= N.fingerReleaseThreshold) {
                    e = true
                }
            }
            return e
        }

        function jt() {
            return !!(X.data(x + "_intouch") === true)
        }

        function Ft(e) {
            if (e === true) {
                X.bind(O, rt);
                X.bind(M, it);
                if (_) {
                    X.bind(_, ot)
                }
            } else {
                X.unbind(O, rt, false);
                X.unbind(M, it, false);
                if (_) {
                    X.unbind(_, ot, false)
                }
            }
            X.data(x + "_intouch", e === true)
        }

        function It(e, t) {
            var n = t.identifier !== undefined ? t.identifier : 0;
            J[e].identifier = n;
            J[e].start.x = J[e].end.x = t.pageX || t.clientX;
            J[e].start.y = J[e].end.y = t.pageY || t.clientY;
            return J[e]
        }

        function qt(e) {
            var t = e.identifier !== undefined ? e.identifier : 0;
            var n = Rt(t);
            n.end.x = e.pageX || e.clientX;
            n.end.y = e.pageY || e.clientY;
            return n
        }

        function Rt(e) {
            for (var t = 0; t < J.length; t++) {
                if (J[t].identifier == e) {
                    return J[t]
                }
            }
        }

        function Ut() {
            var e = [];
            for (var t = 0; t <= 5; t++) {
                e.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                })
            }
            return e
        }

        function zt(e, t) {
            t = Math.max(t, Wt(e));
            W[e].distance = t
        }

        function Wt(e) {
            if (W[e]) {
                return W[e].distance
            }
            return undefined
        }

        function Xt() {
            var e = {};
            e[t] = Vt(t);
            e[n] = Vt(n);
            e[r] = Vt(r);
            e[i] = Vt(i);
            return e
        }

        function Vt(e) {
            return {
                direction: e,
                distance: 0
            }
        }

        function $t() {
            return Q - K
        }

        function Jt(e, t) {
            var n = Math.abs(e.x - t.x);
            var r = Math.abs(e.y - t.y);
            return Math.round(Math.sqrt(n * n + r * r))
        }

        function Kt(e, t) {
            var n = t / e * 1;
            return n.toFixed(2)
        }

        function Qt() {
            if (R < 1) {
                return o
            } else {
                return s
            }
        }

        function Gt(e, t) {
            return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)))
        }

        function Yt(e, t) {
            var n = e.x - t.x;
            var r = t.y - e.y;
            var i = Math.atan2(r, n);
            var s = Math.round(i * 180 / Math.PI);
            if (s < 0) {
                s = 360 - Math.abs(s)
            }
            return s
        }

        function Zt(e, s) {
            var o = Yt(e, s);
            if (o <= 45 && o >= 0) {
                return t
            } else {
                if (o <= 360 && o >= 315) {
                    return t
                } else {
                    if (o >= 135 && o <= 225) {
                        return n
                    } else {
                        if (o > 45 && o < 135) {
                            return i
                        } else {
                            return r
                        }
                    }
                }
            }
        }

        function en() {
            var e = new Date;
            return e.getTime()
        }

        function tn(t) {
            t = e(t);
            var n = t.offset();
            var r = {
                left: n.left,
                right: n.left + t.outerWidth(),
                top: n.top,
                bottom: n.top + t.outerHeight()
            };
            return r
        }

        function nn(e, t) {
            return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom
        }
        var C = S || !N.fallbackToMouseEvents,
            L = C ? "touchstart" : "mousedown",
            O = C ? "touchmove" : "mousemove",
            M = C ? "touchend" : "mouseup",
            _ = C ? null : "mouseleave",
            D = "touchcancel";
        var P = 0,
            H = null,
            B = 0,
            F = 0,
            I = 0,
            R = 1,
            U = 0,
            z = 0,
            W = null;
        var X = e(T);
        var V = "start";
        var $ = 0;
        var J = null;
        var K = 0,
            Q = 0,
            G = 0,
            Y = 0,
            Z = 0;
        var et = null;
        try {
            X.bind(L, nt);
            X.bind(D, st)
        } catch (tt) {
            e.error("events not supported " + L + "," + D + " on jQuery.swipe")
        }
        this.enable = function() {
            X.bind(L, nt);
            X.bind(D, st);
            return X
        };
        this.disable = function() {
            ut();
            return X
        };
        this.destroy = function() {
            ut();
            X.data(x, null);
            return X
        };
        this.option = function(t, n) {
            if (N[t] !== undefined) {
                if (n === undefined) {
                    return N[t]
                } else {
                    N[t] = n
                }
            } else {
                e.error("Option " + t + " does not exist on jQuery.swipe.options")
            }
            return null
        }
    }
    var t = "left",
        n = "right",
        r = "up",
        i = "down",
        s = "in",
        o = "out",
        u = "none",
        a = "auto",
        f = "swipe",
        l = "pinch",
        c = "tap",
        h = "doubletap",
        p = "longtap",
        d = "horizontal",
        v = "vertical",
        m = "all",
        g = 10,
        y = "start",
        b = "move",
        w = "end",
        E = "cancel",
        S = "ontouchstart" in window,
        x = "TouchSwipe";
    var T = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe"
    };
    e.fn.swipe = function(t) {
        var n = e(this),
            r = n.data(x);
        if (r && typeof t === "string") {
            if (r[t]) {
                return r[t].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                e.error("Method " + t + " does not exist on jQuery.swipe")
            }
        } else {
            if (!r && (typeof t === "object" || !t)) {
                return N.apply(this, arguments)
            }
        }
        return n
    };
    e.fn.swipe.defaults = T;
    e.fn.swipe.phases = {
        PHASE_START: y,
        PHASE_MOVE: b,
        PHASE_END: w,
        PHASE_CANCEL: E
    };
    e.fn.swipe.directions = {
        LEFT: t,
        RIGHT: n,
        UP: r,
        DOWN: i,
        IN: s,
        OUT: o
    };
    e.fn.swipe.pageScroll = {
        NONE: u,
        HORIZONTAL: d,
        VERTICAL: v,
        AUTO: a
    };
    e.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: m
    }
});
(function(e) {
    "use strict";
    e.fn.fitVids = function(t) {
        var n = {
            customSelector: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var r = document.head || document.getElementsByTagName("head")[0];
            var i = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}";
            var s = document.createElement("div");
            s.innerHTML = '<p>x</p><style id="fit-vids-style">' + i + "</style>";
            r.appendChild(s.childNodes[1])
        }
        if (t) {
            e.extend(n, t)
        }
        return this.each(function() {
            var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            if (n.customSelector) {
                t.push(n.customSelector)
            }
            var r = e(this).find(t.join(","));
            r = r.not("object object");
            r.each(function() {
                var t = e(this);
                if (this.tagName.toLowerCase() === "embed" && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length) {
                    return
                }
                var n = this.tagName.toLowerCase() === "object" || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(),
                    r = !isNaN(parseInt(t.attr("width"), 10)) ? parseInt(t.attr("width"), 10) : t.width(),
                    i = n / r;
                t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", i * 100 + "%");
                t.removeAttr("height").removeAttr("width")
            })
        })
    }
})(window.jQuery || window.Zepto);
(function() {
    var e = document.createElement("script");
    e.src = "https://www.youtube.com/player_api";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t)
})();
var YT_ready = function() {
    var e = [],
        t = false;
    return function(n, r) {
        if (n === true) {
            t = true;
            while (e.length) {
                e.shift()()
            }
        } else if (typeof n == "function") {
            if (t) n();
            else e[r ? "unshift" : "push"](n)
        }
    }
}();
var youtubeplayers = {};
YT_ready(function() {
    setTimeout(function() {
        try {
            $("iframe[src*='youtube.com']").each(function() {
                var e = this.id;
                var t = this.src;
                if (!e) {
                    $(this).attr("id", "bs-iframe" + Math.floor(Math.random(10) * 9999 + 1));
                    e = this.id
                }
                if (/\?/.test(t) && !/\enablejsapi=1/.test(t)) {
                    $(this).attr("src", t + "&playerapiid=" + e + "&enablejsapi=1");
                    t = this.src
                } else if (!/\?/.test(t)) {
                    $(this).attr("src", t + "?playerapiid=" + e + "&enablejsapi=1");
                    t = this.src
                }
                var n = getFrameID(e);
                if (n) {
                    youtubeplayers[n] = new YT.Player(n, {
                        events: {
                            onStateChange: onPlayerStateChange
                        }
                    })
                }
            })
        } catch (e) {}
    }, 500)
});
var Froogaloop = function() {
    function e(t) {
        return new e.fn.init(t)
    }

    function t(e, t, n) {
        if (!n.contentWindow.postMessage) return !1;
        var r = n.getAttribute("src").split("?")[0],
            e = JSON.stringify({
                method: e,
                value: t
            });
        "//" === r.substr(0, 2) && (r = window.location.protocol + r);
        n.contentWindow.postMessage(e, r)
    }

    function n(e) {
        var t, n;
        try {
            t = JSON.parse(e.data), n = t.event || t.method
        } catch (r) {}
        "ready" == n && !s && (s = !0);
        if (e.origin != o) return !1;
        var e = t.value,
            u = t.data,
            a = "" === a ? null : t.player_id;
        t = a ? i[a][n] : i[n];
        n = [];
        if (!t) return !1;
        void 0 !== e && n.push(e);
        u && n.push(u);
        a && n.push(a);
        return 0 < n.length ? t.apply(null, n) : t.call()
    }

    function r(e, t, n) {
        n ? (i[n] || (i[n] = {}), i[n][e] = t) : i[e] = t
    }
    var i = {},
        s = !1,
        o = "";
    e.fn = e.prototype = {
        element: null,
        init: function(e) {
            "string" === typeof e && (e = document.getElementById(e));
            this.element = e;
            e = this.element.getAttribute("src");
            "//" === e.substr(0, 2) && (e = window.location.protocol + e);
            for (var e = e.split("/"), t = "", n = 0, r = e.length; n < r; n++) {
                if (3 > n) t += e[n];
                else break;
                2 > n && (t += "/")
            }
            o = t;
            return this
        },
        api: function(e, n) {
            if (!this.element || !e) return !1;
            var i = this.element,
                s = "" !== i.id ? i.id : null,
                o = !n || !n.constructor || !n.call || !n.apply ? n : null,
                u = n && n.constructor && n.call && n.apply ? n : null;
            u && r(e, u, s);
            t(e, o, i);
            return this
        },
        addEvent: function(e, n) {
            if (!this.element) return !1;
            var i = this.element,
                o = "" !== i.id ? i.id : null;
            r(e, n, o);
            "ready" != e ? t("addEventListener", e, i) : "ready" == e && s && n.call(null, o);
            return this
        },
        removeEvent: function(e) {
            if (!this.element) return !1;
            var n = this.element,
                r;
            e: {
                if ((r = "" !== n.id ? n.id : null) && i[r]) {
                    if (!i[r][e]) {
                        r = !1;
                        break e
                    }
                    i[r][e] = null
                } else {
                    if (!i[e]) {
                        r = !1;
                        break e
                    }
                    i[e] = null
                }
                r = !0
            }
            "ready" != e && r && t("removeEventListener", e, n)
        }
    };
    e.fn.init.prototype = e.fn;
    window.addEventListener ? window.addEventListener("message", n, !1) : window.attachEvent("onmessage", n);
    return window.Froogaloop = window.$f = e
}();
jQuery("iframe[src*='player.vimeo.com']").each(function() {
    var e = this.id;
    var t = this.src;
    if (!e) {
        $(this).attr("id", "bs-iframe" + Math.floor(Math.random(10) * 9999 + 1));
        e = this.id
    }
    if (/\?/.test(t) && !/\api=1/.test(t)) {
        $(this).attr("src", t + "&player_id=" + e + "&api=1");
        t = this.src
    } else if (!/\?/.test(t)) {
        $(this).attr("src", t + "?player_id=" + e + "&api=1");
        t = this.src
    }
    Froogaloop(this).addEvent("ready", ready)
})