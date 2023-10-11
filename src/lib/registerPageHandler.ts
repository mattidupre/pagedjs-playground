import { Handler, registerHandlers } from 'pagedjs';
import {
  type PageType,
  type PageHandler,
  PAGES_GROUP_DATA_ATTRIBUTE,
} from '../entities';

const pageHandlers: Set<PageHandler> = new Set();

const getPagesGroupId = (pageEl: HTMLElement): string => {
  const pageGroupId = pageEl
    .querySelector(`[${PAGES_GROUP_DATA_ATTRIBUTE}]`)
    ?.getAttribute(PAGES_GROUP_DATA_ATTRIBUTE);
  if (!pageGroupId) {
    throw new TypeError('Could not derive page group id from page element.');
  }
  return pageGroupId;
};

const getPageType = (pageEl: HTMLElement): PageType => {
  const elClasses = Array.from(pageEl.classList);
  if (elClasses.includes('pagedjs_first_page')) {
    return 'first';
  }
  if (elClasses.includes('pagedjs_left_page')) {
    return 'odd';
  }
  if (elClasses.includes('pagedjs_right_page')) {
    return 'even';
  }
  throw new TypeError('Could not derive page type from page element.');
};

class PagedJsHandler extends Handler {
  afterPageLayout(pageEl: HTMLElement) {
    const pagesGroupId = getPagesGroupId(pageEl);
    pageEl.setAttribute(PAGES_GROUP_DATA_ATTRIBUTE, pagesGroupId);
    pageHandlers.forEach((pageHandler) =>
      pageHandler(pageEl, pagesGroupId, getPageType(pageEl)),
    );
  }
}

registerHandlers(PagedJsHandler);

export const registerPageHandler = (pageHandler: PageHandler) => {
  const wrappedFn = pageHandler.bind(undefined);
  pageHandlers.add(wrappedFn);
  return () => {
    pageHandlers.delete(wrappedFn);
  };
};
