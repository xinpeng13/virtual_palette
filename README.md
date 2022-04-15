# js-library-shanxinp

## Landing Page: 
https://gentle-cliffs-11922.herokuapp.com/

## Documentation: 
https://gentle-cliffs-11922.herokuapp.com/api.html

## Installation
Download virtual_palette.js from our github repository.Include the following codes in the &lt;head&gt; section. Since our library utilized jquery, make sure to include the second line below.

```html
<script defer type="text/javascript" src="virtual_palette.js"></script>
<script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
```

## Example Code Snippet

### Basic Painting Palette Example
Create a basic non-popup painting palette. It has default color theme and default usage, "painting". The paintset added is a pre-defined set named "12color"

##### JS
```html
const pg_12 = new PaletteGenerator(false)
pg_12.addPaintSet("12color")
pg_12.addTitle("12 COLOR PAINTSET")
const ptr1 = document.getElementById("example1")
ptr1.appendChild(pg_12.show)
```
##### HTML
```html
<div id="example1">

</div>
```
### Customized Designer Cosmetics Palette Example
Create a non-popup designer cosmetics palette. It has "minimal" color theme and "cosmetics" usage. Developer can customize the title of the painting set and the color that is added. End users can also select the paint that is added to the painting set themselves.

##### JS
```html
const pg_customized_cosmetics = new PaletteGenerator(false, "cosmetics", true)
pg_customized_cosmetics.selectTheme("minimal")
pg_customized_cosmetics.addTitle("eye shadow")
pg_customized_cosmetics.addColor("#c96e51")
pg_customized_cosmetics.addColor("#e08b64")
pg_customized_cosmetics.addColor("#e3d3c4")
pg_customized_cosmetics.addColor("#dba579")
pg_customized_cosmetics.addColor("#aa7c65")
pg_customized_cosmetics.addColor("#845953")
const ptr7 = document.getElementById("example7")
ptr7.appendChild( pg_customized_cosmetics.show)
```
##### HTML
```html
<div id="example7">

</div>
```


## API
### Constructor
#### new PaletteGenerator(popup, usage, designer)

<table>
        <thead>
          <tr>
            <th scope="col">Argument</th>
            <th scope="col">Default</th>
            <th scope="col">Type</th>
            <th scope="col" style="width:40%">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">popup</th>
            <td>false</td>
            <td>Boolean</td>
            <td>Whether or not to create the virtual palette in a pop up fashion.</td>
          </tr>
          <tr>
            <th scope="row">usage</th>
            <td>"painting"</td>
            <td>String</td>
            <td>3 usages in total, including "painting", "watercolor", "cosmetics". 
              The examples and usages of those three types of palettes are listed in the example page.</td>
          </tr>
          <tr>
            <th scope="row">designer</th>
            <td>false</td>
            <td>Boolean</td>
            <td>Whether or not to create a palette in designer mode. 
              A designer palette allows end users to add colors to the painting set themselves.</td>
          </tr>
        </tbody>
      </table>
      
### Methods
#### paletteInstance.addPaintSet(paintingSet)

<table >
        <thead>
          <tr>
            <th scope="col">Argument</th>
            <th scope="col" style="width:30%">Type</th>
            <th scope="col" style="width:40%">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">paintingSet</th>
            <td>String</td>
            <td>To add pre-defined painting set to the palette. There are 5 pre-defined painting sets including: "12color", "rgb", "lipstick" and "pastel".
            </td>
          </tr>
        </tbody>
</table>
 
 #### paletteInstance.addColor(hexCode)
 <table >
        <thead>
          <tr>
            <th scope="col">Argument</th>
            <th scope="col" style="width:30%">Type</th>
            <th scope="col" style="width:40%">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">hexCode</th>
            <td>String</td>
            <td>
              The hexadecimal code of the customized color that the developer want to add to the palette. eg. "#33ccff"
            </td>
          </tr>
        </tbody>
</table>


#### paletteInstance.addTitle(title)
<table>
        <thead>
          <tr>
            <th scope="col">Argument</th>
            <th scope="col" style="width:30%">Type</th>
            <th scope="col" style="width:40%">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">title</th>
            <td>String</td>
            <td>
              The title of the painting set that the
              developer want to add to the palette. eg. "rgb palette"
            </td>
          </tr>
        </tbody>
</table>

#### paletteInstance.selectTheme(theme)
<table >
        <thead>
          <tr>
            <th scope="col">Argument</th>
            <th scope="col" style="width:30%">Type</th>
            <th scope="col" style="width:40%">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">theme</th>
            <td>String</td>
            <td>
              The argument represents the theme of the palette. 
              It will create a palette with default theme if you do not use this method. 
              You can pass in ‘minimal’ or ‘dark’ to the argument theme to switch to other color themes.
            </td>
          </tr>
        </tbody>
      </table>
