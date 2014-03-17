multiSelectOrder
================

jQuery plugin for a two panels multi select with order

![demo](https://raw.github.com/racoonman/multiSelectOrder/master/demo.png)

Use it like a normal select, then call $.("#target").multiSelectOrder()
Submit and you will receive a ordered list of the selected items

'''HTML
<select id="target" name="patata" multiple>
                    <option value="21">Antonio</option>
                    <option value="22" selected>Juan</option>
                    <option value="23">Pepe</option>
</select>

<script>
    $("#target").multiSelectOrder({extra: false, extraPattern: ''})
</script>
'''
