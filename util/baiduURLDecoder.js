const map1 = {
    '_z2C\\$q': ':',
    '_z&e3B': '.',
    AzdH3F: '/',
};

const map2 = {
    w: 'a',
    k: 'b',
    v: 'c',
    1: 'd',
    j: 'e',
    u: 'f',
    2: 'g',
    i: 'h',
    t: 'i',
    3: 'j',
    h: 'k',
    s: 'l',
    4: 'm',
    g: 'n',
    5: 'o',
    r: 'p',
    q: 'q',
    6: 'r',
    f: 's',
    p: 't',
    7: 'u',
    e: 'v',
    o: 'w',
    8: '1',
    d: '2',
    n: '3',
    9: '4',
    c: '5',
    m: '6',
    0: '7',
    b: '8',
    l: '9',
    a: '0',
};

function decode(str) {
    const decodedLetters = [];
    for (const key in map1) {
        const reg = new RegExp(key, 'g');
        str = str.replace(reg, map1[key]);
    }
    for (let i = 0; i < str.length; i++) {
        const val = map2[str[i]] || str[i];
        decodedLetters.push(val);
    }
    const result = decodedLetters.join('');
    return result;
}

export default decode;
