import SassUtil from "../../../util/SassRelated";

export default class ColorsHelper {

    private static rootBrandingKey = "publisher";

    static brandingHelper(brandings: any): string {
        let sassFile = ``;
        const utilMixin = `
            @mixin applyTokensBranding($selector, $colorMap) {
                #{$selector} {
                    @each $name, $color in $colorMap {
                        --#{$name}: #{$color};
                    }
                }
            }
        `;
        sassFile += utilMixin;
        sassFile += `$brandingTokens: ${Object.entries(brandings).reduce((prev, [brandingName, brandingObject]) => {
            const colorMap = SassUtil.convertObjectToSassMap(brandingObject);
            const selector = (brandingName === this.rootBrandingKey) ? '":root"' : `".${brandingName}"`;
            return prev.concat([SassUtil.convertObjectToSassMap({ colorMap, selector })]);
        }, []).join(',')};`;

        sassFile += `
            @each $brandingToken in $brandingTokens {
                @include applyTokensBranding(map-get($brandingToken, 'selector'), map-get($brandingToken, 'colorMap'));
            }
        `;
        return SassUtil.format(sassFile);
    }

    static colorGroupsHelper(colorGroups: any[], defaultFlag = false): string {
        const groups = Object.entries(colorGroups).map(([groupName, value]) => {
            return `$figma-${groupName}: ${SassUtil.convertObjectToSassMap(value)} ${defaultFlag && '!default'}`;
        }).join(";");
        return SassUtil.format(groups);
    }

}