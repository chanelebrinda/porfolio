document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio app is loaded');

    // Fonction pour gérer les onglets
    window.openTab = function(event, tabId) {
        const tabs = document.querySelectorAll('.tab-content');
        const tabLinks = document.querySelectorAll('.tab-link');

        // Cache tous les contenus d'onglets et désactive tous les liens d'onglets
        tabs.forEach(tab => tab.classList.remove('active'));
        tabLinks.forEach(link => link.classList.remove('active'));

        // Active le contenu et le lien d'onglet cliqué
        document.getElementById(tabId).classList.add('active');
        event.currentTarget.classList.add('active');
    };

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker registered:', reg))
            .catch(err => console.error('Service Worker registration failed:', err));
    }
});
