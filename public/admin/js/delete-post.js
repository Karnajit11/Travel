let articlesBlock = document.querySelector('.articles');


articlesBlock.addEventListener('click', (e)=>{
    if(e.target.classList.contains('btn-remove')){
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:5000/posts/' + id,{
            method : 'DELETE'
        }).then((res) => res.text())
        .then(() => window.history.go());
    }
})