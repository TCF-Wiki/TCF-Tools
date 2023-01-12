console.log("started loading");
//loading
export function doneLoading() {
    console.log("done loading");
    let element = document.getElementById("loading");
    if (element) {
        element.remove();
    }
    document.querySelector("main")?.classList.add("loaded");
    //clean up the url bar
    ///window.history.pushState({}, document.title, location.pathname.replace(".html", ""));
}
