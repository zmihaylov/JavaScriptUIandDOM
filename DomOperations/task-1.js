module.exports = function () {
    //contents is arr
 
    var validator = {
        validateElement: function (element) {
            if (typeof element !== 'string' && (!(element instanceof HTMLElement))) {
                throw new Error('First parameter is neither a string or a DOM element');
            }
 
        },
        validateContents: function (contents) {
            if (!(Array.isArray(contents))) {
                throw new Error('Contents is not an array');
            }
 
            for (var i = 0; i < contents.length; i++) {
                var content = contents[i];
 
                if (typeof content !== 'number' && typeof content !== 'string'){
                    throw new Error('Any of the contents is not number or string');
                }
            }
        },
        validateSelectedID: function (id){
            var element = document.getElementById(id);
 
            if (element === null){
                throw new Error('No element contains this id in the html page');
            }
        }
    };
 
    return function (element, contents) {
        var documentFragment,
            length,
            i;
 
        if (arguments.length !== 2){
            throw new Error('function arguments are invalid');
        }
 
        validator.validateElement(element);
 
        if (typeof element === 'string'){
            validator.validateSelectedID(element);
            element = document.getElementById(element);
        }
 
        validator.validateContents(contents);
        element.innerHTML = '';
        documentFragment = document.createDocumentFragment();
        length = contents.length;
 
        for (i = 0; i < length; i += 1) {
            var div = document.createElement('div');
            div.innerHTML = contents[i];
            documentFragment.appendChild(div);
        }
 
        element.appendChild(documentFragment);
    };
};