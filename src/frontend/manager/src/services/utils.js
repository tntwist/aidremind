/**
 * TreeNode handles tree like behavior 
 */
class TreeNode {
    constructor(item = null) {
        this.children = [];
        this.item = item;
        this.parent = null;
    }

    setParent(parent) {
        this.parent = parent;
    }

    addChild(child) {
        this.children.push(child);
        child.setParent(this);
    }

    isRoot() {
        return !!this.parent;
    }
}

/**
 * 
 * @param {Array} list 
 */
export function generateTree(list) {
    const rootNode = new TreeNode();
    const map = {};

    const KEY_ID = 'id'
    const KEY_PARENT_ID = 'parentId'
    
    // create map index
    list.forEach(item => map[item[KEY_ID]] = new TreeNode(item));

    // create tree associations
    Object.values(map).forEach(node => {
        const parentId = node.item[KEY_PARENT_ID];
        if (parentId === null) {
            rootNode.addChild(node);
            return;
        }

        const parentNode = map[parentId];

        if (!parentNode) {
            console.log('[ generateTree ]: Parent could not be found');
            return;
        }

        parentNode.addChild(node);
    });

    return rootNode;
}

export const frequencyOptions = [
    { value: '*/10 * * * *', label: 'Alle 10min' },
    { value: '*/15 * * * *', label: 'Alle 15min' },
    { value: '*/30 * * * *', label: 'Alle 30min ' },
    { value: '* */1 * * *', label: 'Jede volle Stunde' },
    { value: '* */2 * * *', label: 'Alle 2 Stunden' },
    { value: '* */3 * * *', label: 'Alle 3 Stunden' },
    { value: '* */4 * * *', label: 'Alle 4 Stunden' },
    { value: '* */8 * * *', label: 'Alle 8 Stunden' },
    { value: '* * */1 * *', label: 'Jeden Tag' },
    { value: '* * */2 * *', label: 'Alle 2 Tage' },
    { value: '* * */3 * *', label: 'Alle 3 Tage' },
    { value: '* * */4 * *', label: 'Alle 4 Tage' },
    { value: '* * */5 * *', label: 'Alle 5 Tage' },
    { value: '* * */6 * *', label: 'Alle 6 Tage' },
    { value: '* * */7 * *', label: 'Alle 7 Tage' },
];

export function getFrequencyLabel(frequencyValue) {
    const frequency = frequencyOptions.find(f => f.value === frequencyValue);
    return frequency ? frequency.label : null;
}