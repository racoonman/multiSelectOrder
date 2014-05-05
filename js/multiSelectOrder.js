(function() {
    var MultiSelectOrder = function(element, options) {
        this.options = options;
        this.$element = $(element);
        this.$container = $('<div/>', {
            'class': "multiSelectOrder-container "
        });

        if (options.extra) {
            this.$extraContainer = $('<div/>', {
                'class': ''
            });

            this.$inputExtra = $('<input/>', {
                'class': "multiSelectOrder-inputExtra " + (options.bootstrap ? "form-control" : ""),
                'type': 'text',
                'placeholder': options.extraPlaceholder
            });

            this.$inputExtraBtn = $('<button/>', {
                'class': "multiSelectOrder-inputExtraBtn " + (options.bootstrap ? "btn btn-default" : ""),
                'type': 'button'
            }).html(
                    options.extraButton ?
                    options.extraButton :
                    (options.bootstrap ? "+" : "add"));
        } else {
            this.$extraContainer = "";
            this.$inputExtra = "";
            this.$inputExtraBtn = "";
        }

        this.$messageContainer = $('<div/>', {'class': "multiSelectOrder-message"});

        this.$leftContainer = $('<div/>', {
            'class': "multiSelectOrder-left " + (options.bootstrap ? "col-md-6" : ""),
            'style': "min-height: 200px; max-height: 300px;overflow: auto"
        });
        this.$rightContainer = $('<div/>', {
            'class': "multiSelectOrder-right " + (options.bootstrap ? "col-md-6" : ""),
            'style': "min-height: 200px; max-height: 300px;overflow: auto"
        });

        this.$leftUl = $('<ul/>', {'class': "multiSelectOrder-leftUl " + (options.bootstrap ? "list-group" : "")});
        this.$rightUl = $('<ul/>', {'class': "multiSelectOrder-rightUl " + (options.bootstrap ? "list-group" : "")});

        this.$leftTmpl = $('<li/>', {'class': "multiSelectOrder-leftLi " + (options.bootstrap ? "list-group-item clearfix" : "")}).append(
                $("<div>", {'class': "buttonsWrapper " + (options.bootstrap ? "pull-right" : "")}).append(
                $("<a/>", {
                    'href': 'javascript:void(0)',
                    'class': "multiSelectOrder-addBtn " + (options.bootstrap ? "badge " : "")}).html(
                (options.bootstrap ? $("<i>", {'class': 'glyphicon glyphicon-plus'}) : "add")
                )));

        this.$rightTmpl = $('<li/>', {'class': "multiSelectOrder-rightLi " + (options.bootstrap ? "list-group-item clearfix" : "")}).append(
                $("<div>", {'class': 'buttonsWrapper '+ (options.bootstrap ? "pull-right clearfix" : "")}).append(
                $("<a/>", {
                    'href': 'javascript:void(0)',
                    'class': "multiSelectOrder-upBtn " + (options.bootstrap ? "badge" : "")}).html(
                (options.bootstrap ? $('<i/>', {'class': 'glyphicon glyphicon-chevron-up'}) : "up"))).append(
                $("<a/>", {
                    'class': "multiSelectOrder-deselectorBtn " + (options.bootstrap ? "badge alert-danger" : ""),
                    'href': 'javascript:void(0)'}).html(
                (options.bootstrap ? $('<i/>', {'class': 'glyphicon glyphicon-remove'}) : "X"))).append(
                $("<a/>", {
                    'href': 'javascript:void(0)',
                    'class': "multiSelectOrder-downBtn " + (options.bootstrap ? "badge" : "")}).html(
                (options.bootstrap ? $('<i/>', {'class': 'glyphicon glyphicon-chevron-down'}) : "down")))
                );
    };

    MultiSelectOrder.prototype = {
        constructor: MultiSelectOrder,
        init: function() {
            var that = this, element = this.$element;
            element.css({position: 'absolute', left: '-9999px'});

            element.find("option").each(function() {
                var opt = $(this);
                that.deselect(opt);
            });
            
            if (element.attr("data-multiSelectOrder-values")){
                var values = element.attr("data-multiSelectOrder-values").split(",");
                values.forEach(function(entry){
                    var opt = element.find("option[value='" +  entry + "']");
                    that.select(opt);
                });
            }

            that.$leftContainer.append(that.$leftUl);
            that.$rightContainer.append(that.$rightUl);

            if (that.options.noOrder) {
                $("<style>").prop("type", "text/css").html(
                        ".multiSelectOrder-upBtn{ display:none; }\
.multiSelectOrder-downBtn{ display:none; }\
").appendTo("head");
            }

            $("<style>").prop("type", "text/css").html(
                    ".multiSelectOrder-rightUl li:first-child a.multiSelectOrder-upBtn{\
visibility: hidden\
}\
.multiSelectOrder-rightUl li:last-child a.multiSelectOrder-downBtn{\
visibility: hidden\
}").appendTo("head");

            that.$container.append(
                    $("<div/>", {'class': "multiSelectAll-header" + (that.options.bootstrap ? ' row' : '')}).append(
                    $("<div/>", {'class': "" + (that.options.bootstrap ? " col-md-6 col-md-offset-6" : "")}).append(
                    $("<span/>", {}).append(
                    $("<a>", {'href': 'javascript:void(0)', 'class': 'multiSelectOrder-all' + (that.options.bootstrap ? " label label-default" : "")}).html(
                    that.options.i18n.selectAll
                    ))
                    ).append(" ").append(
                    $("<span/>", {}).append(
                    $("<a>", {'href': 'javascript:void(0)', 'class': 'multiSelectOrder-none' + (that.options.bootstrap ? " label label-default" : "")}).html(
                    that.options.i18n.selectNone
                    )
                    )
                    )
                    ));

            that.$container.append(
                    $("<div>", {
                        'class': 'multiSelectOrder-panels ' + (that.options.bootstrap ? 'row' : '')
                    }).append(that.$leftContainer).
                    append(that.$rightContainer
                            ));

            if (that.options.extra) {
                that.$extraContainer.append(
                        $("<div/>", {'class': "" + (that.options.bootstrap ? "col-md-6 col-md-offset-6 input-group" : "")}).append(
                        that.$inputExtra).append(
                        $("<span/>", {'class': "" + (that.options.bootstrap ? 'input-group-btn' : '')}).append(that.$inputExtraBtn)
                        ));

                that.$inputExtra.on("keypress", function(event) {
                    if (event.keyCode === 13) {
                        that.addExtraOption();
                    }
                });
                that.$inputExtraBtn.on("click", function() {
                    that.addExtraOption();
                });
            }
            that.$container.append(
                    $("<div>", {'class': 'row'}).append(
                    $("<div>", {'class': 'col-md-6 col-md-offset-6'}).append(that.$messageContainer)
                    ));

            element.after(that.$container);
            that.$container.after(that.$extraContainer);

            that.$leftUl.on("click", '.multiSelectOrder-leftLi', function() {
                var opt = element.find("option[value='" + $(this).data("multiSelectOrder-value") + "']");
                that.select(opt);
                that.$messageContainer.html('');
            });
            that.$container.on("click", '.multiSelectOrder-all', function() {
                element.find("option:not(:selected)").each(function() {
                    var opt = $(this);
                    that.select(opt);
                });
            });
            that.$container.on("click", '.multiSelectOrder-none', function() {
                element.find("option:selected").each(function() {
                    var opt = $(this);
                    that.deselect(opt);
                });
            });
            that.$rightUl.on("click", '.multiSelectOrder-deselectorBtn', function() {
                var li = $(this).parent().parent();
                var opt = element.find("option[value='" + li.data("multiSelectOrder-value") + "']");
                that.deselect(opt);
                that.$messageContainer.html('');
            });

            that.$rightUl.on("click", '.multiSelectOrder-upBtn', function() {
                var li = $(this).parent().parent();

                var index = that.$element.find("option[value='" + li.data("multiSelectOrder-value") + "']").index();

                var opt = that.$element.find("option:nth-child(" + (index + 1) + ")");
                var upperOpt = that.$element.find("option:nth-child(" + (index) + ")");

                if (!upperOpt.prop("selected")
                        || upperOpt === undefined) {
                    that.$messageContainer.html(opt.html() + ' ' + that.options.i18n.first);
                } else {
                    var newOpt = opt.clone(true);
                    newOpt.prop('selected', true);
                    upperOpt.before(newOpt);

                    var liIndex = $(".multiSelectOrder-rightUl li#" + that.idFromValue(opt.val())).index();
                    var rightLi = $(".multiSelectOrder-rightUl li:nth-child(" + (liIndex + 1) + ")");
                    var upperRightLi = $(".multiSelectOrder-rightUl li:nth-child(" + (liIndex) + ")");
                    upperRightLi.before(rightLi.clone(true));
                    rightLi.remove();
                    that.$messageContainer.html('');

                    opt.remove();
                }
            });

            that.$rightUl.on("click", '.multiSelectOrder-downBtn', function() {
                var li = $(this).parent().parent();

                var index = that.$element.find("option[value='" + li.data("multiSelectOrder-value") + "']").index();

                var opt = that.$element.find("option:nth-child(" + (index + 1) + ")");
                var downOpt = that.$element.find("option:nth-child(" + (index + 2) + ")");

                if (!downOpt.prop("selected")
                        || downOpt === undefined) {
                    that.$messageContainer.html(opt.html() + ' ' + that.options.i18n.last);
                } else {
                    var newOpt = opt.clone(true);
                    newOpt.prop('selected', true);
                    downOpt.after(newOpt);

                    var liIndex = $(".multiSelectOrder-rightUl li#" + that.idFromValue(opt.val())).index();
                    var rightLi = $(".multiSelectOrder-rightUl li:nth-child(" + (liIndex + 1) + ")");
                    var downRightLi = $(".multiSelectOrder-rightUl li:nth-child(" + (liIndex + 2) + ")");

                    downRightLi.after(rightLi.clone(true));
                    rightLi.remove();
                    that.$messageContainer.html('');

                    opt.remove();
                }

            });

        },
        'addExtraOption': function(paramOpt) {
            var that = this,
                    element = this.$element;
            var optValue 
            if ($(paramOpt).attr("value")) {
                optValue = $(paramOpt).attr("value")
            } else {
                optValue = that.$inputExtra.val()
            }
            
            var opt = paramOpt 
                ? paramOpt
                : $("<option>", {value: optValue}).html(optValue);

            if (optValue) {
                if (that.options.extraPattern) {
                    var p = new RegExp(that.options.extraPattern, "i");
                    if (!p.test(optValue)) {
                        that.$messageContainer.html(optValue + ' ' + that.options.i18n.invalid);
                        return;
                    }
                }
            }

            if (element.find("option[value='" + optValue + "']").length === 0) {
                var opt = $('<option/>', {
                    'value': optValue
                }).html(optValue);
                element.append(opt);
                that.select(opt);
                opt.data("multiSelectOrder-extra", true);
                that.$messageContainer.html('');
            } else {
                that.$messageContainer.html(optValue + ' ' + that.options.i18n.already);
            }
            that.$inputExtra.val('');
        },
        'select': function(opt) {
            var that = this,
                    element = this.$element;
            var li = that.$rightTmpl.clone().prepend(opt.html());
            var ul = that.$rightUl;

            li.data("multiSelectOrder-value", opt.val());
            li.attr('id', that.idFromValue(opt.val()));

            that.$leftUl.find("li#" + that.idFromValue(opt.val())).remove();
            opt.prop('selected', true);
            
            element.find("option[value='" + opt.val() + "']").remove();
            element.append(opt);

            ul.append(li);
        },
        'deselect': function(opt) {
            var that = this,
                    element = this.$element;
            if (!opt.data("multiSelectOrder-extra")) {
                var li = that.$leftTmpl.clone().prepend(opt.html());
                var ul = that.$leftUl;

                li.data("multiSelectOrder-value", opt.val());
                li.attr('id', that.idFromValue(opt.val()));

                var newOpt = opt.clone(true);
                newOpt.prop('selected', false);
                element.prepend(newOpt);
                opt.remove();
                ul.append(li);
            } else {
                element.find("option[value='" + opt.val() + "']").remove();
            }
            that.$rightUl.find("li#" + that.idFromValue(opt.val())).remove();
        },
        'idFromValue': function(value) {
            return 'multiSelectOrder-' + value + '-selection';
        }

    };

    /*
     * MultiSelectOrder PLUGIN DEFINITION
     */
    $.fn.multiSelectOrder = function() {
        var option = arguments[0],
                args = arguments;

        return this.each(function() {
            var $this = $(this),
                    data = $this.data('multiSelectOrder'),
                    options = $.extend({}, $.fn.multiSelectOrder.defaults, $this.data(), typeof option === 'object' && option);

            if (!data) {
                $this.data('multiSelectOrder', (data = new MultiSelectOrder(this, options)));
            }

            if (typeof option === 'string') {
                data[option](args[1]);
            } else {
                data.init();
            }
        });
    };

    $.fn.multiSelectOrder.defaults = {
        noOrder: false,
        bootstrap: false,
        extra: true,
        extraButton: false,
        extraPattern: false,
        extraPlaceholder: '',
        i18n: {
            selectAll: 'selectAll',
            selectNone: 'selectNone',
            already: 'already exists',
            invalid: 'not valid',
            first: 'already first',
            last: 'already last'
        }
    };
})();
