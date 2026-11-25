// Implement a function that replicates the behavior of the instanceof operator by manually traversing the prototype chain.


function CustomeInstanceOf(obj, Constructor) {

    if (typeof Constructor !== 'function') {
        throw new TypeError(
            'Right hand side of instanceof not callable'
        );
    }

    if (
        obj === null ||
        (typeof obj !== 'object' && typeof obj !== 'function')
    ) {
        return false;
    }

    let target = Constructor.prototype;

    if (
        target === null ||
        (typeof target !== 'object' && typeof target !== 'function')
    ) {
        throw new TypeError(
            "Function has non-object prototype in instanceof check"
        );
    }

    let proto = Object.getPrototypeOf(obj);

    while (proto !== null) {

        if (proto === target) {
            return true;
        }

        proto = Object.getPrototypeOf(proto);
    }

    return false;
}