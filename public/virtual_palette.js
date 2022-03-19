
const log = console.log


function PaletteGenerator(popup){
    this.show
    this.popup = popup
    this.makePalette()
    this.palette
    this.colors = []
    this.entries = []
}

PaletteGenerator.prototype = {
    makePalette: function(){
        const paletteContainer = document.createElement('div')
        paletteContainer.style = 'width: 400px; height: 350px; background-color: #e2cfc9;border-radius:5%;border-style:groove;'
        paletteContainer.className = 'paletteContainer'

        const paletteHeader = document.createElement('div')
        paletteHeader.style = 'width: 365px; height: 40px;  overflow-x: auto;white-space: nowrap; display: inline-block;'
        paletteHeader.className = 'paletteHeader'

        const paletteInfo = document.createElement('button')
        paletteInfo.style = 'width: 25px; height: 25px; background-color: #bfd8c4; display:inline-block; border-radius:50%;margin-top:7px;'
        paletteInfo.className = 'paletteInfo'
        let ifInfoClick = 0
        paletteInfo.onclick = function(){
            if(ifInfoClick == 0){
                const popupInfo = document.createElement('div')
                popupInfo.className = 'popupInfo'
                popupInfo.style = 'width: 100px; height: 150px;position:relative;overflow-y:auto;margin-top:10px; border-radius:5%;'
                popupInfo.style.backgroundColor = paletteInfo.style.backgroundColor
                popupInfo.style.color = paletteInfo.children[0].style.color
                paletteInfo.appendChild(popupInfo)
                const entries = paletteHeader.querySelectorAll('button.entry')
                const lst = Array.from(entries).map((i)=>{return i.style.backgroundColor})
                const dict = calculateEachPercentage(lst)
                for(const item in dict){
                    const percEntry = document.createElement('div')

                    const percColor = document.createElement('div')
                    percColor.style = 'width: 15px; height: 15px; margin:2px;display:inline-block;margin-top:5px;'
                    percColor.style.backgroundColor = item

                    const percText = document.createElement('span')
                    percText.innerText = dict[item]
                    percEntry.appendChild(percColor)
                    percEntry.appendChild(percText)
                    popupInfo.appendChild(percEntry)
                }
                const totalTitle = document.createElement('div')
                totalTitle.style = 'background-color:Grey; width:90%;margin-top:10%;margin-bottom:5px;border-radius:10%;margin-left:5px;'
                
                totalTitle.innerText = "Mixed Color:"
                popupInfo.appendChild(totalTitle)
                
                const totalColor = paletteMain.style.backgroundColor

                const percEntry = document.createElement('div')

                const percColor = document.createElement('div')
                percColor.style = 'width: 15px; height: 15px; margin:2px;display:inline-block;'
                percColor.style.backgroundColor = totalColor

                const percText = document.createElement('span')
                percText.innerText = totalColor
                totalTitle.appendChild(percColor)
                totalTitle.appendChild(percText)
                totalTitle.appendChild(percEntry)

                ifInfoClick = 1
            }else{
                const firstElementChild = paletteInfo.firstElementChild;
                paletteInfo.innerHTML = '';
                paletteInfo.append(firstElementChild);
                ifInfoClick = 0
            }  
        }

        const paletteInfoIcon = document.createElement('span')
        paletteInfoIcon.style = 'color:White;position:center;'
        paletteInfoIcon.innerHTML= "&#8505";

        const paletteLeftBar = document.createElement('div')
        paletteLeftBar.style = 'width: 28%; height:295px; background-color: #f5o5cb; overflow: auto; display:inline-block;margin-left:5px;border-style:ridge;border-color:white;'
        paletteLeftBar.className = 'paletteLeftBar'

        const paletteMain = document.createElement('div')
        paletteMain.style = 'width: 65%; height:280px; background-color: #f6f6e8; display:inline-block;border-radius:10%;margin-left:10px;margin-bottom:10px;'
        paletteMain.className = 'paletteMain'

        const paletteClear = document.createElement('button')
        paletteClear.style = 'width: 50px; height: 30px;margin-top:6px;margin-left:10px;border-radius:20%;float: left;'
        paletteClear.className = 'paletteClear'
        paletteClear.onclick = function(){
            this.entries = []
            const firstElementChild = $(this)[0];
            $(this).parent().empty()
            paletteHeader.appendChild(firstElementChild)
            const mixcolor = mix(this.entries)
            paletteMain.style.backgroundColor = mixcolor
        }
        paletteClear.innerText = "Clear"
        paletteInfo.appendChild(paletteInfoIcon)
        paletteHeader.appendChild(paletteClear)

        paletteContainer.appendChild(paletteHeader)
        paletteContainer.appendChild(paletteInfo)
        paletteContainer.appendChild(paletteLeftBar)
        paletteContainer.appendChild(paletteMain)
        this.palette = paletteContainer

        let flagPop = 0
        if(this.popup == true){
            const buttonDiv = document.createElement('div')
            const buttonPop = document.createElement('button')
            buttonPop.style = 'box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);width: 100px; height: 30px; background-color: #f6f6e8;border-radius:10%;color:Grey;border-color:Grey;'
            buttonPop.innerText = "Open Palette"
            buttonPop.onclick= function(){
                if(flagPop == 0){
                    buttonDiv.append(paletteContainer)  
                    flagPop = 1
                }else{
                    paletteContainer.remove()
                    flagPop = 0
                } 
            
            }
            buttonDiv.appendChild(buttonPop)
            this.palette = paletteContainer
            this.show = buttonDiv
            // const parent = $("this").parent()
            // parent.append(buttonDiv) 
        }else{
            this.show = paletteContainer
            this.palette = paletteContainer
            // const parent = $("this").parent()
            // parent.append(paletteContainer)
        }
        
    },
    addColor: function(color){
        const paletteLeftBar = $(this.palette).find('.paletteLeftBar')[0]
        const paletteHeader = $(this.palette).find('.paletteHeader')[0]
        const paletteMain = $(this.palette).find('.paletteMain')[0]

        // the paintset on the left bar
        const ColorContainer = document.createElement('button')
        ColorContainer.style = 'width: 100%; height: 30px; '
        ColorContainer.style.backgroundColor = color 

        ColorContainer.onclick = function handlePush(){
            const entryButton = document.createElement('button')
            entryButton.style = 'width: 15px; height: 15px; margin:2px;float: left;margin-top:15px;'
            entryButton.style.backgroundColor = color
            entryButton.className = 'entry'
            paletteHeader.appendChild(entryButton)

            // lst is all colors in header
            const entries = paletteHeader.querySelectorAll('button.entry')
            let lst = Array.from(entries).map((i)=>{return i.style.backgroundColor})
            const mixedColor = mix(lst)
            paletteMain.style.backgroundColor = mixedColor

            entryButton.onclick = function(){
                $(this).remove()
                const newentries = paletteHeader.querySelectorAll('button.entry')
                newlst = Array.from(newentries).map((i)=>{return i.style.backgroundColor})
                const mixedColor = mix(newlst)
                paletteMain.style.backgroundColor = mixedColor
            }

        }

        paletteLeftBar.appendChild(ColorContainer)
        this.colors.push(color)

    },
    addPaintSet: function(paintset){
        if(paintset == "12color"){
            this.addColor("#fffffe")
            this.addColor("#fafa33")
            this.addColor("#cb9d06")
            this.addColor("#E34234")

            this.addColor("#990000")
            this.addColor("#49796b")
            this.addColor("#40826D")
            this.addColor("#120a8f")

            this.addColor("#0047AB")
            this.addColor("#E97451")
            this.addColor("#826644")
            this.addColor("#444958")

        }else if(paintset == "rgb"){
            this.addColor("#ff0000")
            this.addColor("#00ff00")
            this.addColor("#0000ff")
        }
    },
    addTitle: function(title){
        const titleEntry = document.createElement('div')
        titleEntry.style = "float:left;font-family: 'Lucida Console', 'Courier New', monospace;background-color:#3a3b3c;width:100%;height:auto;color:White;text-align: center;overflow:auto;text-shadow: 0.5px 0.5px 6px white;border-style:ridge;"

        titleEntry.innerText = title
        const paletteLeftBar = $(this.palette).find('.paletteLeftBar')[0]
        paletteLeftBar.insertBefore(titleEntry, paletteLeftBar.children[0]);
    },
    selectTheme:function(theme){
        const paletteContainer = $(this.palette)[0]
        const paletteInfo = $(this.palette).find('.paletteInfo')[0]
        const paletteMain = $(this.palette).find('.paletteMain')[0]
        if(theme == "minimal"){
            paletteContainer.style.backgroundColor = "white";
            paletteMain.style.backgroundColor = "LightGrey";
            paletteMain.style.borderStyle = "Groove"
            paletteMain.style.borderRadius = "50%"
            paletteInfo.style.backgroundColor = "Black"
        }else if(theme == "dark"){
            paletteContainer.style.backgroundColor = "Black";
            paletteMain.style.backgroundColor = "DarkGrey";
            paletteMain.style.borderRadius = "40%"
            paletteInfo.style.backgroundColor = "Black"
            paletteInfo.style.opacity = "0.75"
        }

    }

}

