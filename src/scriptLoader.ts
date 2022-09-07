export function addLeafletScript() : void {
    let s = document.createElement( 'script' );
    s.setAttribute( 'src', 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.js' );
    document.head.appendChild( s );
}

export function addLeafletStyles() : void {
    let s = document.createElement( 'link'); 
    s.setAttribute( 'rel', 'stylesheet')
    s.setAttribute( 'href', 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.css')
    document.head.appendChild( s );
}
