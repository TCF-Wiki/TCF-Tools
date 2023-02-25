import {githubURL} from "../constants.json";

async function get_timer_data() {
    const response = await fetch(githubURL + "timings.json", {});
    const json = await response.json();

    return json;
}

export const mapDataJson = await get_timer_data();
