if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
window.addEventListener("DOMContentLoaded", () => {
    commonInit();
});
window.addEventListener("load", () => {
});
$(function(){
 
});


/**
   * device check
   */
function commonInit() {
	let touchstart = "ontouchstart" in window;
	let userAgent = navigator.userAgent.toLowerCase();
	if (touchstart) {
		browserAdd("touchmode");
	}
	if (userAgent.indexOf("samsung") > -1) {
		browserAdd("samsung");
	}

	if (
		navigator.platform.indexOf("Win") > -1 ||
		navigator.platform.indexOf("win") > -1
	) {
		browserAdd("window");
	}

	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
		// iPad or iPhone
		browserAdd("ios");
	}

	function browserAdd(opt) {
		document.querySelector("html").classList.add(opt);
	}
}





/* popup */
class DesignPopup {
    constructor (option){
      // variable
      this.option = option;
      this.selector = document.querySelector(this.option.selector);
      this.popup_box_item = this.selector.querySelector(".popup_box_item");
      if (!this.selector) {
        return;
      }

      this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
      this.domHtml = document.querySelector("html");
      this.domBody = document.querySelector("body");
      this.pagewrap = document.querySelector(".page_wrap");
      this.layer_wrap_parent = null;
      this.btn_closeTrigger = null;
      this.scrollValue = 0;
      
      // init
      const popupGroupCreate = document.createElement("div");
      popupGroupCreate.classList.add("layer_wrap_parent");
      if (!this.layer_wrap_parent && !document.querySelector(".layer_wrap_parent")) {
        this.pagewrap.append(popupGroupCreate);
      }
      this.layer_wrap_parent = document.querySelector(".layer_wrap_parent");


      // event
      this.btn_close = this.selector.querySelectorAll(".btn_popup_close");
      this.bg_design_popup = this.selector.querySelector(".bg_dim");
      let closeItemArray = [...this.btn_close];
      if (!!this.selector.querySelectorAll(".close_trigger")) {
        this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
        closeItemArray.push(...this.btn_closeTrigger);
      }
      if (closeItemArray.length) {
        closeItemArray.forEach((element) => {
          element.addEventListener("click", (e) => {
              e.preventDefault();
              this.popupHide(this.selector);
            },false);
        });
      }
    }
    dimCheck(){
      const popupActive = document.querySelectorAll(".popup_wrap.active");
      if (!!popupActive[0]) {
        popupActive[0].classList.add("active_first");
      }
      if (popupActive.length > 1) {
        this.layer_wrap_parent.classList.add("has_active_multi");
      } else {
        this.layer_wrap_parent.classList.remove("has_active_multi");
      }
    }
    popupShow(){
      this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
      if (this.selector == null) { return; }
      this.domHtml.classList.add("touchDis");
      this.selector.classList.add("active");
      /* if(!!this.popup_box_item){
        this.popup_box_item.setAttribute("tabindex","0");
      }
       */
      setTimeout(() => {
        this.selector.classList.add("motion_end");
        // setTabControl(this.selector);
      }, 30);
      if ("beforeCallback" in this.option) {
        this.option.beforeCallback();
      }
      if ("callback" in this.option) {
        this.option.callback();
      }
      if (!!this.design_popup_wrap_active) {
        this.design_popup_wrap_active.forEach((element, index) => {
          if (this.design_popup_wrap_active !== this.selector) {
            element.classList.remove("active");
          }
        });
      }
      this.layer_wrap_parent.append(this.selector);
      this.dimCheck();
    }
    popupHide(){
      let target = this.option.selector;
      if (!!target) {
        this.selector.classList.remove("motion");
        if ("beforeClose" in this.option) {
          this.option.beforeClose();
        }
        //remove
        this.selector.classList.remove("motion_end");
        if(!!this.popup_box_item){
          this.popup_box_item.removeAttribute("tabIndex");
        }
        setTimeout(() => {
          this.selector.classList.remove("active");
        }, 400);
        this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
        this.dimCheck();
        if ("closeCallback" in this.option) {
          this.option.closeCallback();
        }
        if (this.design_popup_wrap_active.length == 1) {
          this.domHtml.classList.remove("touchDis");
        }
      }
    }
  }


  function designModal(option){
    const modalGroupCreate = document.createElement("div");
    let domHtml = document.querySelector("html");
    let design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
    let modal_wrap_parent = null;
    let modal_item = null;
    let pagewrap = document.querySelector(".page_wrap");
    let showNum = 0;
    modalGroupCreate.classList.add("modal_wrap_parent");

    if (!modal_wrap_parent && !document.querySelector(".modal_wrap_parent")) {
      pagewrap.append(modalGroupCreate);
    }else{
      modalGroupCreate.remove();
    }
    modal_wrap_parent = document.querySelector(".modal_wrap_parent");

    let btnHTML = ``;

    if(option.modaltype === "confirm"){
      btnHTML = `
        <a href="#" class="btn_modal_submit primary cancelcall"><span class="btn_modal_submit_text">취소</span></a>
        <a href="#" class="btn_modal_submit primary okcall"><span class="btn_modal_submit_text">확인</span></a>
      `;
    }else{
      btnHTML = `
        <a href="#" class="btn_modal_submit primary okcall"><span class="btn_modal_submit_text">확인</span></a>
      `;
    }

    let modal_template = `
      <div class="modal_wrap">
          <div class="bg_dim"></div>
          <div class="modal_box_tb">
              <div class="modal_box_td">
                  <div class="modal_box_item">
                      <div class="modal_box_message_row">
                          <p class="modal_box_message">${option.message}</p>
                      </div>
                      <div class="btn_modal_submit_wrap">
                          ${btnHTML}
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `;
    modal_wrap_parent.innerHTML = modal_template;
    modal_item = modal_wrap_parent.querySelector(".modal_wrap");
    modal_item.classList.add("active");
    if(showNum){clearTimeout(showNum);}
    showNum = setTimeout(()=>{
      modal_item.classList.add("motion_end");
      modal_item.addEventListener("transitionend",(e)=>{
        if(e.currentTarget.classList.contains("motion_end")){
          if(option.showCallback){
            option.showCallback();
          }
        }
      });
    },10);

    let btn_modal_submit = modal_item.querySelectorAll(".btn_modal_submit");
    if(!!btn_modal_submit){
      btn_modal_submit.forEach((item)=>{
        let eventIs = false;
        if(eventIs){
          item.removeEventListener("click");
        }
        item.addEventListener("click",(e)=>{
          let thisTarget = e.currentTarget;
          closeAction();
          if(thisTarget.classList.contains("okcall")){
            if(option.okcallback){
              option.okcallback();
            }
          }else if(thisTarget.classList.contains("cancelcall")){
            if(option.cancelcallback){
              option.cancelcallback();
            }
          }
          eventIs = true;
        });
      });
    }

    function closeAction(){
      let actionNum = 0;
      modal_item.classList.remove("motion_end");
      if (design_popup_wrap_active.length === 0) {
        domHtml.classList.remove("touchDis");
      }
      if(actionNum){clearTimeout(actionNum);}
      actionNum = setTimeout(()=>{
        modal_item.classList.remove("active");
        modal_item.remove();
      },500);
    }
  }