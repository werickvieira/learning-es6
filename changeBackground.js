"use strict";
const APP = (( window, document, undefined ) => {

  class View {
    constructor( options ){
      this._app  = options.elemento;
      this._body = document.body;
      this._hexa = "";
      this._hora = "";
      this._clearTime = "";
    };
    
    // Gera o Hexadecimal e a hora
    gerador(){
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
    
    // Set Hexa
    setHexa( valor ) {
      this._hexa = valor;
    };
    
    // Set Hora
    setHora( valor ){
      this._hora = valor;
    };
    
    // Get Hexa 
    getHexa(){
     return this._hexa;
    };
    
    // Get Hora
    getHora(){
     return this._hora;
    };
    
    // Render Elementos
    render(){
      this.gerador();
      this._app.innerHTML = this.getHora();
      this._body.style.background = this.getHexa();
      this._clearTime = setTimeout(this.render.bind(this), 1000 );
    };
    
    // Eventos da View 
    events(){
      this._app.addEventListener("mouseover", () => {
        clearTimeout( this._clearTime );
      });

      this._app.addEventListener("mouseout", () => {
        this._clearTime = setTimeout( this.render.bind(this), 1000 ); 
      });
    };    
    
    // Iniciar 
    start(){
      this.render();
      this.events();
    }

  };

  const init = () => {
    const $ = document.querySelector.bind(document);
    let elemento = $(".app");
    let newObj = new View({ elemento });
    newObj.start();
  };

  return {
    iniciar : init   
  };

})( window, document, undefined );

APP.iniciar();
