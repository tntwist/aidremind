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