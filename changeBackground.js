"use strict";
const APP = (( window, document, undefined ) => {
 
 class View {
  constructor( options ){
   this._app  = options.elemento;
   this._body = document.body;
   this._hexa = "";
   this._hora = "";
  };
   
  start(){
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    
    let hor = ( h < 10 ? "0"+h.toString() : h.toString() );
    let min = ( m < 10 ? "0"+m.toString() : m.toString() );
    let sec = ( s < 10 ? "0"+s.toString() : s.toString() );  
    
    let hexa = "#" + hor + min + sec;
    let hora = hor+":"+min+":"+sec;
    
    this.setHexa( hexa );
    this.setHora( hora );
    
  };
   
  setHexa( valor ) {
    this._hexa = valor;
  };
   
  setHora( valor ){
    this._hora = valor;
  };
  
  render(){
    this.start();
    this._app.innerHTML = this._hora;
    this._body.style.background = this._hexa;
    this.events( this.render );
  };
   
  events( fun ){
     let time = setTimeout( fun.bind(this), 1000);
    
     this._app.addEventListener("mouseover", () => {
       clearTimeout( time );
     });

     this._app.addEventListener("mouseout", () => {
      time = setTimeout( fun.bind(this), 1000);
     });
  };    
   
 };
  
 const init = () => {
  const $ = document.querySelector.bind(document);
  let elemento = $(".app");
  let newObj = new View({ elemento });
  newObj.render();
 };

 return {
   iniciar : init   
 };

})( window, document, undefined );

APP.iniciar();
