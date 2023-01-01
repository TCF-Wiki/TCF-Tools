<template>
    <div class="home">
        <div class="logo">
            <img class="logoImg" src="/wiki_logo_bar.png" />
        </div>
        <div class="about">
            <div>
                <h3>The Cycle: Frontier Wiki:</h3>
                <p>The Cycle: Frontier Wiki brings you the player up to date information for The Cycle: Frontier</p>
                <p>Get the most up to date information from the official Wiki</p>
                <p>Enhance your gaming experience with our websites and apps</p>
                <p>All for free without any ads!</p>
            </div>
            <div>
                <img class="partnerImg" src="/Partner_Logo.png" />
            </div>
            <div>
                <h3>The Cycle: Frontier</h3>
                The Cycle: Frontier is a free-to-play high-stakes PvPvE first-person shooter driven by suspense and danger. Prospect for resources and other riches on an abandoned alien world ravaged by a deadly storm, inhabited by monsters, and
                frequently raided by other ambitious Prospectors.
            </div>
        </div>
        <div class="navigation">
            <h3>Navigation</h3>
            <div>
                <a href="/map"><img src="./images/Nav_Map.png" /> Interactive Map </a>
                <a href="/calculator"><img src="./images/Nav_Calculator.png" /> Weapon Calculator </a>
                <a href="/forge"><img src="./images/Nav_Forge.png" /> Forge Simulator </a>
                <a href="/progress"><img src="./images/Nav_Progress.png" /> Progress Tracker </a>
                <a href="https://tracker.thecyclefrontier.wiki"><img src="./images/Nav_Tracker.png" /> Item Tracker </a>
                <a href="/loadout"><img src="./images/Nav_Loadout.png" /> Loadout Generator</a>
            </div>
        </div>
        <div class="contributors">
            <h3>Our Contributors</h3>
            <div class="contrib-container">
                <div class="contrib-item">
                    <img src="./images/plague_avatar.png" />
                    <h4>Plague</h4>
                    <ul>
                        <li>Item Tracker</li>
                        <li>Forge Simulator</li>
                    </ul>
                </div>
                <div class="contrib-item">
                    <img src="./images/frog_avatar.png" />
                    <h4>VeryGreatFrog</h4>
                    <ul>
                        <li>Wiki Lead</li>
                        <li>Social Media</li>
                        <li>Interactive Map</li>
                        <li>Weapon Calculator</li>
                        <li>Forge Simulator</li>
                        <li>Progress Tracker</li>
                    </ul>
                </div>
                <div class="contrib-item">
                    <img src="./images/contributor_avatar.png" />
                    <h4>Wiki Contributors</h4>
                    <ul>
                        <li>Wiki Contributions</li>
                        <li>Bug Reports</li>
                        <li>Feature Requests</li>
                        <li>Massive thanks to all of you!</li>
                    </ul>
                </div>
                <div class="contrib-item">
                    <img src="./images/stevn_avatar.png" />
                    <h4>Stevnbak</h4>
                    <ul>
                        <li>Wiki Lead</li>
                        <li>Data compiling</li>
                        <li>Interactive Map</li>
                        <li>Weapon Calculator</li>
                        <li>Forge Simulator</li>
                        <li>Loadout Generator</li>
                    </ul>
                </div>
                <div class="contrib-item">
                    <img src="./images/soulin_avatar.png" />
                    <h4>Soulin (クリス)</h4>
                    <ul>
                        <li>TC:F Toolbox App (WIP)</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* Main */
@import url('https://fonts.googleapis.com/css2?family=Sora');
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
* {
    font-family: 'Sora', sans-serif;
    color: #edeff0;
}
h3 {
    font-size: 2em;
    margin-bottom: 1em;
    font-weight: 700;
}
/* Logo */
.logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 75%;
}
.logoImg {
    width: 60%;
    height: auto;
}

/* About */
.about {
    width: 100%;
    text-align: center;
    display: flex;
    vertical-align: middle;
    padding: 0 1em 0 1em;
    margin: 2em 0 2em 0;
}

.about div {
    width: 33%;
    margin: 0em 2em 0em 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.partnerImg {
    width: 60%;
    height: auto;
}

/* Navigation */
.navigation {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 0 2em 0;
}
.navigation div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    width: 85%;
}
.navigation a {
    width: 12.5%;
    padding: 0 1rem 0 1rem;
    text-align: center;
}

.navigation img {
    width: 100%;
    height: auto;
}

/* CONTRIBUTORS */
.contributors {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 0 2em 0;
}
.contrib-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2em;
}
.contrib-item {
    width: 20%;
    padding: 0 1em 0 1em;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}
.contrib-item h4 {
    width: 100%;
    text-align: center;
    font-size: 1.5em;
    font-weight: 600;
    margin: 0.5em 0 0.5em 0;
}
.contrib-item img {
    margin: 0;
    border-radius: 50%;
    border: 1px solid #484848;
    height: 12em;
    width: 12em;
}
.contrib-item ul {
    padding: 0;
    width: 80%;
}

/* Vertical mode */
@media screen and (max-width: 900px) {
    .logoImg {
        width: 100%;
    }
    .about {
        width: 100%;
        flex-direction: column;
    }
    .about div {
        width: 100%;
        margin: 0em 0em 2em 0em;
    }

    .navigation {
        width: 100%;
        flex-wrap: wrap;
    }
    .navigation div {
        width: 100%;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .navigation a {
        width: 23%;
        padding: 0 0.5rem 0 0.5rem;
    }

    .contrib-container {
        margin: 0em 1em 0em 1em;
        flex-direction: column;
        gap: 2em;
        width: 75%;
    }

    .contrib-item {
        width: 80%;
        margin: auto;
    }

    .contrib-item img {
        margin: auto auto 1em auto;
        border-radius: 50%;
        border: 1px solid #484848;
        height: 6em;
        width: 6em;
    }
}
</style>
