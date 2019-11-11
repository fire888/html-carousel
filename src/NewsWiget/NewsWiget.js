import './newsWigetStyle.css'
import NewsItem from './NewsItem.js'  
import WaitIcon from '../WaitIcon/WaitIcon' 


export default class NewsWiget {
    constructor ( DATA, container ) {
        this.domElement = document.createElement('div')
        this.domElement.className = 'news-wiget'
        this.container = container
        this.container.appendChild( this.domElement )

        this._newsData = DATA
        this._blocks

        this._waitIcon = new WaitIcon()
        this._waitIcon.appendTo( this.container )

        this._createBlocks()
            .then(this._delay)
            .then(this._resizeBlocks.bind(this))
            .then(this._waitIcon.remove.bind(this._waitIcon))
            .then(this._blocks[0].showLetters.bind(this._blocks[0]))
    }

    //////////////////////////////////////

    _createBlocks() {
        return new Promise(resolve => {
            console.log( 'wiget: createBlocks' )
            this._blocks = this._newsData.response.items.map(  
                item => new NewsItem( item, this.domElement) ) 
            resolve()
        })
    }



    _resizeBlocks () {
        return new Promise( resolve => {
            console.log( 'wiget: before-resizeBlocks' )
            const arrItemsResize = this._blocks.map( item => item.resize() )
            Promise.all( arrItemsResize )
                .then( () => { 
                    console.log('wiget: after-resizeBlocks')
                    resolve() 
                } )
        }) 

    }


    _delay (val) {
        return new Promise( resolve => {
            setTimeout(() => { 
                console.log( 'delay', 2000 )
                resolve() 
            }, 2000)
        })
    }

    resize() {
        
    }

    playScenario ( id ) {

    }

    stop ()  {

    }

    delete () {

    }
 }