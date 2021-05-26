let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then(resp=>resp.json())
  .then(data=> {
    data.forEach(renderCard)})
  .catch(error=>console.error("error:", error))


  const renderCard= toy=> {
    const div=document.createElement("div")
    div.className="card"
    const h2=document.createElement("h2")
    const img=document.createElement("img")
    const p=document.createElement("p")
    const button=document.createElement("button")
    h2.innerText=toy.name
    img.className="toy-avatar"
    img.src=toy.image
    p.innerText=toy.likes+" Likes"
    button.className="like-btn"
    button.id=toy.id
    button.innerText="Like"
    div.append(h2,img,p,button)
    const collection=document.getElementById("toy-collection")
    collection.append(div)
    button.addEventListener("click",()=> {
      toy.likes++;
      p.innerText=toy.likes+" Likes"
      patchToy(toy);
    })

  }

const patchToy=(toy)=> {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({"likes":toy.likes++})
  }).then(res=>res.json)
}

const postToy= (toy)=>{
  fetch("http://localhost:3000/toys", {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  }).then(res=> res.json())
}

const handleSubmit=(e)=> {
  e.preventDefault()
  let toyObject= {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0
  }
  renderCard(toyObject)
  postToy(toyObject)
}
document.querySelector('form').addEventListener("submit", handleSubmit)














})






