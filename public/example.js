const pg_12 = new PaletteGenerator(false)
pg_12.addPaintSet("12color")
pg_12.addTitle("12 COLOR PAINTSET")

const pg_popup = new PaletteGenerator(false)
pg_popup.addColor("#ffccff")
pg_popup.addColor("#ccccff")
pg_popup.addColor("#99ccff")
pg_popup.addColor("#66ccff")
pg_popup.addColor("#33ccff")
pg_popup.selectTheme("minimal")

const pg_rgb = new PaletteGenerator(true)
pg_rgb.addPaintSet("rgb")
pg_rgb.addTitle("rgb PAINTSET")
pg_rgb.selectTheme("dark")


const example1 = document.createElement('p')
example1.innerText = "The first example is a virtual palette created using the default theme. It contains a predefined paintset named '12color'"

const example2 = document.createElement('p')
example2.innerText = "The second example is a virtual palette created using the 'minimal' theme. It contains paints that the developer manually added using the colors' hexedecimal code"

const example3 = document.createElement('p')
example3.innerText = "The third example is a virtual palette created using the 'dark' theme. It contains a predefined paintset named 'rgb' and it is showed as a popup window"

$('div')[0].append(example1)
$('div')[0].append(pg_12.show)

$('div')[0].append(example2)
$('div')[0].append(pg_popup.show)

$('div')[0].append(example3)
$('div')[0].append(pg_rgb.show)



