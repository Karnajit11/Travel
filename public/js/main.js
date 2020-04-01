let callUsForm = document.querySelector('.call-us-form');

document.addEventListener('DOMContentLoaded', async function(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML ='';
    posts.forEach((post) =>{
        let postHTML = `
        <div class="col-4">
            <div class="card">
                <img src="${post.imageURL}" alt="${post.title}" class="card-img-top">
                <div class="card-body">
                    <h3 class="card-title">${post.title}</h3>
                    <p class="card-text">${post.description}</p>
                    <a href="/sight?id=${post.id} " class="btn btn-info">Details</a>
                </div>
            </div>
         </div>`;
        articles.insertAdjacentHTML('beforeend',postHTML);
    })
});


callUsForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let phoneInp = callUsForm.querySelector('input');
    fetch('http://localhost:5000/callback-requests',{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ 
            phoneNumber : phoneInp.value
        })
    }).then((res) => res.text()).then(()=> alert('We will call You back as soon as possible!.. '));
})