import './newsWigetStyle.css'
import NewsItem from './NewsItem.js'  
import WaitIcon from '../WaitIcon/WaitIcon' 


// TODO: REJECT INIT PROMISE  

export default class NewsWiget {
    constructor ( DATA, container ) {
        this.domElement = document.createElement('div')
        this.domElement.className = 'news-wiget'
        this.container = container
        this.container.appendChild( this.domElement )

        this._newsData = DATA
        this._blocks

        this._waitIcon = new WaitIcon()

        this._delayTimeout = null
        this._currentPromise = null

        this._currentPromise = this._waitIcon.appendTo(this.container)
            .then(
                () => { this._currentPromise = this._createBlocks() }, 
                () => { this._currentPromise = null } 
            )
            .then( 
                () => {this._currentPromise = this._delay()},
                () => {this._currentPromise = null}
            )
            .then( 
                () => {this._currentPromise = this._resizeBlocks()},
                () => {this._currentPromise = null}
            )
            .then( 
                () => {
                    console.log('removeIcon')
                    this._currentPromise = this._waitIcon.remove()
                },
                () => {this._currentPromise = null}
            )
            .then( 
                () => {this._currentPromise = this._blocks[0].showLetters()},
                () => {this._currentPromise = null}
            )

        setTimeout(this.resize.bind(this) ,100)
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

    
    resize() {
        this._currentPromise ? this._currentPromise.reject() : null
        console.log('!!! REJECT ')

        this._waitIcon.appendTo( this.container )
        this._currentPromise = this._stopAnimation()
            .then(this._currentPromise = this._delay.bind(this))
            .then(this._currentPromise = this._resizeBlocks.bind(this))
            .then(this._currentPromise = this._waitIcon.remove.bind(this._waitIcon))
            .then(this._currentPromise = this._blocks[0].showLetters.bind(this._blocks[0]))
    }

    _resizeBlocks () {
        return new Promise( resolve => {
            console.log( 'wiget: before-resizeBlocks' )
            const arrItemsResize = this._blocks.map( item => item.resize() )
            Promise.all( arrItemsResize )
                .then(() => { 
                    console.log('wiget: after-resizeBlocks')
                    resolve() 
                })
        }) 

    }


    _delay (val) {
        if (this._delayTimeout) {
            this._delayTimeout = null
        }
        return new Promise( (resolve) => {
            this._delayTimeout = setTimeout(() => { 
                console.log( 'delay', 2000 )
                resolve() 
            }, 2000)
        })
    }


    playScenario ( id ) {

    }


    _stopAnimation ()  {
        return new Promise( resolve => {
            console.log('wiget: _stopAnimation')
            this._blocks.forEach(element => element.stopAnimation())
            console.log('wiget: _stopAnimation - stop')
            resolve()
        })
    }

    delete () {

    }
 }