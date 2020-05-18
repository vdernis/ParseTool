import { normalizeClassName, isClassValid } from './class';

function cssPath(el, depth=50) {
    if (!(el instanceof Element)) 
        return;
    var path = [];
    var iter = 0;
    

    while (el.nodeType === Node.ELEMENT_NODE) {
        var selector = el.nodeName.toLowerCase();
        if(el.className && typeof el.className === "string"){
            var className = normalizeClassName(el.className);
            if(isClassValid(className)){
                selector += '.' + className;
            }
            
        }
        if(iter == 0){
            var sib = el, nth = 1;
            while (sib = sib.previousElementSibling) {
                if (sib.nodeName.toLowerCase() == selector)
                   nth++;
            }
            if (nth != 1)
                selector += ":nth-of-type("+nth+")";
            else {
                var sib = el, nth = 1;
                while (sib = sib.nextElementSibling) {
                    if (sib.nodeName.toLowerCase() == selector)
                       nth++;
                }
                if (nth != 1)
                    selector += ":nth-of-type(1)";
            }

        }
        path.unshift(selector);
        el = el.parentNode;

        if(depth == iter){
            break;
        }
        iter++;

    }

    return path.join(" > ");

}

export { cssPath }
