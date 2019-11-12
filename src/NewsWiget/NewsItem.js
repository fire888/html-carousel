import DynamicText from '../DynamicText/DynamicText'

export default class NewsItem {
    
    constructor ( data, container ) {
    
        this._DATA = data
        this.container = container

        this.block = document.createElement('div')
        this.block.className = 'news-item'

        /*this._imgsContainer = null
        this._imgs = this._getPictSrcFromData(this._DATA)
        if (this._imgs.length > 0) {
            this._imgsContainer = document.createElement('div')
            this._imgsContainer.className = 'imgs-container'
            this.block.appendChild(this._imgsContainer)
            this._imgsContainer.appendChild(this._imgs[ 0 ])
        }*/

        let dateData = new Date( this._DATA[ 'date' ] * 1000 )
        this._dateString = `${dateData.getDay()}.${dateData.getMonth()-1}.${dateData.getFullYear()}`
        this._date = document.createElement('div')
        this._date.className = 'news-item-date'
        this._date.innerHTML = this._dateString  
        this.block.appendChild( this._date )

        this._textString = this._DATA[ 'text' ]
        this._text = document.createElement('div')
        this._text.className = 'news-item-text' 
        this.block.appendChild( this._text )

        this.container.appendChild( this.block )

        this.dynamicText = new DynamicText(this._textString, this._text)
        console.log('item: create')
    }

    _getPictSrcFromData( data ) {
        if (!data['attachments'] || !data['attachments'].length) {
            return [];
        }
        const arrSrc = []
        for (let i = 0; i < data['attachments'].length; i++) {
            if (data['attachments'][i]['type'] === 'photo' &&  
                data['attachments'][i]['photo']['photo_604']) {    
                arrSrc.push(data['attachments'][i]['photo']['photo_604'])
            }
        }
        if ( !arrSrc.length ) {
            return [];
        }
        const arrImgs = [] 
        for (let i = 0; i < arrSrc.length; i++ ) {
            const img = document.createElement('img')
            img.src = arrSrc[ i ]
            arrImgs.push( img )
        }
        return arrImgs
    }


    resize () { 
        return new Promise ( (resolve, reject) => { 
           console.log('item: resize')
           this.dynamicText.calkulateTextParts() 
                .then( (err) => {
                    console.log( 'item: after-calculate')            
                    if (err) { 
                        console.log('--err')
                        reject()
                    } else { 
                        console.log( '--done')
                        resolve()
                    } 
                } )
        })
    }


    stopAnimation () {
        console.log( 'item: stopAnimation' )
        if (this.dynamicText) this.dynamicText.stopAnimation()
    }


    showLetters() {
        this.dynamicText.showLetters()
    }
} 