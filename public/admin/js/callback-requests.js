async function getCallbackRequests(){
    return await fetch('http://localhost:5000/callback-requests')
                                    .then((response) => response.json())
                                    .then((data) => data);
}



let requestsBlock = document.querySelector('#v-pills-callback');


requestsBlock.addEventListener('click', (e)=>{
    if(e.target.classList.contains('btn-remove')){
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:5000/callback-requests/' + id,{
            method : 'DELETE'
        }).then((res) => res.text())
        .then(() => window.history.go());
    }
})