/*!
 * jQuery Ellipsis
 * https://github.com/tropperstyle/jquery-ellipsis
 *
 * Copyright, Jonathan Tropper.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * MIT-LICENSE.txt
 * GPL-LICENSE.txt
 */
 
(function($) {
    $.extend($.fn, {
        ellipsis: function() {
            return this.each(function() {
                var el = $(this).css({ whiteSpace: 'nowrap', overflow: 'hidden' });
                var overflow = el.attr('scrollWidth') - el.width();
                if (overflow > 0) {
                    var text = el.html();
                    el.attr('title', function(i, original) {
                        if (original.match(/^\s*$/)) {
                            return text;
                        } else {
                            return '<p>'+ text +'</p>' + original;
                        }
                    });
                    var table = $.fn.ellipsis.stringToArray(text);
                    var start = Math.floor(table.length / 2);
                    var i = 0;   
                    while (true) {
                        var ellipsified = $.fn.ellipsis.parse(table, i);
                        el.html(ellipsified);
                        overflow = el.attr('scrollWidth') - el.width();
                        
                        if (overflow > 0) {
                            var ellipsified = $.fn.ellipsis.parse(table, i-1);
                            el.html(ellipsified);
                            break;
                        }
                        i++;
                    }
                    
                    el.addClass('ellipsified');
                }
                // jQuery.css throws errors in IE ??
                this.style.overflow = '';
                this.style.whiteSpace = '';
            });
        }
    });
    
    $.extend($.fn.ellipsis, {
        stringToArray: function(string) {
            var table = [];
            for (var i=0; i < string.length; i++) {
                table[i] = string.charAt(i);
            };
            return table;
        },
        parse: function(table, length) {
            var start = [];
            var end = [];
            for (var i=0; i <= length; i++) {
                start.push(table[i]);
                end.unshift(table[table.length - 1 - i]);
            };
            return start.join('') + '&hellip;' + end.join('');
        }
    });
})(jQuery);
