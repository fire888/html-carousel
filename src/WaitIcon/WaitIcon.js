import './waitIconStyle.css'

export default class WaitIcon {
    constructor () {
        this._mess = document.createElement('div')
        this._mess.className = 'wait-icon'
        this._mess.innerHTML = 'Wait ...'
    }

    appendTo(container) {
        this._container = container
        this._container.appendChild(this._mess)
    }

    remove() {
        return new Promise( resolve => {
            this._container.removeChild(this._mess)
            resolve()
        })
    }
}