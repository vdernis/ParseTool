function hasClass(el,cls) {
  return !!el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(el,cls) {
  if (!hasClass(el,cls)) el.className += " "+cls;
}

function removeClass(el,cls) {
  if (hasClass(el,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    el.className=el.className.replace(reg,'');
  }
}

function normalizeClassName(className){
    if(className != undefined && className != ""){
      return className.trim().replace(/\s\s+/g, ' ').replace(new RegExp(' ', 'g'), ".");
    }
}
function isInternal(el){
    return el.className.indexOf("pt-") > -1;
}

function isSelectable(el){
  if(el.nodeName == "BODY" || el.nodeName == "HTML") {
    return false;
  }

  return true;
}
function isClassValid(className){
    if (!className || className.trim().length === 0){
        return false;
    }
    return true;
}

export { hasClass, addClass, removeClass, normalizeClassName, isClassValid, isInternal, isSelectable }