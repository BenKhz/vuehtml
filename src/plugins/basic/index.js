export default function (e,c) {
    const blocks = [
        {
            label: 'Box',
            category: 'Basic',
            media: '<span class="fa fa-check"></span>',
            content: `<div style="min-height: 50px; border: 1px solid red; padding:1rem"></div>`,
        },
        {
            label: 'Button',
            category: 'Basic',
            media: '<span class="fa fa-check"></span>',
            content: `<button style="min-height: 50px; border: 1px solid red; padding:1rem">Button text</button>`,
        },
        
    ]


    for(let block of blocks) {
        e.BlockManager.add(block.label, block)
    }
    
}