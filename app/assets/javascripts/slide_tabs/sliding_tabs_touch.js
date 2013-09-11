(function ($) {
    $.extend($.stCore, {
        initTabTouch: function () {
            if (this.val.isTouch) {
                this.setTabSwipeLength();
                this.tabs.maxXY = this.opt.offsetBR;
                this.bindTabTouch();
                this.tabs.isAnim = false;
                this.tabs.dist = 0
            }
        },
        setTabSwipeLength: function () {
            var a = this.getTotalTabsLength();
            var b = (a - this.val.tabsSlideLength);
            this.tabs.minXY = -(b + this.opt.offsetTL)
        },
        bindTabTouch: function () {
            var a = this;
            this.$a.unbind("dragstart").bind("dragstart", function () {
                return false
            });
            this.$tabsInnerCont.unbind("touchstart").bind("touchstart", function (e) {
                a.tabTouchStart(e)
            })
        },
        unbindTabTouch: function () {
            this.$tabsInnerCont.unbind("touchstart")
        },
        tabTouchStart: function (e) {
            if (this.tabs.isAnim) {
                e.preventDefault();
                return false
            }
            var a = this;
            var b = e.originalEvent.touches;
            if (b && b.length == 1) {
                this.e = b[0]
            } else {
                return false
            }
            this.$doc.bind("touchmove", function (e) {
                a.tabTouchMove(e)
            });
            this.$doc.bind("touchend", function (e) {
                a.tabTouchEnd(e)
            });
            if (this.val.useWebKit) {
                this.$tabs.css("-webkit-transition-duration", "0")
            }
            this.tabs.eXY = this.tabs.start = this.e[this.val.clientXY];
            if (this.val.useWebKit) {
                this.tabs.startXY = this.tabWebKitPosition(this.$tabs, this.val.arrPos)
            } else {
                this.tabs.startXY = parseInt(this.$tabs.css(this.val.css))
            }
            this.tabs.minMouseXY = this.tabs.eXY - this.tabs.startXY + this.tabs.minXY;
            this.tabs.maxMouseXY = this.tabs.minMouseXY + this.tabs.maxXY - this.tabs.minXY;
            this.tabs.acc = this.tabs.startXY;
            this.tabs.startTs = Date.now();
            return false
        },
        tabTouchMove: function (a) {
            e.preventDefault();
            var b = e.originalEvent.touches;
            if (b.length > 1) {
                return false
            }
            this.e = b[0];
            var c = this.tabs.end = this.e[this.val.clientXY];
            c = Math.max(c, this.tabs.minMouseXY);
            c = Math.min(c, this.tabs.maxMouseXY);
            this.tabs.lastPos = this.tabs.currPos;
            this.tabs.dist = c - this.tabs.eXY;
            if (this.tabs.lastPos != this.tabs.dist) {
                this.tabs.currPos = this.tabs.dist
            }
            this.tabs.newXY = this.tabs.startXY + this.tabs.dist;
            if (Math.abs(this.tabs.end - this.tabs.eXY) > 0) {
                this.setTabIsAnim(true, "pause")
            }
            this.$tabs.css(this.val.css, this.val.pre + this.tabs.newXY + this.val.px);
            var d = Date.now();
            if (d - this.tabs.startTs > 350) {
                this.tabs.startTs = d;
                this.tabs.acc = this.tabs.startXY + this.tabs.dist
            }
            return false
        },
        tabTouchEnd: function (e) {
            this.$doc.unbind('touchmove').unbind('touchend');
            if (this.val.useWebKit) {
                this.tabs.endXY = this.tabWebKitPosition(this.$tabs, this.val.arrPos)
            } else {
                this.tabs.endXY = parseInt(this.$tabs.css(this.val.css))
            }
            this.tabs.endXY = (isNaN(this.tabs.endXY)) ? 0 : this.tabs.endXY;
            this.margin = Math.abs(this.tabs.endXY);
            var a = this;
            var b = Math.abs(this.tabs.dist);
            if (!b) {
                if (this.margin == this.opt.offsetTL) {
                    setTimeout(function () {
                        a.tabs.isAnim = false
                    }, 100)
                } else if (this.margin == Math.abs(this.tabs.minXY)) {
                    setTimeout(function () {
                        a.tabs.isAnim = false
                    }, 100)
                }
                return false
            }
            var c = Math.max(40, (Date.now()) - this.tabs.startTs);
            var d = Math.abs(this.tabs.acc - this.tabs.endXY);
            var f = d / c;
            var g = Math.abs(this.val.tabsSlideLength - b);
            this.tabs.swipeSpeed = Math.max((g) / f, 200);
            this.tabs.swipeSpeed = Math.min(this.tabs.swipeSpeed, 600);
            this.tabs.swipeSpeed = (isNaN(this.tabs.swipeSpeed)) ? 300 : this.tabs.swipeSpeed;
            if (!this.margin) {
                if (this.opt.buttonsFunction == "slide" && !this.opt.tabsLoop) {
                    this.disableTabButton(this.$prev);
                    this.enableTabButton(this.$next)
                }
                setTimeout(function () {
                    a.setTabIsAnim(false, "resume")
                }, 100);
                return false
            } else if (this.margin == Math.abs(this.tabs.minXY)) {
                if (this.opt.buttonsFunction == "slide" && !this.opt.tabsLoop) {
                    this.disableTabButton(this.$next);
                    this.enableTabButton(this.$prev)
                }
                setTimeout(function () {
                    a.setTabIsAnim(false, "resume")
                }, 100);
                return false
            }
            if (b > 30) {
                if (this.tabs.start > this.tabs.end) {
                    if (this.tabs.lastPos < this.tabs.currPos) {
                        this.slideTabBack(this.tabs.swipeSpeed);
                        return false
                    }
                    this.slideNextTab(this.tabs.swipeSpeed)
                } else if (this.tabs.start < this.tabs.end) {
                    if (this.tabs.lastPos > this.tabs.currPos) {
                        this.slideTabBack(this.tabs.swipeSpeed);
                        return false
                    }
                    this.slidePrevTab(this.tabs.swipeSpeed)
                } else {
                    this.slideTabBack(200)
                }
            } else {
                this.slideTabBack(200)
            }
            this.tabs.dist = 0;
            return false
        },
        slideTabBack: function (a) {
            var b = this;
            if (this.val.useWebKit) {
                this.bindTabWebKitCallback();
                this.$tabs.css({
                    "-webkit-transition-duration": a + "ms",
                    "-webkit-transition-timing-function": "ease-out"
                }).css(this.val.css, this.val.pre + this.tabs.startXY + this.val.px)
            } else {
                if (this.opt.orientation == "horizontal") {
                    this.$tabs.animate({
                        "marginLeft": this.tabs.startXY + "px"
                    }, a, "easeOutSine", function () {
                        b.setTabIsAnim(false, "resume")
                    })
                } else {
                    this.$tabs.animate({
                        "marginTop": this.tabs.startXY + "px"
                    }, a, "easeOutSine", function () {
                        b.setTabIsAnim(false, "resume")
                    })
                }
            }
            this.margin = Math.abs(this.tabs.startXY)
        },
        initContentTouch: function () {
            if (this.val.isTouch) {
                if (this.$a.length > 1 && this.content.animIsSlide) {
                    this.content.isTouch = true;
                    this.content.startEvent = "touchstart";
                    this.content.moveEvent = "touchmove";
                    this.content.endEvent = "touchend";
                    this.content.cancelEvent = "touchcancel";
                    this.bindContentTouch()
                }
            }
        },
        bindContentTouch: function () {
            var a = this;
            this.$contentCont.find("." + this.opt.classNoTouch).unbind("mousedown").unbind('touchstart').bind("mousedown touchstart", function (e) {
                e.stopImmediatePropagation()
            });
            this.$views.unbind(this.content.startEvent).bind(this.content.startEvent, function (e) {
                a.contentTouchStart(e)
            })
        },
        unbindContentTouch: function () {
            this.content.isTouch = false;
            this.$views.unbind(this.content.startEvent)
        },
        slideContentBack: function (a) {
            this.content.isAnim = true;
            var c = this;
            if (this.val.useWebKit) {
                this.bindContentWebKitCallback(true);
                this.$currentView.css({
                    "-webkit-transition-duration": a + "ms",
                    "-webkit-transition-timing-function": "ease-out"
                }).css(this.content.css, this.content.pre + "0" + b.content.px);
                this.$prevView.css({
                    "-webkit-transition-duration": a + "ms",
                    "-webkit-transition-timing-function": "ease-out"
                }).css(this.content.css, this.content.pre - this.content.slideLength + this.content.px);
                this.$nextView.css({
                    "-webkit-transition-duration": a + "ms",
                    "-webkit-transition-timing-function": "ease-out"
                }).css(this.content.css, this.content.pre + this.content.slideLength + this.content.px)
            } else {
                if (this.opt.contentAnim == "slideV") {
                    this.$prevView.animate({
                        "top": -this.content.slideLength + "px"
                    }, a, "easeOutSine");
                    this.$nextView.animate({
                        "top": this.content.slideLength + "px"
                    }, a, "easeOutSine");
                    this.$currentView.animate({
                        "top": "0px"
                    }, a, "easeOutSine", function () {
                        c.setContentIsAnim(false, "resume");
                        c.slideContentBackRePos()
                    })
                } else {
                    this.$prevView.animate({
                        "left": -this.content.slideLength + "px"
                    }, a, "easeOutSine");
                    this.$nextView.animate({
                        "left": this.content.slideLength + "px"
                    }, a, "easeOutSine");
                    this.$currentView.animate({
                        "left": "0px"
                    }, a, "easeOutSine", function () {
                        c.setContentIsAnim(false, "resume");
                        c.slideContentBackRePos()
                    })
                }
            }
        },
        slideContentBackRePos: function () {
            if (this.val.useWebKit) {
                this.$prevView.css("-webkit-transition-duration", "0ms");
                this.$nextView.css("-webkit-transition-duration", "0ms")
            }
            this.$prevView.css(this.content.css, this.content.pre + this.opt.viewportOffset + this.content.px);
            this.$nextView.css(this.content.css, this.content.pre + this.opt.viewportOffset + this.content.px)
        },
        contentTouchStart: function (e) {
            if (this.content.isAnim || this.tabs.isAnim || this.tabs.xhr) {
                return false
            }
            if (this.content.isMoving) {
                return false
            }
            var a = this;
            var b = e.originalEvent.touches;
            if (b && b.length > 0) {
                this.e = b[0];
                this.content.isMoving = true
            } else {
                return false
            } if (this.opt.autoplay) {
                this.pauseAutoPlay(false)
            }
            this.content.dirCheck = false;
            this.$doc.bind(this.content.moveEvent, function (e) {
                a.contentTouchMove(e)
            });
            this.$doc.bind(this.content.endEvent, function (e) {
                a.contentTouchEnd(e)
            });
            this.$prevView = this.$currentView.prev("div");
            this.$nextView = this.$currentView.next("div");
            var c = parseInt(this.$contentCont.css(this.content.wh));
            this.content.minXY = -c;
            this.content.maxXY = c;
            this.content.prevViewWH = -this.$prevView[this.content.owh](false);
            this.content.nextViewWH = this.$contentCont[this.content.wh]();
            if (this.val.useWebKit) {
                this.$currentView.css("-webkit-transition-duration", "0");
                this.$prevView.css("-webkit-transition-duration", "0");
                this.$nextView.css("-webkit-transition-duration", "0")
            }
            this.content.eX = this.e.pageX;
            this.content.eY = this.e.pageY;
            this.content.eXY = this.content.start = this.e[this.content.clientXY];
            this.content.startXY = parseInt(this.$currentView.css(this.content.css));
            this.content.startXY = (isNaN(this.content.startXY)) ? 0 : this.content.startXY;
            this.content.minMouseXY = this.content.eXY - this.content.startXY + this.content.minXY;
            this.content.maxMouseXY = this.content.minMouseXY + this.content.maxXY - this.content.minXY;
            this.content.acc = this.content.startXY;
            this.content.startTs = Date.now()
        },
        contentTouchMoveReturn: function () {
            this.$currentView.css(this.content.css, this.content.pre + this.content.px);
            this.$prevView.css(this.content.css, this.content.pre + this.content.prevViewWH + this.content.px);
            this.$nextView.css(this.content.css, this.content.pre + this.content.nextViewWH + this.content.px);
            this.setContentIsAnim(false, "resume")
        },
        contentTouchDir: function (e, a) {
            var b = (Math.abs(e.pageX - this.content.eX) - Math.abs(e.pageY - this.content.eY)) - (a ? -5 : 5);
            if (b > 5) {
                return "x"
            } else if (b < -5) {
                return "y"
            }
        },
        contentTouchMove: function (e) {
            if (this.content.dirBlock) {
                return
            }
            var a = e.originalEvent.touches;
            if (a.length > 1) {
                this.contentTouchEnd(e);
                return
            } else {
                this.e = a[0]
            } if (!this.content.dirCheck) {
                var b = (this.opt.contentAnim == "slideH") ? true : false;
                var c = this.contentTouchDir(this.e, b);
                if (c == "x") {
                    if (b) {
                        e.preventDefault()
                    } else {
                        this.content.dirBlock = true;
                        this.contentTouchEnd(this.e, true)
                    }
                    this.content.dirCheck = true
                } else if (c == "y") {
                    if (b) {
                        this.content.dirBlock = true;
                        this.contentTouchEnd(this.e, true)
                    } else {
                        e.preventDefault()
                    }
                    this.content.dirCheck = true
                }
                return
            }
            e.preventDefault();
            var d = this.content.end = this.e[this.content.clientXY];
            d = Math.max(d, this.content.minMouseXY);
            d = Math.min(d, this.content.maxMouseXY);
            this.content.lastPos = this.content.currPos;
            this.content.dist = d - this.content.eXY;
            if (this.content.lastPos != this.content.dist) {
                this.content.currPos = this.content.dist
            }
            if (!this.$prevView.length) {
                if (this.content.dist > 0) {
                    this.contentTouchMoveReturn();
                    return false
                }
            } else if (!this.$nextView.length) {
                if (this.content.dist < 0) {
                    this.contentTouchMoveReturn();
                    return false
                }
            }
            this.content.newXY = this.content.startXY + this.content.dist;
            var f = this.content.newXY + this.content.prevViewWH;
            var g = this.content.newXY + this.content.nextViewWH;
            this.$currentView.css(this.content.css, this.content.pre + this.content.newXY + this.content.px);
            this.$prevView.css(this.content.css, this.content.pre + f + this.content.px);
            this.$nextView.css(this.content.css, this.content.pre + g + this.content.px);
            var h = Date.now();
            if ((h - this.content.startTs) > 350) {
                this.content.startTs = h;
                this.content.acc = this.content.startXY + this.content.dist
            }
        },
        contentTouchEnd: function (e, b) {
            this.$doc.unbind(this.content.moveEvent).unbind(this.content.endEvent);
            this.content.isMoving = false;
            this.content.dirBlock = false;
            this.content.dirCheck = false;
            if (anim) {
                return
            }
            this.content.slideLength = this.$contentCont[this.content.wh]();
            var a = Math.abs(this.content.dist);
            var f;
            if (this.val.useWebKit) {
                f = this.tabWebKitPosition(this.$currentView, this.content.arrPos)
            } else {
                f = parseInt(this.$currentView.css(this.content.css))
            }
            f = (isNaN(f)) ? 0 : f;
            if (!a || !f) {
                this.slideContentBackRePos();
                return false
            }
            var g = Math.max(40, (Date.now()) - this.content.startTs);
            var h = Math.abs(this.content.acc - this.content.dist);
            var i = h / d;
            var j = Math.abs(this.content.slideLength - c);
            var k = this;
            this.content.swipeSpeed = Math.max((j) / i, 200);
            this.content.swipeSpeed = Math.min(this.content.swipeSpeed, 600);
            this.content.swipeSpeed = (isNaN(this.content.swipeSpeed)) ? 300 : this.content.swipeSpeed;
            if (a > 60) {
                var l;
                if (this.content.start > this.content.end) {
                    if (this.content.lastPos < this.content.currPos) {
                        this.slideContentBack(this.content.swipeSpeed);
                        return false
                    }
                    l = this.$tab.parent("li").next("li").children("a")
                } else if (this.content.start < this.content.end) {
                    if (this.content.lastPos > this.content.currPos) {
                        this.slideContentBack(this.content.swipeSpeed);
                        return false
                    }
                    l = this.$tab.parent("li").prev("li").children("a")
                }
                if (l && l.length) {
                    this.clickTab(l, true, this.content.swipeSpeed)
                } else {
                    this.slideContentBack(200)
                } if (a == this.content.maxXY) {
                    this.setContentIsAnim(false, "resume");
                    this.rePositionContentView()
                }
            } else {
                this.slideContentBack(200)
            }
            this.content.dist = 0;
            return false
        }
    });
    $.stExtend.tabsTouch = $.stCore.initTabTouch;
    $.stExtend.contentTouch = $.stCore.initContentTouch
})(jQuery);