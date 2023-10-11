import {
  type PageType,
  assertPageType,
  type PageOptions,
  PAGES_GROUP_DATA_ATTRIBUTE,
  HEADER_CLASS_NAME,
  FOOTER_CLASS_NAME,
} from '../entities';
import { jsToCss } from '../utils';

type Options = Pick<
  PageOptions,
  | 'width'
  | 'height'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
>;

const getDataSelector = (pagesGroupId: string) =>
  `[${PAGES_GROUP_DATA_ATTRIBUTE}="${pagesGroupId}"]`;

const getPageTypeSelector = (pagesGroupId: string, pageType: PageType) => {
  assertPageType(pageType);
  const baseSelector = `.pagedjs_named_page.pagedjs_${pagesGroupId}_page`;
  switch (pageType) {
    case 'default':
      return baseSelector;
    case 'first':
      return baseSelector + '.pagedjs_first_page';
    case 'even':
      return baseSelector + '.pagedjs_even_page';
    case 'odd':
      return baseSelector + '.pagedjs_odd_page';
  }
};

const getAtPageSelector = (pagesGroupId: string, pageType: PageType) => {
  assertPageType(pageType);
  switch (pageType) {
    case 'default':
      return `@page ${pagesGroupId}`;
    case 'first':
      return `@page ${pagesGroupId}:first`;
    case 'even':
      return `@page ${pagesGroupId}:left`;
    case 'odd':
      return `@page ${pagesGroupId}:right`;
  }
};

export const createPagesGroupCss = (pagesGroupId: string) =>
  [
    `${getDataSelector(pagesGroupId)} {\n${jsToCss({
      page: pagesGroupId,
    })}}`,
  ].join('\n') + '\n';

export const createPageCss = (
  pagesGroupId: string,
  pageType: PageType,
  { width, height, marginTop, marginRight, marginBottom, marginLeft }: Options,
) =>
  [
    `${getAtPageSelector(pagesGroupId, pageType)} {\n${jsToCss({
      size: `${width} ${height}`,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    })}}`,

    `${getPageTypeSelector(pagesGroupId, pageType)} {\n${jsToCss({
      position: 'relative',
      overflow: 'hidden',
      width,
      height,
    })}}`,

    `${getPageTypeSelector(
      pagesGroupId,
      pageType,
    )} .${HEADER_CLASS_NAME} {\n${jsToCss({
      bottom: `calc(100% - ${marginTop})`,
      display: 'block',
      position: 'absolute',
    })}}`,

    `${getPageTypeSelector(
      pagesGroupId,
      pageType,
    )} .${FOOTER_CLASS_NAME} {\n${jsToCss({
      top: `calc(100% - ${marginTop})`,
      display: 'block',
      position: 'absolute',
    })}}`,
  ].join('\n') + '\n';
