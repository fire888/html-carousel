import DATA from './data'
import initUiChangerAnimations from './ui'
import NewsWiget from './NewsWiget/NewsWiget'

window.addEventListener('load', () => { 
    const newsWiget = new NewsWiget( DATA, document.querySelector('#canvas-wrapper2') )

    window.addEventListener( 'resize', () => newsWiget.resize(), false )
    initUiChangerAnimations({
        'One': () => newsWiget.playScenario( 'One' ),
        'Two': () => newsWiget.playScenario( 'Two' ),
        'Three': () => newsWiget.playScenario( 'Three' ),   
    }) 

    newsWiget.playScenario( 'One' )
})