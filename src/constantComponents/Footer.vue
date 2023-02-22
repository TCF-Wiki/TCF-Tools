<template>
    <footer class="mw-footer citizen-footer">
        <div class="citizen-footer__container">
            <section class="citizen-footer__content">
                <div class="citizen-footer__siteinfo">
                    <div id="footer-sitetitle" class="mw-wiki-title">TC:F Wiki Tools</div>
                    <p id="footer-desc">Welcome to the Official The Cycle: Frontier Wiki Tools, the official source of documentation for The Cycle: Frontier.</p>
                </div>
                <nav id="footer-places">
                    <ul>
                        <li id="footer-places-privacy">
                            <a href="https://thecyclefrontier.wiki/wiki/Wiki:Privacy_policy" title="Wiki:Privacy policy">Privacy policy<font-awesome-icon icon="fa-user-lock" /></a>
                        </li>
                        <li id="footer-places-about">
                            <a href="https://thecyclefrontier.wiki/wiki/Wiki:About" title="Wiki:About">About The Cycle: Frontier Wiki<font-awesome-icon icon="fa-circle-info" /></a>
                        </li>
                        <li id="footer-places-disclaimer">
                            <a href="https://thecyclefrontier.wiki/wiki/Wiki:General_disclaimer" title="Wiki:General disclaimer">Disclaimers<font-awesome-icon icon="fa-triangle-exclamation" /></a>
                        </li>
                    </ul>
                </nav>
                <nav id="footer-places">
                    <ul>
                        <li id="footer-places-privacy">
                            <a href="https://github.com/TCF-Wiki/TCF-Tools" title="Edit on Github">Edit on Github<font-awesome-icon icon="fa-brands fa-github" /></a>
                        </li>
                        <li id="footer-places-about">
                            <a href="https://twitter.com/TCFWiki" title="Twitter">Twitter<font-awesome-icon icon="fa-brands fa-twitter" /></a>
                        </li>
                        <li id="footer-places-disclaimer">
                            <a href="https://discord.com/channels/469039260163637249/892772096877400105" title="Discord">Discord<font-awesome-icon icon="fa-brands fa-discord" /></a>
                        </li>
                    </ul>
                </nav>
            </section>
            <section class="citizen-footer__bottom">
                <div id="footer-tagline">Check out the <a href="https://thecyclefrontier.wiki/"> Official Wiki </a> as well!</div>
                <div> Tools Version {{  META['TOOLS_VERSION'] }} || Updated for {{ META['GAME_DATA_VERSION'] }} </div>
                <nav id="footer-icons">
                    <ul>
                        <li>
                            <a href="https://github.com/sponsors/TCF-Wiki" target="_blank">
                                <img src="/shared-images/DonateGithub.png" alt="Donate on GitHub Sponsors" width="88" height="31" loading="lazy" />
                            </a>
                        </li>
                        <li>
                            <a href="https://ko-fi.com/tcfwiki" target="_blank">
                                <img src="/shared-images/DonateKofi.png" alt="Donate on Ko-fi" width="88" height="31" loading="lazy" />
                            </a>
                        </li>
                        <li>
                            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">
                                <img src="https://thecyclefrontier.wiki/w/resources/assets/licenses/cc-by-sa.png" alt="Creative Commons Attribution-ShareAlike" width="88" height="31" loading="lazy" />
                            </a>
                        </li>
                    </ul>
                </nav>
            </section>
        </div>
    </footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {githubURL} from '../apps/constants.json';

export default defineComponent({
    data() {
        return {
            META: {} as any
        }
    },
    async mounted() {
        async function get_meta_data() {
            const response = await fetch(githubURL.replace("min/", "") + 'META.json', {});
            const json = await response.json();

            return json;
        }

        const META = await get_meta_data();
        this.META = META;
    }
})
</script>
<style scoped lang="less">
.citizen-footer {
    padding: var(--space-xl) var(--padding-page);
    margin-top: var(--space-xl);
    // Reserve space for header
    margin-bottom: var(--header-size);
    background-color: var(--color-surface-2);
    clear: both;
    color: var(--color-base--subtle);
    direction: ltr;
    font-size: 0.875rem;

    width: 100vw;

    &__container {
        max-width: 92vw;
        margin-right: var(--space-md);
        margin-left: var(--space-md);
    }

    &__content,
    &__bottom {
        display: flex;
        flex-wrap: wrap;
        width: 90vw;
        padding: var(--space-md) 0;
        gap: var(--space-md);
    }

    &__bottom {
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid var(--border-color-base);
        margin-right: auto;
        margin-left: auto;
    }

    &__siteinfo {
        display: flex;
        max-width: 80vw;
        flex-direction: column;
        gap: var(--space-xs);

        p {
            margin: 0;
            line-height: var(--line-height);
        }
    }

    a {
        color: var(--color-base--emphasized);
        font-weight: var(--font-weight-medium);
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
    }

    li {
        list-style: none;
    }
}

#footer {
    &-sitetitle {
        color: var(--color-base--emphasized);
        font-size: 1.25rem;
        font-weight: 500;

        img.mw-logo-wordmark {
            max-height: 54px;
            filter: invert(1) hue-rotate(180deg);
        }
    }

    &-places {
        ul {
            flex-direction: column;
        }

        a {
            display: block;
            padding: var(--space-xs) var(--space-md);
            border-radius: var(--border-radius--small);

            &:hover {
                background-color: var(--color-surface-3);
            }

            &:active {
                background-color: var(--color-surface-3);
            }

            & svg {
                color: var(--color-base--emphasized);
                float: right;
                margin-left: 1rem;
            }
        }
    }

    &-tagline {
        padding: var(--space-xs) 0;
    }

    &-icons {
        display: flex;
        justify-content: flex-end;

        ul {
            gap: var(--space-xs);
        }

        li {
            display: flex; // Horizontally aligned with there are two icons in the same li
        }

        a {
            display: flex;
            align-items: center;
        }
    }
}

@media (min-width: 1001px) {
    .citizen-footer {
        margin-bottom: 0;
        margin-left: var(--header-size);
        width: 95vw;
        &__siteinfo {
            max-width: 40vw;
        }
    }

    #footer-sitetitle {
        font-size: 2rem;
        font-weight: 700;
    }
}
</style>
