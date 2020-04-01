async function getPosts(){
    return await fetch('http://localhost:5000/posts')
                                    .then((response) => response.json())
                                    .then((data) => data);
}