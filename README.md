multiSelectOrder
================

### Work in progress ###
jQuery plugin for a simple two panels multi select with order

![demo](https://raw.github.com/racoonman/multiSelectOrder/master/demo.png)

### Features ###
* Bootstrap friendly (hardcoded)
* Add new elements to the options
* Restrict new added elements with a JavascriptRegExp

### TO-DO ###
* Remove hardcoded bootstrap classes
   * Use it if required by options
* Options to use own CSS classes
* Option to use or not the add option input

### Usage ###
Use it like a normal select, then call $.("#target").multiSelectOrder().

Submit and you will receive a ordered list of the selected items

```HTML
<select id="target" name="usuario" multiple>
    <option value="21">Antonio</option>
    <option value="22" selected>Juan</option>
    <option value="23">Pepe</option>
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

**extraPattern** *(RegExp)*: If defined the added options will be filtered

*default: false*

