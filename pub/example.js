const pg_12 = new PaletteGenerator(false)
pg_12.addPaintSet("12color")
pg_12.addTitle("12 COLOR PAINTSET")

const ptr1 = document.getElementById("example1")
ptr1.appendChild(pg_12.show)


const pg_purple = new PaletteGenerator(true)
pg_purple.addTitle("Customized PAINTSET")
pg_purple.addColor("#ffccff")
pg_purple.addColor("#ccccff")
pg_purple.addColor("#99ccff")
pg_purple.addColor("#66ccff")
pg_purple.addColor("#33ccff")
pg_purple.selectTheme("dark")

const ptr2 = document.getElementById("example2")
ptr2.appendChild(pg_purple.show)


const pg_watercolor = new PaletteGenerator(false, "watercolor")
pg_watercolor.addTitle("Pastel PAINTSET")
pg_watercolor.addPaintSet("pastel")
pg_watercolor.selectTheme("minimal")

const ptr3 = document.getElementById("example3")
ptr3.appendChild(pg_watercolor.show)

const pg_cosmetics = new PaletteGenerator(false, "cosmetics")
pg_cosmetics.addPaintSet("lipstick")
pg_cosmetics.selectTheme("dark")

const ptr4 = document.getElementById("example4")
ptr4.appendChild(pg_cosmetics.show)

const pg_designer = new PaletteGenerator(false, "painting", true)
pg_designer.selectTheme("minimal")
const ptr5 = document.getElementById("example5")

ptr5.appendChild(pg_designer.show)


const pg_watercolor_designer = new PaletteGenerator(true, "watercolor", true)
const ptr6 = document.getElementById("example6")

ptr6.appendChild( pg_watercolor_designer.show)

const pg_customized_cosmetics = new PaletteGenerator(false, "cosmetics", true)
pg_customized_cosmetics.selectTheme("minimal")
pg_customized_cosmetics.addTitle("eye shadow")
pg_customized_cosmetics.addColor("#c96e51")
pg_customized_cosmetics.addColor("#e08b64")
pg_customized_cosmetics.addColor("#e3d3c4")
pg_customized_cosmetics.addColor("#dba579")
pg_customized_cosmetics.addColor("#aa7c65")
const ptr7 = document.getElementById("example7")

ptr7.appendChild( pg_customized_cosmetics.show)


function openCode(codeName, codeChunk) {
  let x = document.getElementsByClassName(codeChunk);
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(codeName).style.display = "block";
}