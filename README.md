multiSelectOrder
================

jQuery plugin for a two panels multi select with order

### Work in progress ###
### Features ###
* Bootstrap friendly (hardcoded)
* Add new elements to the options

### TO-DO ###
* Remove hardcoded bootstrap classes
   * Use it if required by options
* Options to use own CSS classes
* Option to use or not the add option input

![demo](https://raw.github.com/racoonman/multiSelectOrder/master/demo.png)

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
