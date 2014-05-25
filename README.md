multiSelectOrder
================

### Work in progress ###
jQuery plugin for a simple two panels multi select with order

![demo](https://raw.github.com/racoonman/multiSelectOrder/master/demo.png)

### Features ###
* Bootstrap friendly
* Add new elements to the options
* Restrict new elements using JavascriptRegExp

### TO-DO ###
* Options to use own CSS classes

### Usage ###
Use it like a regular select, then call $.("#target").multiSelectOrder().

For preselected values, the plugin ignores the "selected" atribute in options. You must use the attribute *data-multiSelectOrder-values* to pass a list of the values of the selected options. This should be done in order to ignore the order of the options list, while keeping the order of the values
For example, the options must be in alphabetical order, but the selected values are not in order.

Submit and you will receive a ordered list of the selected items

**Limitation:** the select tag must contains the multiple atribute for a correct behaviour

```HTML
<select id="target" name="patata" multiple data-multiSelectOrder-values="26,25,24">
    <option value="21">One</option>
    <option value="22">Two</option>
    <option value="23">Three</option>
    <option value="24">Four</option>
    <option value="25">Five</option>
    <option value="26">Six</option>
    <option value="27">Seven</option>
</select>

<script>
    $("#target").multiSelectOrder({extra: false, extraPattern: ''})
</script>
```

### Options ###
**noOrder** *(Boolean)*: If true, the ordering buttons will not be displayed

*default: false*

**bootstrap** *(Boolean)*: If true, bootstrap css classes will be applied. You must include bootstrap by yourself

*default: false*

**extra** *(Boolean)*: Include the input for adding new items

*default: true*

**extraOptions** *(String[])*: List of extra options

*default: []*

**extraPattern** *(String)*: If defined, the added options will be filtered with a RegExp(extraPattern, 'i')

*default: false*

**extraButton** *(String)*: Text or html to be shown in the include button for extra options 

*default: +*

**extraPlaceholder** *(String)*: Text to be shown in the input of extra options as placeholder

*default: ''*

**i18n:** *(Json)*: translations. If used you must supply all the translations

    * selectAll: *selectAll*

    * selectNone: *selectNone*

    * first: *already first*

    * last: *already last*

    * already: *already exists*

    * invalid: *is not valid*