function calculateEachPercentage(lst){
    const length = lst.length
    let dict = {}
    for(let i = 0; i < lst.length; i++){
        if(dict[lst[i]] === undefined){
            dict[lst[i]] = 1
        }else{
            dict[lst[i]] += 1
        }
    }
    for(const color in dict){
        dict[color] = (Math.round((dict[color]/length)* 100)).toString()+'%';
    }

    return dict
}


function mix(lst){
    if(lst.length == 0){
        return 'rgb(0,0,0)'
    }
    let r = 0
    let g = 0
    let b = 0
    for(let i = 0; i < lst.length; i++){
        r += parseInt(lst[i].slice(4,-1).split(',')[0])
        g += parseInt(lst[i].slice(4,-1).split(',')[1])
        b += parseInt(lst[i].slice(4,-1).split(',')[2])
    }
    const total = lst.length
    r = Math.round(r / total) 
    g = Math.round(g / total) 
    b = Math.round(b / total) 

    return 'rgb('+r+','+g+','+b+')'
}

function hexToRGB(hex){
    var h;
    h= hex.substring(1).split('');
    if(h.length== 3){
        h= [h[0], h[0], h[1], h[1], h[2], h[2]];
    }
    h= '0x'+h.join('');
    return ['rgb('+[(h>>16)&255, (h>>8)&255, h&255].join(',')+')', [(h>>16)&255, (h>>8)&255, h&255]];
}



