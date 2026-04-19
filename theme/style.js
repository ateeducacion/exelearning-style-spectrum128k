/*!
 * eXeLearning v4 Spectrum 128K Style Script
 * -----------------------------------------
 * Author: Área de Tecnología Educativa · Consejería de Educación, FP y
 *         Actividad Física del Gobierno de Canarias
 * Project: eXeLearning.net
 * License: Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)
 *
 * Based on the Universal style script (by Ignacio Gros for EducaMadrid).
 */

var eXeSpectrum128kStyle = {
    breadcrumbs: true,
    dropdownNavigation: true,
    tweaksTitle: 'Spectrum tweaks',
    init: function () {
        if (this.inIframe()) $('body').addClass('in-iframe');
        // Apply persisted tweaks before any UI shows up to avoid a flash.
        this.tweaks.applyAll();
        var togglers = '';
        if (this.isLocalStorageAvailable()) {
            togglers =
                '\
                <button type="button" id="darkModeToggler" class="toggler" title="' +
                $exe_i18n.mode_toggler +
                '">\
                    <span>' +
                $exe_i18n.mode_toggler +
                '</span>\
                </button>\
                <button type="button" id="spectrumTweaksToggler" class="toggler" title="' +
                eXeSpectrum128kStyle.tweaksTitle +
                '">\
                    <span>' +
                eXeSpectrum128kStyle.tweaksTitle +
                '</span>\
                </button>\
            ';
        }
        if (!$('body').hasClass('exe-web-site')) {
            $('.package-header').prepend(togglers);
            eXeSpectrum128kStyle.darkMode.init();
            eXeSpectrum128kStyle.tweaks.init();
            return;
        }
        togglers +=
            '\
            <button type="button" id="siteNavToggler" class="toggler" title="' +
            $exe_i18n.menu +
            '">\
                <span>' +
            $exe_i18n.menu +
            '</span>\
            </button>\
            <button type="button" id="searchBarTogger" class="toggler" title="' +
            $exe_i18n.search +
            '">\
                <span>' +
            $exe_i18n.search +
            '</span>\
            </button>\
        ';
        $('#siteNav').before(togglers);
        var url = window.location.href;
        url = url.split('?');
        if (url.length > 1) {
            if (url[1].indexOf('nav=false') != -1) {
                $('body').addClass('siteNav-off');
                eXeSpectrum128kStyle.params('add');
            }
        }
        this.darkMode.init();
        $('#siteNavToggler').on('click', function () {
            if (eXeSpectrum128kStyle.isLowRes()) {
                $('#exe-client-search').hide();
                if ($('body').hasClass('siteNav-off')) {
                    $('body').removeClass('siteNav-off');
                } else {
                    if ($('#siteNav').isInViewport()) {
                        $('body').addClass('siteNav-off');
                        eXeSpectrum128kStyle.params('add');
                    }
                }
                window.scroll(0, 0);
            } else {
                $('body').toggleClass('siteNav-off');
                eXeSpectrum128kStyle.params(
                    $('body').hasClass('siteNav-off') ? 'add' : 'remove'
                );
            }
        });
        $('#searchBarTogger').on('click', function () {
            var bar = $('#exe-client-search');
            if (bar.is(':visible')) {
                bar.hide();
            } else {
                if (eXeSpectrum128kStyle.isLowRes()) {
                    $('body').addClass('siteNav-off');
                }
                bar.show();
                $('#exe-client-search-text').focus();
                window.scroll(0, 0);
            }
        });
        $('#siteNav a').on('click', function (event) {
            if (event.target.nodeName == 'A') {
                if (eXeSpectrum128kStyle.isLowRes()) {
                    event.preventDefault();
                    window.location = this.href + '?nav=false';
                }
            }
        });
        this.getBreadcrumbs();
        this.dropdownMenus();
        this.searchForm();
        this.tweaks.init();
    },
    isLocalStorageAvailable: function () {
        var x = '';
        try {
            localStorage.setItem(x, x);
            localStorage.removeItem(x);
            return true;
        } catch (e) {
            return false;
        }
    },
    darkMode: {
        init: function () {
            $('#darkModeToggler').on('click', function () {
                var active = 'off';
                if (!$('html').hasClass('exe-dark-mode')) active = 'on';
                eXeSpectrum128kStyle.darkMode.setMode(active);
            });
        },
        setMode: function (active) {
            var dark = false;
            var darkMode = localStorage.getItem('exeDarkMode');
            if (darkMode && darkMode == 'on') {
                dark = true;
            }
            if (active) {
                if (active == 'off') {
                    dark = false;
                } else {
                    dark = true;
                }
            }
            if (dark) {
                localStorage.setItem('exeDarkMode', 'on');
                $('html').addClass('exe-dark-mode');
            } else {
                localStorage.removeItem('exeDarkMode');
                $('html').removeClass('exe-dark-mode');
            }
        },
    },

    /* ---------------------------------------------------------------
       Tweaks panel — scanlines / stripe preset / pixel-everywhere.
       State is persisted in localStorage under `exeSpectrumTweaks`.
       --------------------------------------------------------------- */
    tweaks: {
        defaults: {
            scanlines: 'on',
            stripes: '128k',
            pixelAll: 'chrome',
        },
        read: function () {
            var out = {};
            for (var k in this.defaults) {
                out[k] = this.defaults[k];
            }
            try {
                var raw = localStorage.getItem('exeSpectrumTweaks');
                if (raw) {
                    var parsed = JSON.parse(raw);
                    for (var k2 in parsed) {
                        if (parsed[k2] != null) out[k2] = parsed[k2];
                    }
                }
            } catch (e) {}
            return out;
        },
        save: function (state) {
            try {
                localStorage.setItem(
                    'exeSpectrumTweaks',
                    JSON.stringify(state)
                );
            } catch (e) {}
        },
        apply: function (state) {
            var body = document.body;
            if (!body) return;
            body.classList.toggle(
                'spectrum-scanlines',
                state.scanlines === 'on'
            );
            body.classList.toggle(
                'spectrum-stripes-48k',
                state.stripes === '48k'
            );
            body.classList.toggle(
                'spectrum-stripes-mono',
                state.stripes === 'mono'
            );
            body.classList.toggle(
                'spectrum-pixel-all',
                state.pixelAll === 'all'
            );
        },
        applyAll: function () {
            this.apply(this.read());
        },
        setKey: function (key, value) {
            var state = this.read();
            state[key] = value;
            this.save(state);
            this.apply(state);
            this.render(state);
        },
        init: function () {
            var self = this;
            // If the panel already exists (e.g. re-init in iframe), skip
            if (document.getElementById('spectrumTweaks')) return;
            var panel = document.createElement('div');
            panel.id = 'spectrumTweaks';
            panel.setAttribute('role', 'dialog');
            panel.setAttribute('aria-label', eXeSpectrum128kStyle.tweaksTitle);
            panel.innerHTML =
                '<div class="tw-head">' +
                '<span>tweaks</span>' +
                '<button type="button" class="tw-close" aria-label="Cerrar">x</button>' +
                '</div>' +
                '<div class="tw-body">' +
                '<div class="tw-row" data-key="scanlines">' +
                '<div class="tw-label">scanlines crt</div>' +
                '<div class="tw-segs">' +
                '<button class="tw-seg" data-value="on">on</button>' +
                '<button class="tw-seg" data-value="off">off</button>' +
                '</div>' +
                '</div>' +
                '<div class="tw-row" data-key="stripes">' +
                '<div class="tw-label">franjas</div>' +
                '<div class="tw-segs">' +
                '<button class="tw-seg" data-value="128k">128k</button>' +
                '<button class="tw-seg" data-value="48k">48k</button>' +
                '<button class="tw-seg" data-value="mono">mono</button>' +
                '</div>' +
                '</div>' +
                '<div class="tw-row" data-key="pixelAll">' +
                '<div class="tw-label">fuente pixel</div>' +
                '<div class="tw-segs">' +
                '<button class="tw-seg" data-value="chrome">solo titulares</button>' +
                '<button class="tw-seg" data-value="all">todo el texto</button>' +
                '</div>' +
                '</div>' +
                '</div>';
            document.body.appendChild(panel);
            // Paint current selections.
            this.render(this.read());
            // Wire interactions.
            $(panel).on('click', '.tw-seg', function () {
                var row = this.closest('.tw-row');
                if (!row) return;
                var key = row.getAttribute('data-key');
                var value = this.getAttribute('data-value');
                if (!key || !value) return;
                self.setKey(key, value);
            });
            $(panel).on('click', '.tw-close', function () {
                panel.classList.remove('open');
            });
            $('#spectrumTweaksToggler').on('click', function () {
                panel.classList.toggle('open');
            });
            // Close on Escape.
            $(document).on('keydown', function (e) {
                if (e.key === 'Escape' && panel.classList.contains('open')) {
                    panel.classList.remove('open');
                }
            });
        },
        render: function (state) {
            var panel = document.getElementById('spectrumTweaks');
            if (!panel) return;
            var rows = panel.querySelectorAll('.tw-row');
            for (var i = 0; i < rows.length; i++) {
                var key = rows[i].getAttribute('data-key');
                var current = state[key];
                var segs = rows[i].querySelectorAll('.tw-seg');
                for (var j = 0; j < segs.length; j++) {
                    if (segs[j].getAttribute('data-value') === current) {
                        segs[j].classList.add('on');
                    } else {
                        segs[j].classList.remove('on');
                    }
                }
            }
        },
    },
    inIframe: function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    },
    searchForm: function () {
        $('#exe-client-search-text').attr('class', 'form-control');
    },
    isLowRes: function () {
        return $(window).width() <= 576;
    },
    truncate: function (str) {
        var max = 25;
        if (str.length > max) {
            return str.substring(0, max - 3) + '...';
        }
        return str;
    },
    removeQuotes: function (str) {
        return str.replace(/"/g, '');
    },
    getBreadcrumbs: function () {
        if (!this.breadcrumbs) return;
        if ($('html').attr('id') == 'exe-index') return false;
        function getNodeLinks() {
            var res =
                '<li><strong><span>' +
                eXeSpectrum128kStyle.truncate($('.page-header .page-title').text()) +
                '</span></strong></li>';
            var extra = '';
            var loc = window.location.href;
            loc = loc.split('/');
            loc = loc[loc.length - 1];
            loc = loc.split('?');
            loc = loc[0];
            loc = loc.split('#');
            loc = loc[0];
            var mainTit = '';
            var mainLnk = '';
            $('#siteNav a').each(function (x) {
                var e = $(this);
                if (x == 0) {
                    mainTit = e.text();
                    mainLnk = e.attr('href');
                }
                var ref = e.attr('href');
                if (ref == loc || ref.endsWith('/' + loc)) {
                    var li = e.parent();
                    li.parents('li').each(function () {
                        var a = $('a', this).eq(0);
                        extra =
                            '<li><a href="' +
                            a.attr('href') +
                            '" title="' +
                            eXeSpectrum128kStyle.removeQuotes(a.text()) +
                            '"><span>' +
                            eXeSpectrum128kStyle.truncate(a.text()) +
                            '</span></a></li>' +
                            extra;
                    });
                }
            });
            if ($('html').attr('id') == 'exe-index') {
                extra = '';
                res = '';
            }
            var img = 'theme/img/home.png';
            if ($('html').attr('id') != 'exe-index') img = '../' + img;
            var tit = eXeSpectrum128kStyle.removeQuotes(mainTit);
            return (
                '<li><a href="' +
                mainLnk +
                '" id="siteBreadcrumbsHome" title="' +
                tit +
                '"><img src="' +
                img +
                '" width="19" height="19" alt="' +
                tit +
                '"><span class="sr-av">' +
                mainTit +
                '</span></a></li>' +
                extra +
                res
            );
        }
        var breadcrumb =
            '<div id="siteBreadcrumbs"><ul>' + getNodeLinks() + '</ul></div>';
        $('.package-header').prepend(breadcrumb).addClass('width-breadcrumbs');
    },
    dropdownMenus: function () {
        if (!this.dropdownNavigation) return;
        this.dropdownMenusWorking = false;
        $('#siteNav ul ul').each(function (i) {
            var elem = $(this);
            this.id = 'child-section-' + i;
            var lnk = elem.prev('a');
            var css = 'closed-ul';
            if (elem.is(':visible')) css = 'open-ul';
            lnk.append(
                '<button id="child-section-' +
                    i +
                    '-toggler" title="' +
                    $exe_i18n.more +
                    '" class="' +
                    css +
                    '"><span>' +
                    $exe_i18n.more +
                    '</span></button>'
            );
            $('#child-section-' + i + '-toggler').on('click', function (event) {
                event.preventDefault();
                if (eXeSpectrum128kStyle.dropdownMenusWorking == true) return;
                eXeSpectrum128kStyle.dropdownMenusWorking = true;
                var id = this.id;
                id = id.replace('-toggler', '');
                var ul = $('#' + id);
                if (ul.is(':visible')) {
                    ul.slideUp('fast', function () {
                        var lnk = $('#' + this.id + '-toggler');
                        lnk.removeClass('open-ul');
                        lnk.addClass('closed-ul');
                        eXeSpectrum128kStyle.dropdownMenusWorking = false;
                    });
                } else {
                    ul.slideDown('fast', function () {
                        var lnk = $('#' + this.id + '-toggler');
                        lnk.removeClass('closed-ul');
                        lnk.addClass('open-ul');
                        eXeSpectrum128kStyle.dropdownMenusWorking = false;
                    });
                }
            });
        });
    },
    param: function (e, act) {
        if (act == 'add') {
            var ref = e.href;
            var con = '?';
            if (ref.indexOf('.html?') != -1) con = '&';
            var param = 'nav=false';
            if (ref.indexOf(param) == -1) {
                ref += con + param;
                e.href = ref;
            }
        } else {
            var ref = e.href;
            ref = ref.split('?');
            e.href = ref[0];
        }
    },
    params: function (act) {
        $('.nav-buttons a').each(function () {
            eXeSpectrum128kStyle.param(this, act);
        });
    },
};

$(function () {
    eXeSpectrum128kStyle.init();
});

eXeSpectrum128kStyle.darkMode.setMode();
// Apply tweaks as early as possible (body may not exist yet; tweaks.init will re-apply after DOM ready).
try {
    if (document.body) {
        eXeSpectrum128kStyle.tweaks.applyAll();
    }
} catch (e) {}

$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};
