import tabBlock from './block'
import tabComponent from './component'
import './tabs.scss'


export const CONSTANTS = {
    CONTAINER: 'css-tabs-container',
    INPUT: 'css-tab-input',
    LABEL: 'css-tab-label',
    CONTENT: 'css-tab-content',
}

export const makeid = () => {
    return String(Math.random()*Math.random())
}

export default function (e, c) {
    tabBlock(e,c);
    tabComponent(e,c);

}