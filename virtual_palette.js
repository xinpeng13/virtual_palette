
function PaletteGenerator(){
    this.makePalette()
    this.palette
    this.colors = []
}

PaletteGenerator.prototype = {
    makePalette: function(){
        const paletteContainer = document.createElement('div')
        paletteContainer.style = 'width: 400px; height: 340px; background-color: LightPink;'
        paletteContainer.className = 'paletteContainer'

        const paletteHeader = document.createElement('div')
        paletteHeader.style = 'width: 100%; height: 40px; background-color: Yellow; overflow-x: auto;white-space: nowrap;'
        paletteHeader.className = 'paletteHeader'

        const paletteLeftBar = document.createElement('div')
        paletteLeftBar.style = 'width: 30%; height:300px; background-color: Green; overflow: auto;'
        paletteLeftBar.className = 'paletteLeftBar'

        paletteContainer.appendChild(paletteHeader)
        paletteContainer.appendChild(paletteLeftBar)
        this.palette = paletteContainer

        const body = $('body')
        body.append(paletteContainer)
    },
    addColor: function(color){

        const paletteLeftBar = $(this.palette).find('.paletteLeftBar')[0]
        const paletteHeader = $(this.palette).find('.paletteHeader')[0]
        const paletteContainer = $(this.palette)[0]

        const ColorContainer = document.createElement('button')

        ColorContainer.style = 'width: 100%; height: 30px; '
        ColorContainer.style.backgroundColor = color     
        
        ColorContainer.onclick = function() {
            const headerEntry = document.createElement('button')
            headerEntry.style = 'width: 20px; height:20px; margin:5px; '
            headerEntry.style.backgroundColor = color
            paletteHeader.appendChild(headerEntry)
        };
        
        paletteLeftBar.appendChild(ColorContainer)
        this.colors.push(color)
    }
}