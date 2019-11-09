import './newsWigetStyle.css'
import NewsItem from './NewsItem.js'   


export default class NewsWiget {
    constructor () {
        this.domElement = document.createElement('div')
        this.domElement.className = 'news-wiget'

        this._newsData = null
        this.blocks = []
    }

    createBlocksFromData ( DATA ) {
        this._newsData = DATA
        this._blocks = this._newsData.response.items.map(  
            item => new NewsItem( item) ) 
        this._blocks.forEach( item => {
            this.domElement.appendChild( item.block )
        })
     }

    //////////////////////////////////////

    resize () {

    }

    playScenario ( id ) {

    }

    stop ()  {

    }

    delete () {

    }
 }