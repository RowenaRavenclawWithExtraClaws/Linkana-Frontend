export const autocomplete = (textField, keywords) => {
  let currentFocus;

  textField.addEventListener("input", (e) => {
    let a, b;
    let val = textField.value;

    closeAllLists();

    if (!val) {
      return false;
    }

    currentFocus = -1;
    a = document.createElement("DIV");

    a.setAttribute("id", textField.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    textField.parentNode.appendChild(a);

    keywords.forEach((keyword) => {
      if (
        keyword.value.substr(0, val.length).toUpperCase() === val.toUpperCase()
      ) {
        b = document.createElement("DIV");
        b.innerHTML =
          "<strong>" + keyword.value.substr(0, val.length) + "</strong>";
        b.innerHTML += keyword.value.substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + keyword.value + "'>";

        b.addEventListener("click", (e) => {
          textField.value = e.originalTarget.innerText;
          closeAllLists();
        });

        a.appendChild(b);
      }
    });
  });

  textField.addEventListener("keydown", (e) => {
    let x = document.getElementById(textField.id + "autocomplete-list");

    if (x) x = x.getElementsByTagName("div");

    if (e.keyCode === 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode === 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  const addActive = (x) => {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  };

  const removeActive = (x) => {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  };

  const closeAllLists = (elmnt) => {
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== textField) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  };

  document.addEventListener("click", (e) => {
    closeAllLists(e.target);
  });
};
