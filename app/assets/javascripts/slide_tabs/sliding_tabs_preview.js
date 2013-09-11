$(document).ready(function () {
    function filterPath(a) {
        return a.replace(/^\//, "").replace(/(index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "")
    }

    function scrollableElement(a) {
        for (var i = 0, argLength = arguments.length; i < argLength; i++) {
            var b = arguments[i],
                $scrollElement = $(b);
            if ($scrollElement.scrollTop() > 0) {
                return b
            } else {
                $scrollElement.scrollTop(1);
                var c = $scrollElement.scrollTop() > 0;
                $scrollElement.scrollTop(0);
                if (c) {
                    return b
                }
            }
        }
        return []
    }
    var g = filterPath(location.pathname);
    var h = scrollableElement("html", "body");
    $("header .menu a[href*=#]").each(function () {
        var b = filterPath(this.pathname) || g;
        if (g == b && (location.hostname == this.hostname || !this.hostname)) {
            var c = $("a[name=" + this.hash.replace(/#/, "") + "]"),
                target = this.hash;
            if (target) {
                $(this).click(function (e) {
                    var a = c.offset().top;
                    e.preventDefault();
                    $(h).animate({
                        scrollTop: a
                    }, 400, function () {
                        location.hash = target
                    });
                    return false
                })
            }
        }
    });
    $(".totop").hide().click(function () {
        jQuery("html, body").animate({
            scrollTop: 0
        }, "medium")
    });
    $(window).bind("scroll", function () {
        if ($(this).scrollTop() > 200) {
            $(".totop").fadeIn()
        } else {
            $(".totop").fadeOut()
        }
    });
    var j = ("ontouchstart" in window);
    if (!j) {
        $("body").prepend('<div id="btn_tooltip"><p></p><div class="tt_arrow"></div></div>');
        var k = $("div#btn_tooltip"),
            $btn, title, t, b, y, x, topOffset, leftOffset;
        ttShow = function () {
            if ($btn.hasClass("btn_disabled")) {
                return false
            }
            k.children("p").text(title);
            t = Math.floor(k.outerWidth(true) / 2);
            b = Math.floor($btn.outerWidth(true) / 2);
            y = ($btn.offset().top - topOffset);
            x = ($btn.offset().left - (t - b) + leftOffset);
            k.css({
                "top": y + "px",
                "left": x + "px",
                "display": "block"
            })
        };
        $("#demo_controls ul.demo_btns li a").hover(function () {
            $btn = $(this);
            title = $btn.attr("title");
            topOffset = 36;
            leftOffset = 0;
            ttShow($btn, title)
        }, function () {
            k.hide()
        });
        $("#demo_btns_overlay").hover(function () {
            $btn = $(this);
            title = "Not available for the current demo";
            topOffset = 50;
            leftOffset = 2;
            ttShow($btn)
        }, function () {
            k.hide()
        })
    } else {
        $("body").addClass("is_touch")
    }
    var l = $('#examples_btn').click(function () {
        $demosDropdown.toggle();
        $settingsDropdown.hide();
        return false
    }),
        $demosDropdown = $('#demo_dropdown'),
        $addBtn = $('#add_tab_btn').click(function () {
            demo.hideAll();
            demo.addTab();
            return false
        }),
        $removeBtn = $('#remove_tab_btn').click(function () {
            demo.hideAll();
            demo.removeTab();
            return false
        }),
        $settingsBtn = $('#settings_btn').click(function () {
            $settingsDropdown.toggle();
            $demosDropdown.hide();
            return false
        }),
        $settingsDropdown = $('#demo_settings'),
        $saveBtn = $('#settings_save_btn').click(function () {
            demo.saveSettings();
            return false
        }),
        $demoCont = $('#demo'),
        $tabs = $demoCont.children('div').first(),
        $tabsCont = $tabs,
        $spinner = $('#examples').find('.spinner'),
        tabsObj = {}, id_horiz = 0,
        id_vert = 1,
        id_ext = 2,
        id_nested = 4,
        id_nested_1 = 41,
        id_nested_2 = 42,
        id_nested_3 = 43,
        demo, length, labels, label, span;
    $(window).load(function () {
        tabsObj = ($tabs.length) ? $tabs.slidingTabs() : {}
    });
    $("body").click(function (e) {
        parentId = $(e.target).parents("ul#demo_settings").attr("id");
        if (parentId != "demo_settings") {
            demo.hideAll()
        }
    });
    demo = {
        hideAll: function () {
            $demosDropdown.hide();
            $settingsDropdown.hide()
        },
        setContHeight: function (a) {
            $("#demo").css("height", ($tabsCont.outerHeight(true) + 40) + "px")
        },
        setTO: function (a, b) {
            setTimeout(function () {
                a.removeClass("btn_to")
            }, b)
        },
        tabsSpeed: 300,
        addTab: function () {
            if ($addBtn.hasClass("btn_to") || $addBtn.hasClass("btn_disabled")) {
                return false
            }
            $addBtn.addClass("btn_to");
            if ($tabs.hasClass("st_sliding_active")) {
                this.setTO($addBtn, this.tabsSpeed)
            } else {
                this.setTO($addBtn, 50)
            }
            length = $tabs.find("div.st_tabs_wrap ul.st_tabs_ul").children("li").length;
            labels = ["Aliquantum", "Beneficium", "Elementum"], span = ["Тестовый Спан", "Phasellus viverra nulla"];
            label = ($tabs.hasClass("clean_rounded-vertical")) ? labels[length] + "<span>" + span[0] + "</span>" : labels[(length)];
            if (length == 1) {
                $removeBtn.removeClass("btn_disabled")
            }
            if (length == 14) {
                $("#btn_tooltip").hide();
                $addBtn.addClass("btn_disabled")
            }
            var a = $tabs.find("div.st_view").first().children(".st_view_inner").clone();
            a.children(".title").remove();
            a = '<h3 class="title">' + labels[length] + '</h3>' + a.html();
            tabsObj.addTab(label, a, true)
        },
        removeTab: function () {
            if ($removeBtn.hasClass("btn_to") || $removeBtn.hasClass("btn_disabled")) {
                return false
            }
            $removeBtn.addClass("btn_to");
            if ($tabs.hasClass("st_sliding_active")) {
                this.setTO($removeBtn, this.tabsSpeed)
            } else {
                this.setTO($removeBtn, 50)
            }
            length = $tabs.find(".st_tabs_wrap ul.st_tabs_ul").children("li").length;
            if (length == 15) {
                $addBtn.removeClass("btn_disabled")
            }
            if (length == 2) {
                $("#btn_tooltip").hide();
                $removeBtn.addClass("btn_disabled")
            }
            tabsObj.removeTab()
        },
        saveSettings: function () {
            var a = $settingsDropdown.find("input:checked");
            var b = $tabs.children(".st_views").children(".st_view");
            var c = {};
            var d;
            var e = $tabs.attr("id");
            e = parseInt(e.split("_")[1]);
            a.each(function () {
                c[this.name] = this.value
            });
            if (e == 163) {
                c["buttonsFunction"] = "click"
            }
            c.tabsAnimSpeed = parseInt(c.tabsAnimSpeed);
            c.contentAnimSpeed = parseInt(c.contentAnimSpeed);
            c.contentAnim = $settingsDropdown.find("select.contentAnim option:selected").val();
            c.orientation = ($tabs.attr("class").indexOf("horizontal") != -1) ? "horizontal" : "vertical";
            if (c.orientation == "horizontal") {
                d = (c.tabsAlignment == "tl") ? "align_top" : "align_bottom"
            } else {
                d = (c.tabsAlignment == "tl") ? "align_left" : "align_right"
            }
            var f = b.eq(3).css("-webkit-transform");
            if (typeof (f) !== "undefined" && f !== "none") {
                b.css("-webkit-transition-duration", "0ms")
            }
            if (!$tabs.hasClass(d)) {
                $tabs.fadeOut(200, function () {
                    $spinner.fadeIn(100);
                    $tabs.css({
                        "visibility": "hidden",
                        "display": "block"
                    });
                    $tabs[0].className = $tabs[0].className.replace(/\balign.*?\b/g, "");
                    $tabs.addClass(d);
                    setTimeout(function () {
                        $spinner.hide();
                        $tabs.css({
                            "visibility": "visible",
                            "display": "none"
                        }).fadeIn(200)
                    }, 250)
                })
            }
            tabsObj.setOptions(c);
            $settingsDropdown.hide()
        }
    }
});