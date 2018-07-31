/**
 * Created by lij on 2018/7/4.
 */
export function hasClass(el,className) {
  let reg=new RegExp('(^|\\s)'+className+'(\\s|$)');
  return reg.test(el.className);
}

export function addClass(el,className) {
  if(hasClass(el,className)){
    return ;
  }
  let newClass=el.className.split(' ');
  newClass.push(className);
  el.className=newClass.join(' ');
}

export function getData(el,name,val) {
  const prefix='data-';
  name=prefix+name;
  if(val){
    return $(el).attr(name,val)
  }
  else{
    return $(el).attr(name);
  }
}

let elementStyle=document.createElement('div').style;
let vendor=(()=>{
  let transforNames={
    webkit:'webkitTransform',
    Moz:'MozTransform',
    O:'OTransform',
    ms:'msTransform',
    standard:'transform'
  };

  for(let key in transforNames){
    if(elementStyle[transforNames[key]]!=undefined){
      return key
    }
  }

  return false;
})();

export function prefixStyle(style) {
  if(!vendor){
    return false;
  }
  if(vendor=='standard'){
    return style
  }

  return vendor+style.charAt(0).toUpperCase()+style.substr(1);
}


