(function() {
    var MultiSelectOrder = function(element, options) {
        this.options = options;
        this.$element = $(element);
        this.$container = $('<div/>', {
            'class': "multiSelectOrder-container row",
        });

        this.$extraContainer = $('<div/>', {
            class: 'row'
        });

        this.$inputExtra = $('<input/>', {
            'class': "multiSelectOrder-inputExtra form-control",
            'type': 'text'
        });

        this.$inputExtraBtn = $('<button/>', {
            'class': "multiSelectOrder-inputExtraBtn btn btn-default",
            'type': 'button'
        }).html("+");

        this.$messageContainer = $('<div/>', {'class': "multiSelectOrder-message"});

        this.$leftContainer = $('<div/>', {
            'class': "multiSelectOrder-left col-md-6",
            'style': "min-height: 200px; max-height: 300px;overflow: auto"
        });
        this.$rightContainer = $('<div/>', {
            'class': "multiSelectOrder-right col-md-6",
            'style': "min-height: 200px; max-height: 300px;overflow: auto"
        });

        this.$leftUl = $('<ul/>', {'class': "multiSelectOrder-leftUl list-group"});
        this.$rightUl = $('<ul/>', {'class': "multiSelectOrder-rightUl list-group"});

        this.$leftTmpl = $('<li/>', {'class': "multiSelectOrder-leftLi list-group-item"}).append(
                $("<span>", {class: 'buttonsWrapper pull-right'}).append(
                $("<button/>", {
                    type: 'button',
                    class: 'multiSelectOrder-upBtn btn btn-default btn-sm'}).html($("<i>",
                {class: 'glyphicon glyphicon-plus'}))));
                
        this.$rightTmpl = $('<li/>', {'class': "multiSelectOrder-rightLi list-group-item"}).append(
                $("<span>", {class: 'buttonsWrapper pull-right'}).append(
                $("<button/>", {
                    type: 'button',
                    class: 'multiSelectOrder-upBtn btn btn-default btn-sm'}).html(
                $('<i/>', {class: 'glyphicon glyphicon-chevron-up'}))).append(
                $("<button/>", {
                    type: 'button',
                    class: 'multiSelectOrder-downBtn btn btn-default btn-sm'}).html(
                $('<i/>', {class: 'glyphicon glyphicon-chevron-down'}))).append(
                $("<button/>", {
                    class: 'multiSelectOrder-deselectorBtn btn btn-default btn-sm',
                    type: 'button'}).html($('<i/>', {class: 'glyphicon glyphicon-remove'})))
                );
    };

    MultiSelectOrder.prototype = {
        constructor: MultiSelectOrder,
        init: function() {
            var that = this,
                    element = this.$element;

            element.css({position: 'absolute', left: '-9999px'});
            element.find("option").each(function() {
                var opt = $(this);
                if (opt.prop('selected')) {
                    that.select(opt);
                } else {
                    that.deselect(opt);
                }
            });

            that.$leftContainer.append(that.$leftUl);
            that.$rightContainer.append(that.$rightUl);

            that.$container.append(that.$leftContainer);
            that.$container.append(that.$rightContainer);

            that.$extraContainer.append(
                    $("<div/>", {class: 'col-md-6 pull-right input-group'}).append(
                    that.$inputExtra).append(
                    $("<span/>", {class: 'input-group-btn'}).append(that.$inputExtraBtn)
                    ));
            that.$container.append(that.$messageContainer);

            element.after(that.$container);
            that.$container.after(that.$extraContainer);

            that.$leftUl.on("click", '.multiSelectOrder-leftLi', function() {
                var opt = element.find("option[value='" + $(this).data("multiSelectOrder-value") + "']");
                that.select(opt);
                that.$messageContainer.html('');
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
                    that.$messageContainer.html(opt.html() + ' already first.');
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
                    that.$messageContainer.html(opt.html() + ' already last.');
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

            that.$inputExtraBtn.on("click", function() {
                if (element.find("option[value='" + that.$inputExtra.val() + "']").length === 0) {
                    var opt = $('<option/>', {
                        'value': that.$inputExtra.val()
                    }).html(that.$inputExtra.val());
                    element.append(opt);
                    that.select(opt);
                    opt.data("multiSelectOrder-extra", true);
                } else {
                    that.$messageContainer.html(that.$inputExtra.val() + ' already exists.');
                }
                that.$inputExtra.val('');
            });


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
    };
})();
