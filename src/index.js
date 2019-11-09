import DATA from './data'
import initUiChangerAnimations from './ui'
import NewsWiget from './NewsWiget/NewsWiget'

const newsWiget = new NewsWiget()
newsWiget.createBlocksFromData( DATA ) 
const wrapperNews = document.querySelector('#canvas-wrapper2')
wrapperNews.appendChild( newsWiget.domElement )


window.addEventListener( 'resize', () => newsWiget.resize(), false )
initUiChangerAnimations({
    'One': () => newsWiget.playScenario( 'One' ),
    'Two': () => newsWiget.playScenario( 'Two' ),
    'Three': () => newsWiget.playScenario( 'Three' ),   
}) 

newsWiget.playScenario( 'One' )