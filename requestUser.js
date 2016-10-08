'use strict';
let MODULO = ((window, document, undefined) => {
  // selector
  const $ = document.querySelector.bind(document);
  // template
  const template = $("#userProfile").innerHTML;

  const get = (url) => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = () => {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(Error(req.text.status))
        }
      };
      req.onerror = () => {
        reject(Error("Falhou"));
      };
      req.send();
    });
  };

  let requestUser = (url, user, cb) => {
    get(url += user).then(cb);
  };

  let getDadosUser = (data) => {
    const dados = JSON.parse(data);
    render(dados);
  };

  let render = (data) => {
    const el = $(".resultado");
    let str = "";

    str = template.replace(/{{nameUser}}/gi, `${data['name']}`)
      .replace(/{{loginUser}}/gi, `${data['login']}`)
      .replace(/{{urlUser}}/gi, `${data['html_url']}`)
      .replace(/{{emailUser}}/gi, `${data['email']}`)
      .replace(/{{imgUser}}/gi, `${data['avatar_url']}`)
    el.innerHTML = str;

  };

  let view = () => {
    let form = $(".formulario");
    let input = form.querySelector("input[type=search]");

    input.addEventListener("change", (e) => {
      let val = e.target.value;
      requestUser('https://api.github.com/users/', val, getDadosUser);
    });

    // cancel event submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      return false;
    });
  }

  const init = () => {
    view();
  };

  return {
    iniciar: init
  }

})(window, document, undefined);

MODULO.iniciar();
