<template>
<header class="mw-header citizen-header">
	<div class="header-outer">
        <div class="header-item" v-tooltip.right="{content: 'Official Wiki'}"> 
            <a href="https://thecyclefrontier.wiki/wiki/Main_Page" target="_blank"> 
                <img  src="/wiki_logo_notext.png">
            </a>
        </div>
		<div class="header-item" v-tooltip.right="{content: 'Home Page'}"> 
            <a href="/"> 
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>            </a>
        </div>
        <div class="header-item" v-tooltip.right="{content: 'Interactive Map'}"> 
            <a href="/map.html"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40z"/></svg>
            </a>
        </div>
        <div class="header-item" v-tooltip.right="{content: 'Progress Tracker'}"> 
            <a href="/progress.html"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M448 160H320V128H448v32zM48 64C21.5 64 0 85.5 0 112v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zM448 352v32H192V352H448zM48 288c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V336c0-26.5-21.5-48-48-48H48z"/></svg>
            </a>
        </div>
        <div class="header-item" v-tooltip.right="{content: 'Weapon Calculator'}"> 
            <a href="/calculator.html"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM96 64H288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32zM64 224c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32zm32 64c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32zM64 416c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32zM160 320c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32zM288 192c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32zM256 320c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32zm32 64c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32z"/></svg>
            </a>
        </div>
        <div class="header-item" v-tooltip.right="{content: 'Forge Simulator'}"> 
            <a href="/forge.html"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M413.5 237.5c-28.2 4.8-58.2-3.6-80-25.4l-38.1-38.1C280.4 159 272 138.8 272 117.6V105.5L192.3 62c-5.3-2.9-8.6-8.6-8.3-14.7s3.9-11.5 9.5-14l47.2-21C259.1 4.2 279 0 299.2 0h18.1c36.7 0 72 14 98.7 39.1l44.6 42c24.2 22.8 33.2 55.7 26.6 86L503 183l8-8c9.4-9.4 24.6-9.4 33.9 0l24 24c9.4 9.4 9.4 24.6 0 33.9l-88 88c-9.4 9.4-24.6 9.4-33.9 0l-24-24c-9.4-9.4-9.4-24.6 0-33.9l8-8-17.5-17.5zM27.4 377.1L260.9 182.6c3.5 4.9 7.5 9.6 11.8 14l38.1 38.1c6 6 12.4 11.2 19.2 15.7L134.9 484.6c-14.5 17.4-36 27.4-58.6 27.4C34.1 512 0 477.8 0 435.7c0-22.6 10.1-44.1 27.4-58.6z"/></svg>
            </a>
        </div>
        <div class="header-item" v-tooltip.right="{content: 'Loadout Generator'}"> 
            <a href="/loadout.html"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM128 288c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm32 64c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM320 192c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm32 64c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM320 384c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z"/></svg>
            </a>
        </div>
    </div>
</header>
</template>

<style scoped lang="less">
.citizen-header {
	--header-icon-size: ~'calc( var( --header-button-size ) / 2 )';
	--header-button-size: ~'calc( var( --header-size ) - var(  --space-xs ) * 2 )';
	--header-direction: row;
	position: fixed;
	z-index: 91;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: var( --header-direction );
	padding: var( --space-xs );
	border-top: 1px solid var( --border-color-base );
	background-color: var( --color-surface-0 );
	gap: var( --space-xxs );

	&__item {
		display: flex;
		align-items: center;
	}

	&__button {
		display: grid;
		width: var( --header-button-size );
		height: var( --header-button-size );
		border-radius: var( --border-radius--small );
		contain: strict;
		place-items: center;

		// Used in checkbox hack
		&Checkbox {
			position: absolute;
			display: block;
			width: inherit;
			height: inherit;
			contain: strict;
		}

		// Pure CSS icons
		&Icon {
			overflow: hidden; // Sometimes CSS animation can clip
			width: var( --header-icon-size );
			height: var( --header-icon-size );
			contain: strict;
		}

		&Icon,
		.citizen-ui-icon:before {
			opacity: var( --opacity-icon-base );
			transition: transform 250ms cubic-bezier(0.215,0.61,0.355,1), opacity 100ms ease;;
		}

		&:hover {
			background-color: var( --background-color-quiet--hover );

			.citizen-ui-icon:before,
			.citizen-header__buttonIcon {
				opacity: var( --opacity-icon-base--hover );
			}
		}

		&:active {
			background-color: var( --background-color-quiet--active );

			.citizen-ui-icon:before,
			.citizen-header__buttonIcon {
				opacity: var( --opacity-icon-base--active );
			}
		}
	}

	&__logo {
		padding: 0 var( --space-xs ) 0 0;
		border-right: 1px solid var( --border-color-base );
		margin: 0 var( --space-xxs );
	}

	&__inner {
		z-index: -1; // Inner element should be behind menu and search
		display: flex;
		min-width: 0;
		flex-direction: var( --header-direction );
		flex-grow: 1;
		justify-content: space-between;
		gap: var( --space-xxs );

		.mw-checkbox-hack-checkbox:checked {
			~ .citizen-header__button {
				background-color: var( --background-color-primary--active );
			}
		}
	}

	&__start,
	&__end {
		display: flex;
		flex-direction: var( --header-direction );
		gap: var( --space-xxs );
	}

	&__start {
		min-width: 0;
		align-items: center;
	}

	// Reset
	ul {
		margin: 0;
		list-style: none;
	}
}

.header-outer {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);

    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    
    .header-item {
        height: calc(1.2 * var(--space-xl) );
        aspect-ratio: 1 / 1;

        a {
            height: 100%;
            width: 100%;
            margin: auto;
            display: block;

            &:hover {
                background-color: var(--color-surface-1);
                border-radius: var(--border-radius--small);
            }
        }

        svg {
            scale: 0.6;
            aspect-ratio:  1 / 1;
            fill: var(--color-base);

            margin: auto;
            display: block;
        }
    }
}


// Reset hover styles if it is a touch device
// This is dumb but hover:hover overrides active states
@media ( hover: none ) {
	.citizen-header {
		&__button {
			&:hover {
				background-color: none;

				.citizen-header__buttonIcon {
					opacity: var( --opacity-icon-base );
				}
			}
		}
	}
}

@media ( min-width: 1000px ) {
	.citizen-header {
		--header-direction: column;
		top: 0;
		right: unset;
		left: 0;
		border-top: 0;
		border-right: 1px solid var( --border-color-base );
        padding: var(--space-sm);

		&__logo {
			padding: 0 0 var( --space-xs ) 0;
			border-right: 0;
			border-bottom: 1px solid var( --border-color-base );
			margin: var( --space-xxs ) 0;
		}
	}

    .header-outer {
        flex-direction: column;
        width: unset;
        justify-content: start;
    }
}

/* Hide header when scroll down on smaller screen sizes */
@media ( max-width: 720px ) {
	.citizen-header {
        transition: transform 250ms cubic-bezier(0.215,0.61,0.355,1);
	}

	.citizen-scroll--down .citizen-header {
		transform: translateY( 100% );
	}
}

</style>
