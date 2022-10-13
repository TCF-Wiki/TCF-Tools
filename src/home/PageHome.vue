<template>
    <div class="home">
        <div class="main">
            <img class="mainImg" src="/Partner_Logo.png" />
            <img class="mainImg" src="/wiki_logo_bar.png" />
        </div>
        <div class="about">
            The Cycle: Frontier is a free-to-play high-stakes PvPvE first-person shooter driven by suspense and danger. Prospect for resources and other riches on an abandoned alien world ravaged by a deadly storm, inhabited by monsters, and
            frequently raided by other ambitious Prospectors.
            <br />
            <br />
            The Cycle: Frontier Wiki brings you the player up to date information for The Cycle: Frontier. Enhance your gaming experience with our websites and apps. All for free without any
            ads!
        </div>
        <div class="navigation">
            <a href="/about"><img src="./images/Nav_About.png" /></a>
            <a href="/calc"><img src="./images/Nav_Calculator.png" /></a>
            <a href="/map"><img src="./images/Nav_Map.png" /></a>
            <a href="https://tracker.thecyclefrontier.wiki"><img src="./images/Nav_Tracker.png" /></a>
            <a href="/loadout"><img src="./images/Nav_Loadout.png" /></a>
        </div>
    </div>
</template>
<style scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 75%;
}

.mainImg {
    width: 40%;
    height: auto;
}

.about {
    width: 40%;
    text-align: center;
    font-size: .8rem;
    color: #ffffff;
    font-family: 'Lato', sans-serif;
}

.navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 75%;
    height: 50%;
}
.navigation a {
    width: 15%;
    margin: 2rem;
}
.navigation img {
    width: 100%;
    height: auto;
}

@media screen and (max-width: 900px) {
    .about {
        width: 100%;
    }

    .navigation {
        width: 100%;
        flex-wrap: wrap;
    }

    .navigation a {
        width: 23%;
        margin: .3rem
    }
}
</style>
