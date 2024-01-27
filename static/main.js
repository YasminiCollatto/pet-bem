(function() {

    function showNotification() {
        Notification.requestPermission().then((result) => {
            if (result === "granted") {
                navigator.serviceWorker.ready.then((registration) => {
                    registration.showNotification("Vibration Sample", {
                        body: "Buzz! Buzz!",
                        // icon: "logotipo.jpg",
                        vibrate: [200, 100, 200, 100, 200, 100, 200],
                        tag: "vibration-sample",
                    });
                });
            }
        });
    }
    function init() {
        if ('serviceWorker' in navigator) {
            const onSuccessRegister = (registration) => {
                // registration.showNotification("titulo", {body: "mensagem"})
                showNotification()
                console.log("SW Register Success: ", registration.scope)
            }
            const onErrorRegister = (error) => console.log("SW Register Error: ",error)

            navigator.serviceWorker.register('/sw.js')
                .then(onSuccessRegister)
                .catch(onErrorRegister)
        } else console.log('Your browser do not support service worker')


    }
    window.onload = init
})()