<template>
    <div class="nav-menu"> 
        <font-awesome-icon width="4rem" icon="fa-solid fa-bars" @click="showMenu()"></font-awesome-icon> 
        <div class="nav-content" :class="showMobileMenu ? 'open-menu' : 'closed-menu'"> 

            <a class="logo" href="https://thecyclefrontier.wiki/wiki/Main_Page" target="_blank"><img src="images/wiki_logo_bar.png"></a>
            <div class="nav-items">
                <a> Official Wiki </a>
                <a> Interactive Map </a>
                <a> Weapon Calculator </a>
                <a> Item Tracker </a>
                <a> Loadout Generator </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    data() {
        return {
            showMobileMenu: false,
        }
    },
    methods: {
        showMenu() {
            this.showMobileMenu = !this.showMobileMenu;
        },
    },
}
</script>

<style scoped>
    .logo {
        width: 10%
    }
    .nav-menu {
        background-color: var(--background-menu-color);
        color: var(--text-color-menu-white);
        z-index: 1;
        -webkit-box-shadow: inset 0px 0px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: inset 0px 0px 5px 0px rgba(0,0,0,0.75);
  box-shadow: inset 0px 0px 5px 0px rgba(0,0,0,0.75);
    }
    .nav-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .nav-items {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        margin: 0;
    }

    .nav-items a {
        padding: 2rem 2.5rem;
        width: fit-content;
        height: 100%;
        transition: all .1s linear;
        font-size: 1rem;
        text-transform: uppercase;
        word-wrap: break-word;
        cursor: pointer;
    }

    .nav-items a:hover {
        background-color: var(--background-button-color);
        color: var(--link-body-color)
    }

    .nav-menu svg {
        display: none;
    }
    /* Mobile version - hidden hamburger menu */
    @media screen and (max-width: 768px) {
    .nav-menu {
        padding: 1rem 0;
        position: absolute;
        width: 100%;
        border-bottom: 2px solid var(--background-body-color)
    }
    .open-menu {
        opacity: 1;
        height: 100vh;
    }
    .closed-menu {
        opacity: 0;
        height: 0;
        padding: 0;
    }
    .nav-content {
        flex-direction: column;
        z-index: 100;
        position: relative;
        transition: all .5s linear;
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
        
    }
    .logo {
        width: 100%;
    }
}
    </style>