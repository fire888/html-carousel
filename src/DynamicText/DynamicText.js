export default class DynamicText {
    constructor ( textSource, container ) {
        this.textData = [...textSource].map( item => item.replace(/./g, '<span class="hidden-letter">$&</span>') )
        this.textBlockContainer = container

        this.textBlock = document.createElement('div')
        this.textBlock.classList.add('news-item-text')
        this.textBlockContainer.appendChild(this.textBlock)

        this.textParts
    }


    calkulateTextParts () {
        return new Promise( resolve => {

            this.textParts = []

            let indexPart = 0
            this.textParts.push([])
            
            //console.log( this.textBlockContainer.offsetHeight )

            for (let i = 0; i < this.textData.length; i++) {
                
                this.textBlock.innerHTML += this.textData[ i ]

                if ( +this.textBlock.offsetHeight < this.textBlockContainer.offsetHeight - 20 ) {
                    this.textParts[ indexPart ] += this.textData[ i ]
                } else {
                    if ( this.textData[i] !== '<span class="hidden-letter"> </span>' ) {
                        this.textParts[ indexPart ] += this.textData[ i ]
                    } else {
                        this.textParts[ indexPart ] += '<span class="hidden-letter"> ...</span>'
                        
                        this.textBlock.innerHTML = this.textData[ i ]
                        this.textParts.push([])
                        indexPart ++
                        this.textParts[ indexPart ] += this.textData[ i ]				
                    }
                }		
            }
            this.textBlock.innerHTML = ''
            console.log('calculate')
            resolve()
        })
    }


    showLetters () {
        return new Promise ( resolve => {
            
            const showPart = indPart => {
                if ( !this.textParts[ indPart ] ) {
                    return  resolve()
                }
                this.textBlock.innerHTML = this.textParts[ indPart ]
                let text = this.textBlock.querySelectorAll('.hidden-letter')
                
                const showLetter = indLetter => {
                    if ( !text[ indLetter ] ) {
                        return this.letterTimeout = setTimeout( () => {
                            showPart( indPart + 1 )
                        }, 1000 )
                    }
                    
                    text[ indLetter ].style.opacity = 1
                    
                    return this.letterTimeout = setTimeout( () => {
                        showLetter( indLetter + 1 )
                    }, 0 )
                }
                
                showLetter( 0 )
            }
    
            showPart( 0 )
        } )
    }
    
    
    hideLetters () {
        if (this.letterTimeout) clearTimeout(this.letterTimeout)
        this.textBlock.innerHTML = ''
    }

    delete () {
        this.textData = null
        this.textBlockContainer.removeChild(this.textBlock)
        this.textBlockContainer = null
        this.textBlock.remove()
        this.textBlock = null
        if ( this.delayBeforeRecalc ) 
            clearTimeout( this.delayBeforeRecalc )
        this.textParts = null
    }
}