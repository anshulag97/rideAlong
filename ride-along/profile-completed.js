const urlSearchParams = new URLSearchParams(window.location.search);
const document_id = urlSearchParams.get('doc-id');

const submit = document.getElementById('submit');

submit.addEventListener('click',()=>{
    window.location.href = `./sign-in.html?doc-id=${document_id}`;
})