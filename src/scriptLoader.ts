export function addResponsivePopupScript(): void {
    let s = document.createElement('script');
    s.setAttribute('src', 'https://unpkg.com/leaflet-responsive-popup@1.0.0/leaflet.responsive.popup.js');
    document.head.appendChild(s);
}

export function addResponsivePopupStyles(): void {
    let s = document.createElement('link');
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('href', 'https://unpkg.com/leaflet-responsive-popup@1.0.0/leaflet.responsive.popup.css');
    document.head.appendChild(s);
}


export function addLeafletStyles(): void {
    let s = document.createElement('link');
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('href', 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.css');
    document.head.appendChild(s);
}
