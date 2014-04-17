multiSelectOrder
================

### Work in progress ###
jQuery plugin for a simple two panels multi select with order

![demo](https://raw.github.com/racoonman/multiSelectOrder/master/demo.png)

### Features ###
* Bootstrap friendly
* Add new elements to the options
* Restrict new added elements with a JavascriptRegExp

### TO-DO ###
* Options to use own CSS classes

### Usage ###
Use it like a normal select, then call $.("#target").multiSelectOrder().

For preselected values, th plugin ignores the "selected" atribute in options. You must use the attribute *data-multiSelectOrder-values* to pass a list of the values of the selected options. This is done for ignore the order of the options list but respect the order of the values
For example, the options must be in alphabetical oder, but the selected values are not in order.

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
**bootstrap** *(Boolean)*: If true, bootstrap css classes will be applied. You must include bootstrap by yourself

*default: false*

**extra** *(Boolean)*: Include the input for adding new items

*default: true*

**extraOptions** *(String[])*: List of extra options

*default: []*

**extraPattern** *(RegExp)*: If defined the added options will be filtered

*default: false*

**extraButton** *(String)*: Text or html to put in the include button for extra options 

*default: +*

**extraPlaceholder** *(String)*: Text to put in the input of extra options as placeholder

*default: ''*

**i18n:** *(Json)*: translations. If used you must supply all the translations

    * selectAll: *selectAll*

    * selectNone: *selectNone*

    * first: *already first*

    * last: *already last*

    * already: *already exists*

    * invalid: *is not valid*
