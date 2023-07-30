window.addEventListener("DOMContentLoaded", (event) => {
  const heading = document.getElementById("heading");
  const pwd = document.getElementById("pwd");
  heading.innerText =
    "Microsoft Windows [Version 10.0.19045.3086]\n(c) Microsoft Corporation. All rights reserved.";

  pwd.innerText = "hi bro:";
});

document.addEventListener("keyup", function (event) {
  if (event.target.matches("#input") && event.key === "Enter") {
    const command = event.target.value;
    if (command === "cls") {
      const elements = document.querySelectorAll(
        "pre#heading, pre#pwd, pre#preinput, pre#output, input#input"
      );
      for (let i = 0; i < elements.length; i++) {
        elements[i].remove();
      }
    }
    $.ajax({
      url: "http://127.0.0.1:5000/cmdProc",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        data: command,
      }),
      success: function (res) {
        // debugger;
        let divElement = document.getElementById("cli");
        if (res != "\f") {
          //removing input element below
          let inputElem = document.getElementById("input");
          inputElem.remove();
          //fetching preinput element and adding command to it
          let preInput = document.createElement("pre");
          preInput.setAttribute("id", "preinput");
          divElement.appendChild(preInput);
          preInput.innerText += command;
          //creating pre element & adding output to it
          let output = document.createElement("pre");
          output.setAttribute("id", "output");
          divElement.appendChild(output);
          output.innerText += res + "\n";
        }
        //creating pre element & adding starting word to it wich is hardcoded
        let pre = document.createElement("pre");
        pre.setAttribute("id", "pwd");
        pre.innerText = "hi bro:";
        divElement.appendChild(pre);
        //creating text input here
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "input");
        input.autofocus = true;
        divElement.appendChild(input);
      },
      error: function (err) {
        alert("unable to load please try again");
        console.log(err);
      },
    });
  }
});
