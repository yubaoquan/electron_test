function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function nodeList2Array(nodes) {
    return [].slice.call(nodes);
}

function trim(str) {
    if (!str) {
        return false;
    }
    return str.trim();
}

function removeNode(node) {
    node.parentNode.removeChild(node);
}

export { random, nodeList2Array, trim, removeNode };
