const { createElement } = require("react");

async function getChars(){
    try{
    const response = await fetch("http://127.0.0.1:8000/api");
    const data = await response.json();

    let output = ""

    data.forEach(char => {
        output += `${char.name} (${char.strength}) (${char.health})\n`;
    })
    document.getElementById("api-response").innerText = output
    // document.getElementById("api-response").innerText = `Done! Your char stats are: ${data.name}, ${data.strength}, ${data.health}`

    } catch(error){
        document.getElementById("api-response").innerText = `Error`;
    }
}

async function getChar(id1 = 1){
    try{
    const response = await fetch(`http://127.0.0.1:8000/api/get/${id1}/`);
    const data = await response.json();

    let p = document.createElement("p");
    p.innerText = `${data.name} (${data.strength}) (${data.health})\n`;

    const res = document.getElementById("result");
    res.appendChild(p);

    } catch(error){
        document.getElementById("api-response-2").innerText = `Error`;
    }
}



async function fight(){
    let input1 = document.getElementById("num1")
    let input2 = document.getElementById("num2")

    try{
        const response = await fetch(`http://127.0.0.1:8000/api/fight/${input1.value}/${input2.value}`);

        const data = await response.json();
    }catch(error){
        document.getElementById("api-response-2").innerText = "Attack failed to reach server.";
    }

    getChar(input1.value);
    getChar(input2.value);


    input1.value = "";
    input2.value = "";
}