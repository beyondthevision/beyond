export default () => {
    if (window.location.pathname == '/' || window.location.pathname == '/compare') {
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = 'd20cb6b2-ecaa-4707-8c59-ee52b493fb6d';

        (function() {
            var d = document;
            var s = d.createElement('script');

            s.src = 'https://client.crisp.chat/l.js';
            s.async = 1;
            d.getElementsByTagName('head')[0].appendChild(s);
        })();
    }
};