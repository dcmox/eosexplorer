class Page {
    constructor(def){
        Object.keys(def).forEach((k) => {
            let v = def[k]
            return Object.defineProperty(this, k, {
                get() {
                    let ret = $(v)
                    ret.selector = v
                    return ret
                },
                enumerable: true,
            })
        })
    }
}

module.exports = Page