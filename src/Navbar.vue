<template>
    <div class="nav-menu">
        <font-awesome-icon width="4rem" icon="fa-solid fa-bars" @click.prevent="showMenu()"></font-awesome-icon>
        <div class="nav-content" :class="showMobileMenu ? 'open-menu' : 'closed-menu'">
            <a class="logo" href="https://thecyclefrontier.wiki/wiki/Main_Page" target="_blank"><img src="/shared-images/wiki_logo_bar.png" /></a>
            <div class="nav-items">
                <a href="/"> Home </a>
                <a href="/about"> About us </a>
                <a href="https://thecyclefrontier.wiki/wiki/Main_Page" target="_blank"> Official Wiki </a>
                <a href="/map"> Interactive Map </a>
                <a href="/calc"> Weapon Calculator </a>
                <a href="https://tracker.thecyclefrontier.wiki"> Item Tracker </a>
                <a href="/forge"> Forge Simulator </a>
                <a href="/loadout"> Loadout Generator </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showMobileMenu: false,
        };
    },
    methods: {
        showMenu() {
            this.showMobileMenu = !this.showMobileMenu;
        },
    },
};
</script>

<style scoped>
.logo {
    width: 10%;
}
.nav-menu {
    background-color: var(--background-menu-color);
    color: var(--text-color-menu-white);
    z-index: 1;
    width: 100vw;
}
.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nav-items {
    display: flex;
    justify-content: center;
    margin-right: 1rem;
    align-items: baseline;
    height: 4rem;
}

.nav-items a {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 4rem;

    transition: all 0.1s linear;
    cursor: pointer;

    padding: 0 1.5rem;
    width: fit-content;

    font-size: 1rem;
    text-transform: uppercase;
    text-decoration: none;
}

.nav-items a:hover {
    background-color: var(--background-button-color);
    color: var(--link-body-color);
}

.nav-items div:hover a {
    color: var(--link-body-color);
}

.nav-menu svg {
    display: none;
}
/* Mobile version - hidden hamburger menu */
@media screen and (max-width: 900px) {
    .nav-menu {
        padding: 1rem 0;
        position: absolute;
        width: 100%;
        left: 0;
        margin-left: 0;
        border-bottom: 2px solid var(--background-body-color);
    }
    .open-menu {
        opacity: 1;
        height: 100vh;
    }
    .closed-menu {
        opacity: 0;
        height: 0;
        padding: 0;
        pointer-events: none;
    }
    .nav-content {
        flex-direction: column;
        z-index: 100;
        position: relative;
        transition: all 0.5s linear;
        justify-content: center;
    }
    .nav-items {
        flex-direction: column;
    }
    .nav-items a {
        padding: 0;
        font-size: 3rem;
    }
    .nav-menu svg {
        display: block;
        margin-left: auto;
        padding: 0 1rem 1rem 0;
        font-size: 2rem;
    }
    .logo {
        width: 100%;
    }
}
</style>
