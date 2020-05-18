export const getDataList = (document, path) => {
    let dataList = [];
    document.querySelectorAll(path).forEach(function(el, index){
        
        let dataItem = {textContent: el.textContent}
        if(el.hasAttribute("src")){
            dataItem.src = el.getAttribute("src");
        }
        if(el.hasAttribute("alt")){
            dataItem.alt = el.getAttribute("alt");
        }
        if(el.hasAttribute("href")){
            let href = new URL(el.getAttribute("href"), document.baseURI).href
            dataItem.href=href;
        }
        if(el.hasAttribute("title")){
            dataItem.title = el.getAttribute("title")
        }
        if(el.hasAttribute("class")){
            dataItem.className = el.getAttribute("class");
        }
        if(el.hasAttribute("id")){
            dataItem.id = el.getAttribute("id");
        }
        dataList.push(dataItem);
    });

    return dataList;
}