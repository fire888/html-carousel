import './newsWigetStyle.css'
import NewsItem from './NewsItem.js'   


export default class NewsWiget {
    constructor ( DATA, container ) {
        this.domElement = document.createElement('div')
        this.domElement.className = 'news-wiget'
        this.container = container
        this.container.appendChild( this.domElement )


        this._newsData = DATA
        this._blocks = this._newsData.response.items.map(  
            item => new NewsItem( item, this.domElement) ) 


        // TODO: ADD PROMISE LOAD IMAGES THEN CALCULATE 
            
        setTimeout( () => {
            this._blocks[ 0 ].resize()
            .then( () => {
                console.log('wiget: after-resize') 
                this._blocks[0].showLetters() 
            } )
        }, 2000 )    
    }

    //////////////////////////////////////

    //resize () {
    //    const arrItemsResize = this._blocks.map( item => item.resize )
    //    return Promise.all( arrItemsResize )
    //}

    playScenario ( id ) {

    }

    stop ()  {

    }

    delete () {

    }
 }