
(function(global, document, $) { 
function PaletteGenerator(popup, usage, designer){
    this.show
    if(popup != undefined){
        this.popup = popup
    }else{
        this.popup = false
    }
    this.palette
    this.colors = []
    this.entries = []
    if(usage == "painting"){
        this.usage = "painting"
    }else if(usage == "watercolor"){
        this.usage = "watercolor"
    }else if(usage == "cosmetics"){
        this.usage = "cosmetics"
    }else{
        this.usage = "painting"
    }
    if(designer == true){
        this.designer = true}
    else{
        this.designer = false
    }
    this.makePalette()
}

PaletteGenerator.prototype = {
    makePalette: function(){
        let paletteContainer = document.createElement('div')
        paletteContainer.style = 'width: 400px; height: 350px; background-color: #e2cfc9;border-radius:5%;border-style:groove;'
        if(this.usage == "cosmetics"){
            paletteContainer.style = 'width: 400px; height: 400px; background-color: #e2cfc9;border-radius:5%;border-style:groove;z-index: -1;'
        }
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
                popupInfo.style = 'width: 100px; height: 150px;position:relative;left:30px;bottom:50px;overflow-y:auto;margin-top:10px; border-radius:5%;'
                popupInfo.style.backgroundColor = paletteInfo.style.backgroundColor
                popupInfo.style.color = paletteInfo.children[0].style.color
                paletteInfo.appendChild(popupInfo)
                const entries = paletteHeader.querySelectorAll('button.entry')
                const lst = Array.from(entries).map((i)=>{return i.style.backgroundColor})
                const dict = _calculateEachPercentage(lst)
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
                percColor.style = 'width: 20px; height: 20px; margin:2px;display:inline-block;'
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
        if(this.usage == "watercolor" || this.usage == "painting"){
            paletteLeftBar.style = 'width: 28%; height:295px; background-color: #f5o5cb; overflow: auto; display:inline-block;margin-left:5px;border-style:ridge;border-color:white;'
        }
        else{
            paletteLeftBar.style = 'width: 90%; height:17%; background-color: #f5o5cb; overflow: auto;display:inline-block;margin-left:5px;border-style:ridge;border-color:white;'
        }
        if(this.designer == true){
            if(this.usage != "cosmetics"){
                paletteLeftBar.style.height = "260px";
                paletteLeftBar.style.marginTop = "35px"
            }
            else{
                paletteLeftBar.style.width = "70%";
            }
        }
        
        paletteLeftBar.className = 'paletteLeftBar'

        const paletteMain = document.createElement('div')
        paletteMain.style = 'width: 65%; height:280px; background-color: #f6f6e8; display:inline-block;border-radius:10%;margin-left:10px;margin-bottom:10px;transition:0.5s;'

        paletteMain.onclick = ()=>{
            this.addColor(_RGBToHex(paletteMain.style.backgroundColor))
        }
        paletteMain.onmouseover = ()=>{
            const paletteMainText = document.createElement("div");
            paletteMainText.innerText = "click to add me to paintset";
            paletteMainText.style = "position:absolute;font-family: 'Lucida Console', 'Courier New', monospace;font-size:3px;background-color:white;border-radius:10%; opacity:70%; width:130px; height:50px;padding:7px;"
            if(this.usage == "cosmetics"){
                paletteMainText.style.marginTop = "80px";
            }
            paletteMain.appendChild(paletteMainText)
        }
        paletteMain.onmouseout = ()=>{

            paletteMain.innerHTML = "";
        }
        paletteMain.className = 'paletteMain'

        const paletteClear = document.createElement('button')
        paletteClear.style = 'width: 50px; height: 30px;margin-top:6px;margin-left:10px;border-radius:20%;float: left;'
        paletteClear.className = 'paletteClear'
        paletteClear.onclick = function(){
            this.entries = []
            const firstElementChild = $(this)[0];
            $(this).parent().empty()
            paletteHeader.appendChild(firstElementChild)
            const mixcolor = _mix(this.entries)
            paletteMain.style.backgroundColor = mixcolor
        }
        paletteClear.innerText = "Clear"
        paletteInfo.appendChild(paletteInfoIcon)
        paletteHeader.appendChild(paletteClear)

        paletteContainer.appendChild(paletteHeader)
        paletteContainer.appendChild(paletteInfo)
        paletteContainer.appendChild(paletteLeftBar)
        


        if(this.usage == "cosmetics"){
            paletteMain.style = 'width: 50%; height:20%; background-color: #f6f6e8; display:inline-block;border-radius:3%;margin-left:50px; position:relative; bottom:380px'
            const paletteSkintone = document.createElement('div')
            paletteSkintone.style = 'width: 100%; height:71%; display:inline-block;border-bottom-right-radius:5%;border-bottom-left-radius:5%; position:relative; bottom:5px; '
            paletteContainer.appendChild(paletteSkintone)
            paletteContainer.appendChild(paletteMain)
            
            // add rightbar functionality
            const paletteRight = document.createElement('div')
            paletteRight.style = 'width: 30%; height:75%; display:inline-block;position:relative; bottom:300px; left:40px;'
            paletteContainer.appendChild(paletteRight)

            // title
            const bottemTitle = document.createElement('p')
            bottemTitle.innerText = "Skintone"
            bottemTitle.style = "color:grey;font-family: 'Copperplate';font-size:small; position:relative;top:8px;"
            paletteRight.appendChild(bottemTitle)

            const paletteSkintoneButton1 = document.createElement('button')
            paletteRight.appendChild(paletteSkintoneButton1)
            paletteSkintoneButton1.style = 'width: 100px; height:20px; background-color: #f6e4dd; display:inline-block;'
            paletteSkintoneButton1.onclick = function(){
                paletteSkintone.style.backgroundColor = "#f6e4dd";
            }

            const paletteSkintoneButton2 = document.createElement('button')
            paletteRight.appendChild(paletteSkintoneButton2)
            paletteSkintoneButton2.style = 'width: 100px; height:20px; background-color: #fee3d4; display:inline-block;'
            paletteSkintoneButton2.onclick = function(){
                paletteSkintone.style.backgroundColor = "#fee3d4";
            }

            const paletteSkintoneButton3 = document.createElement('button')
            paletteRight.appendChild(paletteSkintoneButton3)
            paletteSkintoneButton3.style = 'width: 100px; height:20px; background-color: #f2ccb7; display:inline-block;'
            paletteSkintoneButton3.onclick = function(){
                paletteSkintone.style.backgroundColor = "#f2ccb7";
            }

            const paletteSkintoneButton4 = document.createElement('button')
            paletteRight.appendChild(paletteSkintoneButton4)
            paletteSkintoneButton4.style = 'width: 100px; height:20px; background-color: #e5b5a1; display:inline-block;'
            paletteSkintoneButton4.onclick = function(){
                paletteSkintone.style.backgroundColor = "#e5b5a1";
            }

            const paletteSkintoneButton5 = document.createElement('button')
            paletteRight.appendChild(paletteSkintoneButton5)
            paletteSkintoneButton5.style = 'width: 100px; height:20px; background-color: #dfaa8b; display:inline-block;'
            paletteSkintoneButton5.onclick = function(){
                paletteSkintone.style.backgroundColor = "#dfaa8b";
            }

            const paletteSkintoneButton6 = document.createElement('button')
            paletteRight.appendChild(paletteSkintoneButton6)
            paletteSkintoneButton6.style = 'width: 100px; height:20px; background-color: #d19477; display:inline-block;'
            paletteSkintoneButton6.onclick = function(){
                paletteSkintone.style.backgroundColor = "#d19477";
            }

            const paletteSkintoneButton7 = document.createElement('button')
            paletteRight.appendChild(paletteSkintoneButton7)
            paletteSkintoneButton7.style = 'width: 100px; height:20px; background-color: #bf916b; display:inline-block;'
            paletteSkintoneButton7.onclick = function(){
                paletteSkintone.style.backgroundColor = "#bf916b";
            }

            const paletteSkintoneButton8 = document.createElement('button')
            paletteRight.appendChild(paletteSkintoneButton8)
            paletteSkintoneButton8.style = 'width: 100px; height:20px; background-color: #844906; display:inline-block;'
            paletteSkintoneButton8.onclick = function(){
                paletteSkintone.style.backgroundColor = "#844906";
            }

            const paletteSkintoneButton9 = document.createElement('button')
            paletteRight.appendChild(paletteSkintoneButton9)
            paletteSkintoneButton9.style = 'width: 100px; height:20px; background-color: #552f04; display:inline-block;'
            paletteSkintoneButton9.onclick = function(){
                paletteSkintone.style.backgroundColor = "#552f04";
            }

            const paletteSkintoneButton10 = document.createElement('button')
            paletteRight.appendChild(paletteSkintoneButton10)
            paletteSkintoneButton10.style = 'width: 100px; height:20px; background-color: #1f1101; display:inline-block;'
            paletteSkintoneButton10.onclick = function(){
                paletteSkintone.style.backgroundColor = "#1f1101";
            }    

        }else if(this.usage == "watercolor"){
            const paletteMainContainer = document.createElement('div')
            paletteMainContainer.style = 'width: 70%; height:85%; display:inline-block; border-bottom-right-radius:5%; bottom:67px;;position:relative;transition:0.3s;'
            paletteContainer.appendChild(paletteMainContainer)
            // edit style of paletteMain
            paletteMainContainer.appendChild(paletteMain)
            paletteMain.style.width = "200px"
            paletteMain.style.height = "200px"
            paletteMain.style.marginLeft = "40px"
            paletteMain.style.marginTop = "15px"
            
            // add bottem functionality
            const paletteBottem = document.createElement('div')
            paletteBottem.style = 'width: 70%; height:15%; display:inline-block;position:relative; bottom:130px; left:120px;'
            paletteContainer.appendChild(paletteBottem)
             
            
            // add water title
            const bottemTitle = document.createElement('p')
            bottemTitle.innerText = "Add water"
            bottemTitle.style = "font-family: 'Copperplate';font-size:small; position:relative; bottom:10px;left:12px;"
             paletteBottem.appendChild(bottemTitle)
            // input range
            const rangeButton = document.createElement('input')
            rangeButton.type = "range";
            rangeButton.min = "0";
            rangeButton.max = "100";
            rangeButton.style = " direction: rtl; width: 180px;position:relative; bottom:13px;left:10px;"
            rangeButton.addEventListener("change", changeRange, false);
            function changeRange(event) {
                paletteMain.style.opacity = event.target.value / 100
            }
            rangeButton.select();
            paletteBottem.appendChild(rangeButton)

            // select background title
            const backgroundTitle = document.createElement('p')
            backgroundTitle.innerText = "Background"
            backgroundTitle.style = "font-family: 'Copperplate';font-size:small; position:relative; bottom:68px;left:180px;"
             paletteBottem.appendChild(backgroundTitle)

            // input background color
            const colorButton = document.createElement('input')
            colorButton.type = "color";
            colorButton.addEventListener("change", changeBackground, false);
            function changeBackground(event) {
               paletteMainContainer.style.backgroundColor = event.target.value
            }
            colorButton.select();
            paletteBottem.appendChild(colorButton)
            colorButton.style = 'width: 30px; height:30px; background-color: #1f1101; display:inline-block;position:relative;bottom:80px;left:230px;'
        }
        else{
            paletteContainer.appendChild(paletteMain)
        }

        if(this.designer == true){
            const paletteTotal = $(this.palette).find('.paletteTotal')[0]     

            // add paint title
            const paintsetTitle = document.createElement('p')
            paintsetTitle.innerText = "Add paint"
            if(this.usage == "painting"){
                paintsetTitle.style = "font-family: 'Copperplate';font-size:small; position:relative; bottom:300px;left:10px;color:Grey;"
            }else if(this.usage == "watercolor"){
                paintsetTitle.style = "font-family: 'Copperplate';font-size:small; position:relative; bottom:495px;left:10px;color:Grey;"
            }
            else if(this.usage == "cosmetics"){
                paintsetTitle.style = "font-family: 'Copperplate';font-size:small; position:relative; bottom:660px;left:290px;color:Grey;"
            }
            paletteContainer.appendChild(paintsetTitle)

            
            // input paintset color
            const colorPaintset = document.createElement('input')
            colorPaintset.type = "color";
            colorPaintset.addEventListener("change",(event)=> this.addColor(event.target.value), false);
            colorPaintset.select();
            
            if(this.usage == "painting"){
               colorPaintset.style = 'width: 40px; height:30px;  display:inline-block;position:relative;bottom:340px;left:80px; '
            }else if(this.usage == "watercolor"){
                colorPaintset.style = 'width: 40px; height:30px;  display:inline-block;position:relative;bottom:530px;left:77px; '
            }
            else if(this.usage == "cosmetics"){
                colorPaintset.style = 'width: 40px; height:30px;  display:inline-block;position:relative;bottom:675px;left:300px; '
            }
            paletteContainer.appendChild(colorPaintset)
        }
        
        this.palette = paletteContainer

        let flagPop = 0
        if(this.popup == true){
            const buttonDiv = document.createElement('div')
            const buttonPop = document.createElement('button')
            buttonPop.style = 'box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);width: 110px; height: 30px; background-color: #f6f6e8;border-radius:5%;color:Grey;border-color:Grey;'
            buttonPop.innerText = "Open Palette"
            buttonPop.onclick= function(){
                if(flagPop == 0){
                    buttonDiv.append(paletteContainer)  
                    paletteContainer.style.position = "absolute"
                    paletteContainer.style.zIndex = "1000"
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
        if(this.usage == "cosmetics"){
             ColorContainer.style = 'width: 36px; height: 36px;border-radius:50%; margin:3px;'
        }
        ColorContainer.style.backgroundColor = color
        ColorContainer.onmouseover=()=>{
            if(this.usage == "cosmetics"){
                const colorText = document.createElement("div")
                ColorContainer.style.width = "42px"
                ColorContainer.style.height = "42px"
                ColorContainer.style.margin = "0px"
                colorText.style = 'width:65px; height:20px; background-color:white;position:relative; bottom:23px;border-radius:10%;opacity:70%;right:20px;'
                colorText.innerText = color
                ColorContainer.appendChild(colorText)
            }else{
                ColorContainer.style.opacity = 0.6;
                ColorContainer.innerText = color
            }
           
        }
        ColorContainer.onmouseout = ()=>{
            if(this.usage == "cosmetics"){
                ColorContainer.style.width = "36px"
                ColorContainer.style.height = "36px"
                ColorContainer.style.margin = "3px"
                ColorContainer.innerHTML = ""
            }
            else{
                 ColorContainer.style.opacity = 1;
                 ColorContainer.innerText = ""
            }
           
        }

        ColorContainer.onclick = function handlePush(){
            const entryButton = document.createElement('button')
            entryButton.style = 'width: 15px; height: 15px; margin:2px;float: left;margin-top:15px;'
            entryButton.onmouseover = ()=>{
                entryButton.style.width = '20px'
                entryButton.style.height = '20px'
                entryButton.style.marginTop = '12px'
            }
            entryButton.onmouseout = ()=>{
                entryButton.style.width = '15px'
                entryButton.style.height = '15px'
                entryButton.style.marginTop = '15px'
            }
            entryButton.style.backgroundColor = color
            entryButton.className = 'entry'
            paletteHeader.appendChild(entryButton)

            // lst is all colors in header
            const entries = paletteHeader.querySelectorAll('button.entry')
            let lst = Array.from(entries).map((i)=>{return i.style.backgroundColor})
            const mixedColor = _mix(lst)
            paletteMain.style.backgroundColor = mixedColor

            entryButton.onclick = function(){
                $(this).remove()
                const newentries = paletteHeader.querySelectorAll('button.entry')
                newlst = Array.from(newentries).map((i)=>{return i.style.backgroundColor})
                const mixedColor = _mix(newlst)
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
            }
        else if(paintset == "rgb"){
            this.addColor("#ff0000")
            this.addColor("#00ff00")
            this.addColor("#0000ff")
            }
        else if(paintset == "lipstick"){
                this.addColor("#972d2d")
                this.addColor("#9c2c43")
                this.addColor("#be8180")
                this.addColor("#f188b1")

                this.addColor("#db9c97")
                this.addColor("#af5152")
                this.addColor("#cc7379")
                this.addColor("#bd5d61")
            
        }
        else if(paintset == "pastel"){
                this.addColor("#f8faf8")
                this.addColor("#c2d6e1")
                this.addColor("#ece1db")
                this.addColor("#dad4d5")

                this.addColor("#62717e")
                this.addColor("#f2f9f8")
                this.addColor("#d58b21")
                this.addColor("#e7c98b")
                this.addColor("#898b55")

                this.addColor("#f0d58b")
                this.addColor("#dee9e7")
                this.addColor("#c5ddcc")
                this.addColor("#708874")
                this.addColor("#68867b")
            
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
            paletteMain.style.backgroundColor = "#D3D3D3";
            paletteMain.style.borderStyle = "Groove"
            paletteMain.style.borderRadius = "50%"
            paletteInfo.style.backgroundColor = "Black"
        }else if(theme == "dark"){
            paletteContainer.style.backgroundColor = "Black";
            paletteMain.style.backgroundColor = "#a9a9a9";
            paletteMain.style.borderRadius = "40%"
            paletteInfo.style.backgroundColor = "Black"
            paletteInfo.style.opacity = "0.75" 
        }

    }

}

function _calculateEachPercentage(lst){
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

function _mix(lst){
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

function _RGBToHex(rgb) {
    const r = parseInt(rgb.slice(4,-1).split(',')[0])
    const g = parseInt(rgb.slice(4,-1).split(',')[1])
    const b = parseInt(rgb.slice(4,-1).split(',')[2])
    let r_hex = r.toString(16);
    if(r_hex.length == 1){
        r_hex =  "0" + r_hex
    }
    let g_hex = g.toString(16);
    if(g_hex.length == 1){
        g_hex =  "0" + g_hex
    }
    let b_hex = b.toString(16);
    if(b_hex.length == 1){
        b_hex =  "0" + b_hex
    }
  return "#" +r_hex + g_hex + b_hex;
}

global.PaletteGenerator = global.PaletteGenerator || PaletteGenerator
})(window, window.document, $);


