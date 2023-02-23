const form = document.querySelector('#form');
form.addEventListener('submit', handleSubmit);


form.addEventListener('handleSubmit', e => {
	e.preventDefault();
	
    const form= new FormData(this)
    console.log(form.get('name'))
});
const buttonMailto = document.querySelector('#enviando');
buttonMailto.setAttribute('href',`mailto:laliscrew@gmail.com?subject=${form.get('name')}${form.get('email')}&body=${form.get('message')}`);

buttonMailto.click();