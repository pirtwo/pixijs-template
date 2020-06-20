export default function loadWebfonts(families = ['Snippet'], loadCallback = undefined) {
    window.WebFontConfig = {
        google: {
            families: families,
        },
    
        active() {
            if(loadCallback) loadCallback();
        }
    };

    const webFontScript = document.createElement('script');
    webFontScript.src = `${document.location.protocol === 'https:' ? 'https' : 'http'}://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    webFontScript.type = 'text/javascript';
    webFontScript.async = 'true';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(webFontScript, s);    
}