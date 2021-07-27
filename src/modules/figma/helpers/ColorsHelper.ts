import {Service, Inject} from 'typedi';
import SassUtil from '../../../util/Scss';

@Service()
class ColorsHelper {
    private rootBrandingKey = 'publisher';
    @Inject()
    protected sassUtil: SassUtil;

    brandingHelper(brandings: any): string {
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
        const colorMap = this.sassUtil.convertObjectToSassMap(brandingObject);
        const selector = (brandingName === this.rootBrandingKey) ? '":root"' : `".${brandingName}"`;
        return prev.concat([this.sassUtil.convertObjectToSassMap({colorMap, selector})]);
      }, []).join(',')};`;

      sassFile += `
            @each $brandingToken in $brandingTokens {
                @include applyTokensBranding(map-get($brandingToken, 'selector'), map-get($brandingToken, 'colorMap'));
            }
        `;
      return this.sassUtil.format(sassFile);
    }

    colorGroupsHelper(colorGroups: any[], defaultFlag = false): string {
      const groups = Object.entries(colorGroups).map(([groupName, value]) => {
        return `$figma-${groupName}: ${this.sassUtil.convertObjectToSassMap(value)} ${defaultFlag && '!default'}`;
      }).join(';');
      return this.sassUtil.format(groups);
    }
}

export default ColorsHelper;
