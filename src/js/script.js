'use strict';

document.addEventListener('DOMContentLoaded', () => {
// Отправка формы 
    const myForm = document.querySelector('form'),
        message = {
            loading: 'Загрузка',
            success: 'Спасибо! Скоро мы с Вами свяжемся',
            failure: 'Произошла ошибка, попробуйте чуть позже...'
        };

    myForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
            statusMessage.classList.add('registration__label');
            statusMessage.textContent = message.loading;
            myForm.append(statusMessage);

        const formData = new FormData(myForm);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: json
        }).then(data => data.ok ? data.text() : Promise.reject(data))
          .then(data => {
            console.log(data);
            statusMessage.textContent = message.success;
            setTimeout(() => {
                statusMessage.remove();
            }, 3000);
        }).catch(() => {
            statusMessage.textContent = message.failure;
            setTimeout(() => {
                statusMessage.remove();
            }, 3000);
        }).finally(() => {
            setTimeout(() => {
                myForm.reset();
            }, 3000);
        })
    });

// Прокрутка
    const sch = document.querySelector('.sch'),
        reg = document.querySelector('.reg');

    sch.addEventListener('click', () => {
        window.scrollBy({
            top: 1950,
            behavior: 'smooth'
        });
    });

    reg.addEventListener('click', () => {
        window.scrollBy({
            top: 410,
            behavior: 'smooth'
        });
    });
})

