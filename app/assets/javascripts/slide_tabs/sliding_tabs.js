/**************************************************************************
 * Sliding Tabs jQuery Plugin
 * @info: http://www.codegrape.com/item/sliding-tabs-jquery-plugin/1774
 * @version: 1.0 (04.03.2013)
 * @requires: jQuery v1.7 or later (tested on 1.10.1)
 * @author: flashblue - http://www.codegrape.com/user/flashblue
 **************************************************************************/
(function ($) {
    $.fn.slidingTabs = function (a) {
        var b = {
            ajaxCache: true,
            ajaxError: "Failed to load content.",
            ajaxSpinner: false,
            autoplay: false,
            autoplayClickStop: false,
            autoplayInterval: 5000,
            autoHeight: false,
            autoHeightSpeed: 0,
            buttonsFunction: "slide",
            classAutoplayCont: "st_autoplay",
            classBtnDisabled: "st_btn_disabled",
            classBtnNext: "st_next",
            classBtnPrev: "st_prev",
            classExtLink: "st_ext",
            classNoTouch: "st_no_touch",
            classTab: "st_tab",
            classTabActive: "st_tab_active",
            classTabActiveParent: "st_li_active",
            classTabSlidingEnabled: "st_sliding_active",
            classTabsContainer: "st_tabs",
            classTabsList: "st_tabs_ul",
            classView: "st_view",
            classViewActive: "st_view_active",
            classViewInner: "st_view_inner",
            classViewsContainer: "st_views",
            classViewsInner: "st_views_wrap",
            contentAnim: "slideH",
            contentAnimSpeed: 600,
            contentEasing: "easeInOutExpo",
            externalLinking: false,
            offsetBR: 0,
            offsetTL: 0,
            onAjaxComplete: null,
            onContentVisible: null,
            onTabClick: null,
            onTabNextSlide: null,
            onTabPrevSlide: null,
            orientation: "horizontal",
            responsive: false,
            tabsAnimSpeed: 300,
            tabsEasing: "",
            tabsLoop: false,
            tabsSaveState: false,
            tabsScroll: true,
            tabsShowHash: false,
            tabsSlideLength: 0,
            tabsToSlide: 1,
            totalHeight: "",
            totalWidth: "",
            touchSupport: false,
            urlLinking: false,
            useWebKit: true,
            viewportOffset: 2560
        };
        var a = $.extend(true, {}, b, a);
        var c;
        var d = new Array;
        this.each(function () {
            c = this;
            if (!c.slidingTabs) {
                c.slidingTabs = new SlidingTabs($(c), a)
            }
            d.push(c.slidingTabs)
        });
        return d.length > 1 ? d : d[0]
    };
    if (!$.stExtend) {
        $.stExtend = {}
    }

    function SlidingTabs(c, d) {
        this.$container = c;
        this.opt = d;
        this.$tabsCont = this.$container.find("." + this.opt.classTabsContainer).first();
        this.$tabsInnerCont = this.$tabsCont.children("div");
        this.$tabs = this.$tabsInnerCont.children("ul").addClass(this.opt.classTabsList);
        this.$lis = this.$tabs.children("li");
        this.$a = this.$lis.find("a").addClass(this.opt.classTab);
        if (!this.$a.length) {
            return false
        }
        this.$contentCont = this.$container.find("." + this.opt.classViewsContainer).first();
        this.$content = this.$contentCont;
        this.$views = this.$content.children("." + this.opt.classView);
        this.$prev = this.$tabsCont.find("." + this.opt.classBtnPrev);
        this.$next = this.$tabsCont.find("." + this.opt.classBtnNext);
        this.$doc = $(document);
        this.$tab;
        this.$tabActive = new Array();
        this.$li;
        this.$liLast;
        this.$view;
        this.$viewActive;
        this.val = {};
        this.e;
        this.margin = 0;
        this.tabs = {};
        this.content = {};
        this.$container.addClass("sliding-tabs");
        this.isParent = (this.$views.find(".sliding-tabs").length) ? true : false;
        this.$parentViews = this.$container.parents("." + this.opt.classView);
        this.isChild = this.$parentViews.length > 0 ? true : false;
        this.tabs.total = this.$lis.length;
        this.content.animIsSlide = (this.opt.contentAnim == "slideH" || this.opt.contentAnim == "slideV") ? true : false;
        var e = this;
        var f, hrefBase, baseEl, slug;
        var g = /^#.+/;
        this.$a.each(function (i, a) {
            f = $(a).attr("href");
            hrefBase = f.split("#")[0];
            if (hrefBase && (hrefBase === location.toString().split("#")[0] || (baseEl = $("base")[0]) && hrefBase === baseEl.href)) {
                f = a.hash;
                a.href = f
            }
            if (f && !g.test(f) && f != "#") {
                $.data(a, "load.tabs", f.replace(/#.*$/, ""));
                slug = e.getTabSlug(this);
                a.href = "#" + slug;
                e.$view = e.$content.children("." + slug);
                if (!e.$view.length) {
                    e.$view = $("<div />").addClass(slug + ' ' + e.opt.classView);
                    e.$content.append(e.$view);
                    e.$views = e.$views.add(e.$view)
                }
            } else {
                slug = $(a).data("target");
                if (slug) {
                    a.href = "#" + slug
                }
            }
        });
        this.$lis.first().addClass("st_li_first");
        this.$lis.last().addClass("st_li_last");
        this.$a.first().addClass("st_tab_first");
        this.$a.last().addClass("st_tab_last");
        this.$views.first().addClass("st_view_first");
        if (!this.$prev.length) {
            this.$prev = $('<a href="#" class="' + this.opt.classBtnPrev + '" />');
            this.$tabsCont.prepend(this.$prev)
        }
        if (!this.$next.length) {
            this.$next = $('<a href="#" class="' + this.opt.classBtnNex + '" />');
            this.$tabsCont.prepend(this.$next)
        }
        var h = ("ontouchstart" in window);
        if (this.opt.touchSupport && h) {
            this.val.isTouch = true
        }
        var j = function (a) {
            a = a.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {
                browser: b[1] || "",
                version: b[2] || "0"
            }
        };
        var k = j(navigator.userAgent);
        var l = {};
        if (k.browser) {
            l[k.browser] = true;
            l.version = k.version
        }
        if (l.chrome) {
            l.webkit = true
        } else if (l.webki) {
            l.safari = true
        }
        if (this.opt.useWebKit) {
            if (h || l.safari) {
                if (("WebKitCSSMatrix" in window) && ("m11" in new WebKitCSSMatrix())) {
                    this.$container.addClass("st_webkit");
                    this.val.useWebKit = true;
                    if (!this.opt.tabsAnimSpeed) {
                        this.opt.tabsAnimSpeed = 1
                    }
                    if (!this.opt.contentAnimSpeed) {
                        this.opt.contentAnimSpeed = 1
                    }
                }
            }
        }
        if (this.opt.orientation == "horizontal") {
            this.$tabsInnerCont.css("overflow", "hidden");
            this.val.topleft = "left";
            this.val.outerWH = "outerWidth";
            this.val.WH = "width";
            this.val.clientXY = "clientX";
            this.val.arrPos = 4;
            if (this.val.useWebKit) {
                this.val.css = "-webkit-transform";
                this.val.pre = "translate3d(";
                this.val.px = "px,0px,0px)"
            } else {
                this.val.css = "marginLeft";
                this.val.pre = "";
                this.val.px = "px"
            }
        } else {
            this.val.topleft = "top";
            this.val.outerWH = "outerHeight";
            this.val.WH = "height";
            this.val.clientXY = "clientY";
            this.val.arrPos = 5;
            if (this.val.useWebKit) {
                this.val.css = "-webkit-transform";
                this.val.pre = "translate3d(0px,";
                this.val.px = "px,0px)"
            } else {
                this.val.css = "marginTop";
                this.val.pre = "";
                this.val.px = "px"
            }
            var m = this.$prev.outerHeight(true);
            var n = this.$next.outerHeight(true);
            this.val.buttonsH = (m >= n) ? m : n
        } if (this.opt.totalWidth.length > 0) {
            this.resizeWidth()
        }
        if (this.opt.totalHeight.length > 0) {
            this.resizeHeight()
        }
        this.initTabs();
        if (this.opt.autoplay && !this.xhr) {
            this.initAutoPlay()
        }
        $.each($.stExtend, function (i, a) {
            a.call(e)
        })
    };
    SlidingTabs.prototype = {
        resizeWidth: function () {
            if (this.opt.totalWidth == "auto") {
                this.$container.css("width", "100%")
            } else {
                this.$container.css("width", this.opt.totalWidth + "px")
            }
        },
        resizeHeight: function () {
            var a = (this.$contentCont.outerHeight(true) - this.$contentCont.height());
            var b;
            if (this.opt.orientation == "vertical") {
                var c = (this.$tabsCont.outerHeight(false) - this.$tabsCont.height());
                b = (this.opt.totalHeight - a);
                this.$tabsCont.css("height", (this.opt.totalHeight - c) + "px");
                this.$contentCont.css("height", b + "px")
            } else {
                b = (this.opt.totalHeight - (this.$tabsCont.outerHeight(true) + a));
                this.$contentCont.css("height", b + "px")
            }
            this.content.orgHeight = b
        },
        initTabs: function () {
            var a = this.tabs;
            a.animated = "#" + this.$container.attr("id") + " ." + this.opt.classTabsList + ":animated";
            a.loop = false;
            a.slugCount = this.$a.length;
            a.tabsContWH = this.$tabsCont[this.val.outerWH](false);
            a.tabsOH = this.$tabs.outerHeight(true);
            a.tabsOrgWidth = this.getTotalTabsLength();
            a.buttonsVisible = (this.$prev.is(":visible") || this.$next.is(":visible")) ? true : false;
            this.setTabSlideLength();
            this.posActiveTab();
            this.bindTabs()
        },
        getTabSlug: function (a) {
            var b = $(a).data("target");
            return b && b.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || "tab-" + (this.total++)
        },
        setUniqueTabSlug: function (a) {
            var b = this;
            this.$a.each(function () {
                if ($(this).attr("href") == "#" + a) {
                    b.slugCount++;
                    b.slug = "tab-" + b.slugCount;
                    b.setUniqueTabSlug(b.slug);
                    return
                }
            })
        },
        getTotalTabsLength: function () {
            var a = this,
                tabsTotWH = 0;
            this.$tabs.children("li").each(function () {
                tabsTotWH += parseInt($(this).css(a.val.WH))
            });
            return tabsTotWH
        },
        setTabSlideLength: function () {
            if (this.opt.tabsSlideLength == 0) {
                if (this.opt.orientation == "horizontal") {
                    this.val.tabsSlideLength = this.$tabsInnerCont.outerWidth(false)
                } else {
                    var a = this.$tabsInnerCont.position().top;
                    if (this.$container.hasClass(this.opt.classTabSlidingEnabled)) {
                        a = (a == 0) ? this.val.buttonsH : a
                    }
                    this.val.tabsSlideLength = (parseInt(this.$tabsCont.css('height')) - a)
                }
            } else {
                this.val.tabsSlideLength = this.opt.tabsSlideLength
            }
        },
        bindTabs: function () {
            var b = this,
                hash;
            if (this.opt.responsive) {
                var c = null,
                    limitXY;
                $(window).resize(function () {
                    if (c) {
                        clearTimeout(c)
                    }
                    c = setTimeout(function () {
                        if (b.$container.is(":hidden")) {
                            return false
                        }
                        if (b.opt.orientation == "horizontal") {
                            b.setTabAutoWidth()
                        } else {
                            b.setTabAutoHeight()
                        } if (b.opt.autoHeight && !b.isParent) {
                            b.setContentHeight(true)
                        }
                    }, 100)
                })
            }
            this.$prev.click(function () {
                if (b.tabs.isAnim) {
                    return false
                }
                b[b.opt.buttonsFunction + "PrevTab"]();
                return false
            }), this.$next.click(function () {
                if (b.tabs.isAnim) {
                    return false
                }
                b[b.opt.buttonsFunction + "NextTab"]();
                return false
            }), this.$tabs.delegate("li a." + b.opt.classTab, "click", function () {
                if (b.tabs.isAnim) {
                    return false
                }
                b.clickTab(this, true);
                if (!b.opt.tabsShowHash) {
                    return false
                }
            });
            if ($.fn.mousewheel && b.opt.tabsScroll) {
                b.$tabs.mousewheel(function (e, a) {
                    if (b.tabs.isAnim) {
                        return false
                    }(a > 0) ? b.slidePrevTab() : b.slideNextTab();
                    return false
                })
            }
            if (this.opt.externalLinking) {
                $("." + this.opt.classExtLink).each(function () {
                    if ($(this).attr("rel") == b.$container.attr("id")) {
                        $(this).click(function () {
                            if (b.tabs.isAnim) {
                                return false
                            }
                            hash = b.getTabHash($(this));
                            b.$tab = b.findTabByRel(hash);
                            b.clickTab(b.$tab);
                            if (!b.opt.tabsShowHash) {
                                return false
                            }
                        })
                    }
                })
            }
        },
        setTabAutoWidth: function () {
            this.setTabSlideLength();
            var a = this.getTotalTabsLength();
            var b = (this.buttonsVisible) ? parseInt(this.$tabsInnerCont.css("width")) : parseInt(this.$tabsCont.css("width"));
            if (this.$container.hasClass(this.opt.classTabSlidingEnabled)) {
                if (this.tabsDiff == undefined) {
                    this.tabsDiff = (this.tabs.tabsOrgWidth - a)
                } else {
                    if (this.tabsDiff < 5) {
                        a += this.tabsDiff
                    }
                }
            }
            if (a <= b) {
                this.margin = this.opt.offsetBR;
                this.hideTabButtons();
                this.$tabs.css(this.val.css, this.val.pre - this.margin + this.val.px)
            } else {
                var c = parseInt(this.$tabsInnerCont.css("width")) - (this.$liLast.position().left + this.$liLast.outerWidth(false));
                if (c > this.opt.offsetBR) {
                    this.margin = (this.margin - c);
                    this.posTabs();
                    this.disableTabButton(this.$next);
                    this.enableTabButton(this.$prev)
                } else {
                    this.initTabButtons()
                }
                this.$container.addClass(this.opt.classTabSlidingEnabled);
                this.showTabButtons()
            }
            this.setTabSlideLength();
            if (this.val.isTouch) {
                this.setTabSwipeLength()
            }
        },
        setTabAutoHeight: function () {
            var d = this;
            if (this.resizeTimer) {
                clearTimeout(this.resizeTimer)
            }
            this.resizeTimer = setTimeout(function () {
                d.setTabSlideLength();
                if (d.$tabs.outerHeight(false) < d.$tabsCont.outerHeight(true)) {
                    d.margin = d.opt.offsetBR;
                    d.hideTabButtons();
                    d.$tabs.css(d.val.css, d.val.pre - d.margin + d.val.px)
                } else {
                    var a, $unalignedLi, alignedTop = false,
                        alignedBottom = false;
                    var b = d.$lis.last();
                    var c = d.val.tabsSlideLength - (b.position().top + b.outerHeight(false));
                    if (c > d.opt.offsetBR) {
                        d.margin -= c;
                        d.posTabs();
                        d.disableTabButton(d.$next);
                        d.enableTabButton(d.$prev)
                    } else {
                        d.$lis.each(function () {
                            a = $(this);
                            c = a.position().top;
                            if (c == d.opt.offsetTL) {
                                alignedTop = true
                            } else if ((c + a.children('a').outerHeight(false)) == (d.val.tabsSlideLength - d.opt.offsetBR)) {
                                alignedBottom = true;
                                return false
                            } else if (c < 0) {
                                $unalignedLi = a
                            }
                        });
                        if (!alignedTop && !alignedBottom) {
                            d.margin -= Math.abs($unalignedLi.position().top);
                            d.posTabs()
                        }
                        d.initTabButtons()
                    }
                    d.$container.addClass(d.opt.classTabSlidingEnabled);
                    d.showTabButtons()
                }
                d.setTabSlideLength();
                if (d.val.isTouch) {
                    d.setTabSwipeLength()
                }
            }, 200)
        },
        posActiveTab: function () {
            this.getActiveTab();
            this.initContent(true);
            this.$liLast = this.$tabs.children("li:last");
            this.$tab = this.$tabActive;
            this.$tabActive = this.$tabActive.parents("li");
            if ((this.$liLast[this.val.outerWH](false) + this.$liLast.position()[this.val.topleft]) > this.val.tabsSlideLength) {
                this.$container.addClass(this.opt.classTabSlidingEnabled);
                this.showTabButtons();
                this.setTabSlideLength();
                this.setActiveTabPos(this.$tab[this.val.outerWH](false), this.$tabActive.position()[this.val.topleft]);
                if (!this.opt.tabsLoop) {
                    this.initTabButtons()
                }
            }
        },
        setActiveTabPos: function (a, b) {
            this.val.elemD = a;
            this.val.elemP = b;
            if (this.val.elemP > this.val.tabsSlideLength) {
                this.margin = (this.val.elemD + (this.val.elemP - this.val.tabsSlideLength));
                this.margin += this.opt.offsetBR
            } else if ((this.val.elemP + this.val.elemD) > this.val.tabsSlideLength) {
                this.margin = (this.val.elemD - (this.val.tabsSlideLength - this.val.elemP));
                this.margin += this.opt.offsetBR
            } else {
                this.margin -= this.opt.offsetTL
            }
            this.posTabs()
        },
        posTabs: function () {
            if (this.val.useWebKit) {
                this.$tabs.css("-webkit-transition-duration", "0ms")
            }
            this.$tabs.css(this.val.css, this.val.pre - this.margin + this.val.px)
        },
        showAppendedTab: function (a) {
            var b = this.getTotalTabsLength();
            if (b > this.val.tabsSlideLength - this.opt.offsetBR) {
                this.$container.addClass(this.opt.classTabSlidingEnabled);
                this.showTabButtons();
                this.setTabButtonState();
                this.setTabSlideLength();
                if (a) {
                    b = this.getTotalTabsLength();
                    this.margin = (b - this.val.tabsSlideLength) + this.opt.offsetBR;
                    this.animateTab(300)
                }
            }
        },
        initTabButtons: function () {
            if (this.opt.buttonsFunction == "slide" && !this.opt.tabsLoop) {
                if (this.$lis.first().position()[this.val.topleft] == this.opt.offsetTL) {
                    this.disableTabButton(this.$prev)
                } else {
                    this.enableTabButton(this.$prev)
                } if ((this.$liLast.position()[this.val.topleft] + this.$liLast[this.val.outerWH](false)) <= (this.val.tabsSlideLength - this.opt.offsetBR)) {
                    this.disableTabButton(this.$next)
                } else {
                    this.enableTabButton(this.$next)
                }
            } else {
                this.setTabButtonState()
            }
        },
        enableTabButton: function (a) {
            a.removeClass(this.opt.classBtnDisabled)
        },
        disableTabButton: function (a) {
            a.addClass(this.opt.classBtnDisabled)
        },
        showTabButtons: function () {
            this.$prev.css("display", "block");
            this.$next.css("display", "block");
            if (this.tabsDiff == undefined) {
                var a = this.getTotalTabsLength();
                this.tabsDiff = Math.abs(this.tabs.tabsOrgWidth - a)
            }
        },
        hideTabButtons: function () {
            this.$container.removeClass(this.opt.classTabSlidingEnabled);
            this.$prev.hide();
            this.$next.hide()
        },
        clickTab: function (a, b, c, d) {
            if (this.content.isAnim || this.proccessing) {
                return false
            }
            this.$tab = $(a);
            if (this.$tab.hasClass(this.opt.classTabActive)) {
                return false
            }
            if (typeof (this.opt.onTabClick) == "function") {
                this.opt.onTabClick.call(this.$tab)
            }
            var e = $.data(this.$tab[0], "load.tabs");
            this.$li = this.$tab.parents("li");
            this.setActiveTab();
            this.val.elemP = this.$li.position();
            this.val.activeElemP = this.$tabActive.parent("li").position();
            this.isSwipe = c ? true : false;
            this.tabSlideClicked();
            if (this.opt.autoplay) {
                if (b) {
                    if (this.opt.autoplayClickStop) {
                        this.opt.autoplay = false;
                        this.clearAutoPlayInterval()
                    } else {
                        this.val.index = this.$tab.parents("li").index();
                        if (!this.isPause) {
                            this.setAutoPlayInterval()
                        }
                    }
                }
            }
            this.tabs.loop = d ? d : false;
            if (e) {
                this.loadTab(this.$tab, e, c, true)
            } else {
                this.showTab(this.$tab, c)
            }
        },
        loadTab: function (b, c, d, e) {
            this.proccessing = true;
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            if (this.opt.autoplay) {
                this.clearAutoPlayInterval()
            }
            if (this.opt.ajaxSpinner) {
                this.$container.append('<span id="st_spinner"></span>')
            }
            var f = this;
            this.xhr = $.ajax({
                url: c,
                dataType: "html",
                success: function (a) {
                    $(f.$views[b.parent("li").index()]).html('<div class="' + f.opt.classViewInner + '">' + a + '</div>');
                    if (f.opt.ajaxCache) {
                        b.removeData("load.tabs")
                    }
                    if (typeof (f.opt.onAjaxComplete) == "function") {
                        f.opt.onAjaxComplete.call(b)
                    }
                },
                error: function () {
                    $(f.$views[a.parent("li").index()]).html('<div class="' + f.opt.classViewInner + '">' + f.opt.ajaxError + '</div>')
                },
                complete: function () {
                    if (e) {
                        f.showTab(b, d)
                    } else {
                        if (f.opt.autoHeight) {
                            f.setContentHeight(false)
                        }
                    }
                    f.proccessing = false;
                    f.xhr = false;
                    $("#st_spinner").remove();
                    if (f.opt.autoplay) {
                        f.val.index = b.parents("li").index();
                        f.setAutoPlayInterval()
                    }
                }
            })
        },
        showTab: function (a, b) {
            this.setContentIsAnim(true, "pause");
            this.val.hash = this.getTabHash(a);
            this.$viewActive = this.$content.children("." + this.opt.classViewActive).removeClass(this.opt.classViewActive);
            this.$view = this.$content.children("." + this.val.hash).addClass(this.opt.classViewActive);
            this.$currentView = this.$view;
            if (this.opt.autoHeight) {
                this.setContentHeight(true)
            }
            if (this.val.useWebKit && this.content.animIsSlide) {
                this.bindContentWebKitCallback()
            }
            if (b > 0 && this.content.isTouch) {
                this[this.opt.contentAnim + "Content"](b)
            } else {
                if (this.opt.contentAnim.length > 0) {
                    this[this.opt.contentAnim + "Content"](b)
                } else {
                    this.$viewActive.css({
                        position: "absolute",
                        visibility: "hidden"
                    });
                    this.$view.css({
                        position: "static",
                        visibility: "visible"
                    });
                    this.content.isAnim = false
                }
            }
        },
        clickPrevTab: function () {
            if (this.tabs.isAnim || $(this.content.animated).length) {
                return false
            }
            this.val.$prevTab = this.findTab("prev");
            if (this.val.$prevTab.length) {
                this.clickTab(this.val.$prevTab, true)
            } else {
                if (this.opt.tabsLoop) {
                    this.clickTab(this.$tabs.children("li").find("a").last(), true, 0, "prev")
                }
            }
        },
        clickNextTab: function () {
            if (this.tabs.isAnim || $(this.content.animated).length) {
                return false
            }
            this.val.$nextTab = this.findTab("next");
            if (this.val.$nextTab.length) {
                this.clickTab(this.val.$nextTab, true)
            } else {
                if (this.opt.tabsLoop) {
                    this.clickTab(this.$tabs.children("li").find("a").first(), true, 0, "next")
                }
            }
        },
        findTab: function (a) {
            return this.$tab.parents("li")[a]().find("a." + this.opt.classTab)
        },
        findTabByRel: function (a) {
            return this.$tabs.find("[rel=" + a + "]")
        },
        getTabHash: function (a) {
            this.val.hash = a.attr("href");
            return this.val.hash.substring((this.val.hash.indexOf("#") + 1))
        },
        getActiveTab: function () {
            if (this.opt.urlLinking && location.hash) {
                this.$tabActive = this.findTabByRel(location.hash.slice(1))
            }
            if (!this.$tabActive.length) {
                var a = (this.opt.tabsSaveState && $.cookie) ? $.cookie(this.$container.attr("id")) : false;
                if (a) {
                    this.removeActiveTab();
                    this.$tabActive = this.$a.eq(a).addClass(this.opt.classTabActive);
                    if (!this.$tabActive.length) {
                        this.setFirstActiveTab()
                    }
                } else {
                    this.$tabActive = this.$tabs.children("li").find("." + this.opt.classTabActive);
                    if (!this.$tabActive.length) {
                        this.setFirstActiveTab()
                    }
                }
                this.$tabActive.parent("li").addClass(this.opt.classTabActiveParent)
            } else {
                this.removeActiveTab();
                this.$tabActive.addClass(this.opt.classTabActive).parent("li").addClass(this.opt.classTabActiveParent)
            }
            this.saveActiveTab(this.$tabActive)
        },
        setFirstActiveTab: function () {
            this.$tabActive = this.$tabs.find("a:first").addClass(this.opt.classTabActive)
        },
        removeActiveTab: function () {
            this.$tabs.children("li").find("." + this.opt.classTabActive).removeClass(this.opt.classTabActive).parent("li").removeClass(this.opt.classTabActiveParent)
        },
        setActiveTab: function () {
            this.$tabActive = this.$tabs.children("li").find("a." + this.opt.classTabActive).removeClass(this.opt.classTabActive);
            this.$tabActive.parent('li').removeClass(this.opt.classTabActiveParent);
            this.$tab.addClass(this.opt.classTabActive).parent("li").addClass(this.opt.classTabActiveParent);
            this.saveActiveTab(this.$tab)
        },
        saveActiveTab: function (a) {
            if ($.cookie) {
                $.cookie(this.$container.attr("id"), a.parents("li").index())
            }
        },
        tabSlideClicked: function () {
            if (this.tabs.isAnim) {
                return false
            }
            this.val.elemP = this.val.elemP[this.val.topleft];
            this.val.elemD = this.$li[this.val.outerWH](false);
            this.val.aD = this.$li.children("a")[this.val.outerWH](false);
            this.val.nextElemPos = (this.$li.next().length == 1) ? this.$li.next().position()[this.val.topleft] : 0;
            if (this.val.elemP < this.opt.offsetTL) {
                this.tabs.isAnim = true;
                this.val.elemHidden = (this.val.elemD - this.val.nextElemPos);
                this.margin = (this.margin - (this.val.elemHidden + this.opt.offsetTL));
                this.enableTabButton(this.$next);
                this.animateTab()
            } else if ((this.val.aD + this.val.elemP) > (this.val.tabsSlideLength - this.opt.offsetBR)) {
                this.tabs.isAnim = true;
                this.margin += (this.val.aD - (this.val.tabsSlideLength - (this.val.elemP + this.opt.offsetBR)));
                this.enableTabButton(this.$prev);
                this.animateTab()
            }
            this.setTabButtonState()
        },
        slidePrevTab: function (b) {
            if ($(this.tabs.animated).length || !this.$container.hasClass(this.opt.classTabSlidingEnabled)) {
                return false
            }
            this.tabs.isAnim = true;
            if (typeof (this.opt.onTabPrevSlide) == "function") {
                this.opt.onTabPrevSlide.call(this.$tab)
            }
            var c = this,
                $lis = this.$tabs.children("li");
            $lis.each(function () {
                c.$li = $(this);
                c.val.elemP = c.$li.position()[c.val.topleft];
                if (c.val.elemP >= (c.opt.offsetTL - 1)) {
                    if (c.opt.tabsToSlide > 1) {
                        var a = c.$li.index(),
                            index = ((a - c.opt.tabsToSlide)),
                            isFirst = (a > 0) ? 1 : 0;
                        index = (index < 0) ? isFirst : (index + 1);
                        c.$li = $lis.eq(index);
                        c.val.elemP = c.$li.position()[c.val.topleft]
                    }
                    c.$li = c.$li.prev();
                    if (!c.$li.length) {
                        if (c.opt.tabsLoop && b == undefined) {
                            c.$liLast = $lis.last();
                            c.val.elemP = c.$liLast.position()[c.val.topleft];
                            c.margin = ((((c.val.elemP + c.$liLast[c.val.outerWH](false)) - c.opt.offsetTL) - c.val.tabsSlideLength) + c.opt.offsetBR);
                            c.$li = c.$liLast
                        } else {
                            c.tabs.isAnim = false
                        }
                    } else {
                        c.val.elemHidden = (c.$li[c.val.outerWH](true) - c.val.elemP);
                        c.margin -= (c.val.elemHidden + c.opt.offsetTL)
                    } if (c.$li.length) {
                        c.animateTab(b)
                    }
                    if (c.opt.buttonsFunction == "slide") {
                        c.setTabButtonState(c.$next)
                    }
                    return false
                }
            })
        },
        slideNextTab: function (a) {
            if ($(this.tabs.animated).length || !this.$container.hasClass(this.opt.classTabSlidingEnabled)) {
                return false
            }
            this.tabs.isAnim = true;
            if (typeof (this.opt.onTabNextSlide) == "function") {
                this.opt.onTabNextSlide.call(this.$tab)
            }
            var b = this,
                $lis = this.$tabs.children("li"),
                $thisA;
            $lis.each(function () {
                b.$li = $(this);
                $thisA = b.$li.children('a');
                b.val.elemD = $thisA[b.val.outerWH](false);
                b.val.elemP = b.$li.position()[b.val.topleft];
                if (Math.round(b.val.elemD + b.val.elemP) > (b.val.tabsSlideLength + Math.abs(b.opt.offsetBR))) {
                    if (b.opt.tabsToSlide > 1) {
                        b.$li = $lis.eq((b.$li.index() + b.opt.tabsToSlide) - 1);
                        if (!b.$li.length) {
                            b.$li = $lis.last()
                        }
                        $thisA = b.$li.children("a");
                        b.val.elemD = $thisA[b.val.outerWH](false);
                        b.val.elemP = b.$li.position()[b.val.topleft]
                    }
                    b.val.elemHidden = (b.val.tabsSlideLength - b.val.elemP);
                    b.margin += ((b.val.elemD - b.val.elemHidden) + b.opt.offsetBR);
                    b.animateTab(a);
                    if (b.opt.buttonsFunction == "slide") {
                        b.setTabButtonState(b.$prev)
                    }
                    return false
                } else if ((b.$li.index() + 1) == b.$a.length) {
                    if (b.opt.tabsLoop && a == undefined) {
                        b.margin = -b.opt.offsetTL;
                        b.animateTab(a);
                        if (b.opt.buttonsFunction == "slide") {
                            b.setTabButtonState(b.$prev)
                        }
                    } else {
                        b.tabs.isAnim = false
                    }
                }
            })
        },
        animateTab: function (a) {
            var b = this;
            var c = (a > 0) ? a : this.opt.tabsAnimSpeed;
            if (this.val.useWebKit) {
                this.bindTabWebKitCallback();
                this.$tabs.css({
                    "-webkit-transition-duration": c + "ms",
                    "-webkit-transition-timing-function": "ease-out",
                    "-webkit-transform": this.val.pre - this.margin + this.val.px
                })
            } else {
                if (this.opt.orientation == "horizontal") {
                    this.$tabs.animate({
                        "marginLeft": -this.margin + "px"
                    }, c, this.opt.tabsEasing, function () {
                        b.setTabIsAnim(false, "resume")
                    })
                } else {
                    this.$tabs.animate({
                        "marginTop": -this.margin + "px"
                    }, c, this.opt.tabsEasing, function () {
                        b.setTabIsAnim(false, "resume")
                    })
                }
            }
        },
        setTabButtonState: function (a) {
            if (!this.opt.tabsLoop) {
                if (this.opt.buttonsFunction == "click") {
                    this.$li = this.$tab.parents("li")
                }
                if (this.$li.is(":first-child")) {
                    this.disableTabButton(this.$prev);
                    this.enableTabButton(this.$next)
                } else if (this.$li.is(":last-child")) {
                    this.disableTabButton(this.$next);
                    this.enableTabButton(this.$prev)
                } else {
                    if (a) {
                        this.enableTabButton(a)
                    } else if (this.opt.buttonsFunction == "click") {
                        this.enableTabButton(this.$prev);
                        this.enableTabButton(this.$next)
                    }
                }
            }
        },
        tabFixE: function (e) {
            if (e == undefined) e = window.event;
            if (e.layerX == undefined) e.layerX = e.offsetX;
            if (e.layerY == undefined) e.layerY = e.offsetY;
            return e
        },
        tabWebKitPosition: function (a, b) {
            var c = window.getComputedStyle(a.get(0), null).getPropertyValue("-webkit-transform");
            var d = c.replace(/^matrix\(/i, "").split(/, |\)$/g);
            var e = parseInt(d[b], 10);
            return isNaN(e) ? 0 : e
        },
        bindTabWebKitCallback: function () {
            var a = this;
            this.$tabs.unbind("webkitTransitionEnd").bind("webkitTransitionEnd", function () {
                a.setTabIsAnim(false, 'resume')
            })
        },
        setTabIsAnim: function (a, b) {
            this.tabs.isAnim = a;
            if (this.opt.autoplay) {
                this[b + "AutoPlay"](false, true)
            }
        },
        initContent: function (a) {
            var b = this.content;
            if (this.opt.contentAnim == "slideV") {
                b.owh = "outerHeight";
                b.wh = "height";
                b.clientXY = "clientY";
                b.arrPos = 5;
                if (this.val.useWebKit) {
                    b.css = "-webkit-transform";
                    b.pre = "translate3d(0px,";
                    b.px = "px,0px)"
                } else {
                    b.css = "top";
                    b.pre = "";
                    b.px = "px"
                }
            } else {
                b.owh = "outerWidth";
                b.wh = "width";
                b.clientXY = "clientX";
                b.arrPos = 4;
                if (this.val.useWebKit) {
                    b.css = "-webkit-transform";
                    b.pre = "translate3d(";
                    b.px = "px,0px,0px)"
                } else {
                    b.css = "left";
                    b.pre = "";
                    b.px = "px"
                }
            }
            b.isAnim = false;
            b.dist = 0;
            if (a) {
                b.animated = "#" + this.$container.attr("id") + " ." + this.opt.classViewsContainer + " :animated";
                b.orgHeight = 0;
                b.height = 0;
                this.showActiveContent();
                var c = $.data(this.$tabActive[0], "load.tabs");
                if (c) {
                    this.loadTab(this.$tabActive, c)
                }
            }
        },
        reInitContent: function () {
            this.content.oldCSS = this.content.css;
            this.initContent(false);
            if (this.val.useWebKit) {
                this.$views.css("-webkit-transition-duration", "")
            }
            this.$views.css(this.content.oldCSS, "").css("visibility", "");
            this.positionContent()
        },
        showActiveContent: function () {
            var a = this.getTabHash(this.$tabActive);
            this.$view = this.$content.children("." + a).addClass(this.opt.classViewActive);
            this.$currentView = this.$view;
            if (this.opt.autoHeight) {
                var b = this.$view.children("." + this.opt.classViewInner).css("height", "auto");
                if (b.length) {
                    this.content.height = b.outerHeight(true)
                } else {
                    this.$views.css("height", "auto");
                    this.content.height = this.$view.outerHeight(true)
                }
                this.content.orgHeight = this.content.height;
                this.$content.css("height", this.content.height + "px")
            }
            this.positionContent()
        },
        positionContent: function () {
            if (this.opt.contentAnim) {
                if (this.val.useWebKit) {
                    this.$views.css("-webkit-transition-duration", "0ms");
                    this.$view.css(this.content.css, this.content.pre + "0" + this.content.px)
                }
                this.$content.children("div").css("position", "absolute").not("div." + this.opt.classViewActive).css(this.content.css, this.content.pre + this.opt.viewportOffset + this.content.px)
            } else {
                this.$views.not("div." + this.opt.classViewActive).css({
                    position: "absolute",
                    visibility: "hidden"
                })
            }
        },
        rePositionContentView: function () {
            if (this.val.useWebKit) {
                this.$views.css("-webkit-transition-duration", "0ms")
            }
            this.$viewActive.css(this.content.css, this.content.pre + this.opt.viewportOffset + this.content.px).show();
            if (this.isSwipe) {
                var a = (this.$currentView.index() > this.$viewActive.index()) ? this.$viewActive.prev() : this.$viewActive.next();
                a.css(this.content.css, this.content.pre + this.opt.viewportOffset + this.content.px).show()
            }
        },
        setContentParentsHeight: function (a) {
            var b = this,
                $this, $content, $viewInner, total = this.$parentViews.length,
                isLast, height;
            this.$parentViews.each(function (i) {
                $this = $(this);
                $content = $this.parent();
                isLast = ((i + 1) == total) ? true : false;
                if (isLast) {
                    if (!$this.hasClass(b.opt.classViewActive)) {
                        return false
                    }
                }
                $viewInner = $content.children("." + b.opt.classViewActive).children("." + b.opt.classViewInner).css("height", "auto");
                height = b.getContentHeight($viewInner, $this);
                if (isLast && b.opt.autoHeightSpeed > 0 && a) {
                    $content.animate({
                        "height": height + "px"
                    }, b.opt.autoHeightSpeed)
                } else {
                    $content.css("height", height + "px")
                }
            })
        },
        setContentHeight: function (a) {
            this.$view.css("height", "auto");
            var b = this.$view.children("." + this.opt.classViewInner).css("height", "auto");
            this.content.height = this.getContentHeight(b, this.$view);
            if (!this.isChild && this.opt.autoHeightSpeed > 0 && a) {
                this.$content.animate({
                    "height": this.content.height + "px"
                }, this.opt.autoHeightSpeed)
            } else {
                this.$content.css("height", this.content.height + "px");
                if (this.isChild) {
                    this.setContentParentsHeight(a)
                }
            }
        },
        getContentHeight: function (a, b) {
            var c = a.outerHeight(true);
            if (!c || c == null) {
                c = b.outerHeight(true);
                if (!c) {
                    c = this.content.orgHeight
                }
            }
            return c
        },
        resetContentAutoHeight: function () {
            this.$contentCont.removeAttr("style");
            this.$content.removeAttr("style");
            this.$view.children("." + this.opt.classViewInner).removeAttr("style")
        },
        fadeContent: function () {
            var a = this;
            this.$view.hide().css(this.content.css, this.content.pre + "0" + this.content.px).fadeIn(this.opt.contentAnimSpeed, function () {
                a.setContentIsAnim(false, "resume");
                if (typeof (a.opt.onContentVisible) == "function") {
                    a.opt.onContentVisible.call(a.$tab)
                }
            });
            this.$viewActive.fadeOut(this.opt.contentAnimSpeed, function () {
                a.rePositionContentView()
            })
        },
        fadeOutInContent: function () {
            var a = this;
            this.$view.hide().css(this.content.css, this.content.pre + "0" + this.content.px);
            this.$viewActive.fadeOut(this.opt.contentAnimSpeed, function () {
                a.$view.fadeIn(a.opt.contentAnimSpeed, function () {
                    a.rePositionContentView();
                    a.setContentIsAnim(false, "resume")
                });
                if (typeof (a.opt.onContentVisible) == "function") {
                    a.opt.onContentVisible.call(a.$tab)
                }
            })
        },
        webKitSlideContent: function (a, b) {
            this.$viewActive.css({
                "-webkit-transition-duration": a + "ms",
                "-webkit-transition-timing-function": b,
                "-webkit-transform": this.content.pre + this.val.animVal + this.content.px
            });
            this.$view.css({
                "-webkit-transition-duration": a + "ms",
                "-webkit-transition-timing-function": b,
                "-webkit-transform": "translate3d(0px,0px,0px)"
            })
        },
        bindContentWebKitCallback: function (a) {
            var b = this;
            this.$currentView.bind("webkitTransitionEnd", function () {
                b.$currentView.unbind("webkitTransitionEnd");
                if (a) {
                    b.slideContentBackRePos()
                } else {
                    b.rePositionContentView()
                }
                b.setContentIsAnim(false, "resume");
                if (typeof (b.opt.onContentVisible) == "function") {
                    b.opt.onContentVisible.call(b.$tab)
                }
            })
        },
        slideHContent: function (a) {
            var b = this;
            this.val.wh = this.$contentCont.width();
            this.setContentSlideValues();
            if (this.val.useWebKit) {
                if (a > 0) {
                    this.webKitSlideContent(a, "ease-out")
                } else {
                    this.$view.css({
                        "-webkit-transition-duration": "0ms",
                        "-webkit-transform": "translate3d(" + this.val.cssVal + "px,0px,0px)"
                    });
                    setTimeout(function () {
                        b.webKitSlideContent(b.opt.contentAnimSpeed, "ease-in-out")
                    }, 30)
                }
            } else {
                if (a > 0) {
                    this.val.easing = "easeOutSine"
                } else {
                    this.$view.css("left", this.val.cssVal);
                    a = this.opt.contentAnimSpeed;
                    this.val.easing = this.opt.contentEasing
                }
                this.$viewActive.animate({
                    "left": this.val.animVal
                }, a, this.val.easing);
                this.$view.animate({
                    "left": "0px"
                }, a, this.val.easing, function () {
                    b.rePositionContentView();
                    b.setContentIsAnim(false, "resume");
                    if (typeof (b.opt.onContentVisible) == "function") {
                        b.opt.onContentVisible.call(b.$tab)
                    }
                })
            }
        },
        slideVContent: function (a) {
            var b = this;
            this.val.wh = this.$contentCont.height();
            if (this.content.height > this.val.wh) {
                this.val.wh = this.content.height
            }
            this.setContentSlideValues();
            if (this.val.useWebKit) {
                if (a > 0) {
                    this.webKitSlideContent(a, "ease-out")
                } else {
                    this.$view.css({
                        "-webkit-transition-duration": "0ms",
                        "-webkit-transform": "translate3d(0px," + this.val.cssVal + "px,0px)"
                    });
                    setTimeout(function () {
                        b.webKitSlideContent(b.opt.contentAnimSpeed, "ease-in-out")
                    }, 30)
                }
            } else {
                if (a > 0) {
                    this.val.easing = "easeOutSine"
                } else {
                    this.$view.css("top", this.val.cssVal);
                    a = this.opt.contentAnimSpeed;
                    this.val.easing = this.opt.contentEasing
                }
                this.$viewActive.animate({
                    "top": this.val.animVal
                }, a, this.val.easing);
                this.$view.animate({
                    "top": "0px"
                }, a, this.val.easing, function () {
                    b.rePositionContentView();
                    b.setContentIsAnim(false, "resume");
                    if (typeof (b.opt.onContentVisible) == "function") {
                        b.opt.onContentVisible.call(b.$tab)
                    }
                })
            }
        },
        setContentSlideValues: function () {
            if (this.tabs.loop != false) {
                this.content.isNext = (this.tabs.loop == "next") ? true : false
            } else {
                this.content.isNext = (this.$viewActive.index() < this.$view.index()) ? true : false
            } if (this.content.isNext) {
                this.val.animVal = -this.val.wh;
                this.val.cssVal = this.val.wh
            } else {
                this.val.animVal = this.val.wh;
                this.val.cssVal = -this.val.wh
            }
        },
        setContentIsAnim: function (a, b) {
            this.content.isAnim = a;
            if (this.opt.autoplay) {
                this[b + "AutoPlay"](false, true)
            }
        },
        initAutoPlay: function () {
            this.val.index = (this.$tabActive.index() >= 0) ? this.$tabActive.index() : 0;
            this.isPause = false;
            this.setAutoPlayInterval()
        },
        setAutoPlayInterval: function () {
            var a = this;
            this.clearAutoPlayInterval();
            this.intervalId = setInterval(function () {
                a.nextAutoPlayTab()
            }, this.opt.autoplayInterval)
        },
        clearAutoPlayInterval: function () {
            clearInterval(this.intervalId)
        },
        nextAutoPlayTab: function () {
            if (!this.$container.is(":visible")) {
                this.clearAutoPlayInterval();
                return false
            }
            this.val.index++;
            if (this.val.index == this.$a.length) {
                this.val.index = 0
            }
            if (this.opt.tabsLoop) {
                this.clickTab($(this.$a[this.val.index]), false, 0, "next")
            } else {
                this.clickTab($(this.$a[this.val.index]))
            }
        },
        pauseAutoPlay: function (a) {
            if (a) {
                this.opt.autoplay = false
            }
            this.isPause = true;
            this.clearAutoPlayInterval()
        },
        resumeAutoPlay: function (a) {
            if (a) {
                this.opt.autoplay = true
            }
            this.isPause = false;
            this.setAutoPlayInterval()
        },
        addTab: function (a, b, c) {
            var d = this.tabs;
            if ($(d.animated).length) {
                return false
            }
            d.total++;
            d.slug = "tab-" + d.total;
            this.setUniqueTabSlug(d.slug);
            this.$a.last().removeClass("st_tab_last").parents("li").removeClass("st_li_last");
            this.$tabs.append('<li><a href="#' + d.slug + '" rel="' + d.slug + '" class="' + this.opt.classTab + ' st_tab_' + d.total + '">' + a + '</a></li>');
            this.$content.append('<div class="' + d.slug + ' ' + this.opt.classView + '"><div class="' + this.opt.classViewInner + '">' + b + '</div></div>');
            this.$lis = this.$tabs.children("li");
            this.$li = this.$lis.last();
            this.$liLast = this.$li;
            this.$a = this.$lis.find("a");
            this.$views = this.$content.children("." + this.opt.classView);
            if (d.total == 1) {
                this.$content.children("div").addClass(this.opt.classViewActive).css("position", "absolute").css(this.content.css, this.content.pre + "0" + this.content.px);
                this.$a.addClass("st_tab_first " + this.opt.classTabActive).parent("li").addClass("st_li_first " + this.opt.classTabActiveParent)
            } else {
                var e = {};
                e["position"] = "absolute";
                if (this.opt.contentAnim) {
                    e[this.content.css] = this.content.pre + this.opt.viewportOffset + this.content.px
                } else {
                    e["visibility"] = "hidden"
                }
                this.$content.children("div").last().css(e);
                this.$a.last().addClass("st_tab_last").parent("li").addClass("st_li_last")
            }
            d.tabsOrgWidth = this.getTotalTabsLength();
            this.showAppendedTab(c);
            if (this.val.isTouch) {
                this.setTabSwipeLength();
                if (this.content.animIsSlide) {
                    this.bindContentTouch()
                }
            }
        },
        removeTab: function (i) {
            if ($(this.content.animated).length) {
                return false
            }
            var a = this.$tabs.children("li").length;
            i = (i >= 1 ? i - 1 : a - 1);
            this.$li = this.$tabs.children("li").eq(i);
            if (this.$li.children("a").hasClass(this.opt.classTabActive)) {
                var b;
                if (!i) {
                    b = this.$li.next().addClass("st_li_first");
                    b = c.length > 0 ? c.children("a").addClass("st_tab_first") : this.$li.children("a")
                } else {
                    b = this.$li.prev().children("a")
                }
                this.val.hash = this.getTabHash(b);
                b.parents("li").addClass(this.opt.classTabActiveParent);
                b.addClass(this.opt.classTabActive);
                this.$view = this.$content.children("." + this.val.hash).show().css(this.content.css, this.content.pre + "0" + this.content.px).addClass(this.opt.classViewActive);
                this.$currentView = this.$view;
                if (this.opt.autoHeight) {
                    this.setContentHeight(true)
                }
                this.$tab = this.$li.prev().children("a." + this.opt.classTab)
            }
            if (this.$li.hasClass("st_li_last")) {
                this.$li.prev().addClass("st_li_last").children("a").addClass("st_tab_last")
            }
            this.$li.remove();
            this.$content.children("div").eq(i).remove();
            var d = this.getTotalTabsLength();
            if (d > this.$tabsCont[this.val.outerWH](false) - this.opt.offsetBR) {
                this.margin = d - this.val.tabsSlideLength + this.opt.offsetBR;
                if (this.opt.buttonsFunction == "slide") {
                    this.enableTabButton(this.$prev);
                    this.disableTabButton(this.$next)
                } else {
                    if ((a - 2) == this.$tab.parents('li').index()) {
                        this.disableTabButton(this.$next)
                    }
                }
            } else {
                this.margin = 0;
                this.$prev.hide();
                this.$next.hide();
                this.$container.removeClass(this.opt.classTabSlidingEnabled);
                this.tabs.tabsOrgWidth = this.getTotalTabsLength();
                this.setTabSlideLength()
            }
            this.animateTab(300);
            this.$lis = this.$tabs.children("li");
            this.$liLast = this.$lis.last();
            this.$a = this.$lis.find("a");
            this.$views = this.$content.children("." + this.opt.classView);
            this.tabs.total = this.$a.length;
            if (this.val.isTouch) {
                this.setTabSwipeLength()
            }
        },
        goTo: function (i) {
            var a = this.$a.eq(i - 1);
            if (a.length) {
                this.clickTab(a)
            }
        },
        goToPrev: function () {
            this.clickPrevTab()
        },
        goToNext: function () {
            this.clickNextTab()
        },
        slidePrev: function () {
            this.slidePrevTab()
        },
        slideNext: function () {
            this.slideNextTab()
        },
        setOptions: function (c) {
            $.each(c, function (a, b) {
                if (b == "true") {
                    c[a] = true
                } else if (b == "false") {
                    c[a] = false
                }
            });
            var d = (c.contentAnim != this.opt.contentAnim) ? true : false;
            this.opt = $.extend(true, {}, this.opt, c);
            this.content.animIsSlide = (c.contentAnim == "slideH" || c.contentAnim == "slideV") ? true : false;
            if (c.tabsSlideLength > 0) {
                this.setTabSlideLength();
                if (this.val.isTouch) {
                    this.setTabSwipeLength()
                }
            }
            if (c.buttonsFunction == "click") {
                this.setTabButtonState()
            } else if (c.buttonsFunction == "slide") {
                this.$liLast = this.$tabs.children("li:last");
                this.initTabButtons()
            }
            if (c.tabsLoop) {
                this.enableTabButton(this.$prev);
                this.enableTabButton(this.$next)
            } else if (!c.tabsLoop) {
                this.initTabButtons()
            }
            if (this.opt.tabsScroll) {
                var f = this;
                this.$tabs.mousewheel(function (e, a) {
                    (a > 0) ? f.slidePrevTab() : f.slideNextTab();
                    return false
                })
            } else if (!this.opt.tabsScroll) {
                this.$tabs.unmousewheel()
            }
            if (c.autoHeight) {
                this.setContentHeight()
            } else if (!c.autoHeight) {
                this.resetContentAutoHeight()
            }
            if (d) {
                this.reInitContent()
            }
            if (this.val.isTouch) {
                if (this.content.animIsSlide) {
                    this.bindContentTouch()
                } else {
                    this.unbindContentTouch()
                }
            } else {
                if (c.touchSupport == true) {
                    if ("ontouchstart" in window) {
                        this.val.isTouch = true;
                        this.bindTabTouch();
                        this.bindContentTouch()
                    }
                } else if (!c.touchSupport) {
                    this.unbindTabTouch();
                    this.unbindContentTouch()
                }
            }
        },
        getOptions: function () {
            return this.opt
        },
        setHeight: function () {
            this.setContentHeight(true)
        },
        pause: function () {
            this.pauseAutoPlay(true)
        },
        resume: function () {
            this.resumeAutoPlay(true)
        },
        destroy: function () {
            this.clearAutoPlayInterval();
            this.$tabs.undelegate("li a." + this.opt.classTab, "click").css(this.val.css, this.val.pre + "0" + this.val.px);
            this.$prev.unbind("click");
            this.$next.unbind("click");
            this.hideTabButtons();
            if ($.fn.unmousewheel) {
                this.$tabs.unmousewheel()
            }
            if (this.val.isTouch) {
                this.unbindTabTouch();
                this.unbindContentTouch()
            }
            $("a." + this.opt.classExtLink).each(function () {
                $(this).unbind("click")
            })
        }
    };
    $.stCore = SlidingTabs.prototype
})(jQuery);