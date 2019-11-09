export default class NewsItem {
    
    
    constructor ( data ) {
    
        this._DATA = data

        this.block = document.createElement('div')
        this.block.className = 'news-item'

        this._imgs = this._getPictSrcFromData( this._DATA )
        if (this._imgs[ 0 ]) {
            this.block.appendChild( this._imgs[ 0 ] )
        }

        let dateData = new Date( this._DATA[ 'date' ] * 1000 )
        this._dateString = `${dateData.getDay()}.${dateData.getMonth()-1}.${dateData.getFullYear()}`
        this._date = document.createElement('div')
        this._date.className = 'news-item-date'
        this._date.innerHTML = this._dateString  
        this.block.appendChild( this._date )

        this._textString = this._DATA[ 'text' ]
        this._text = document.createElement('div')
        this._text.className = 'news-item-text' 
        this._text.innerHTML = this._textString
        this.block.appendChild( this._text )

        this._textParts = []
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
} 