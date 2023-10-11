import { type DocumentOptions } from 'src/entities';
import { mockContent } from './mockContent';

export const mockDocument: DocumentOptions = {
  pagesGroups: [
    {
      id: 'introduction',
      contentHtml: mockContent,
      pageTypes: {
        default: {
          width: '8.5in',
          height: '11in',
          headerHtml: `<header><p><span>INTRODUCTION DEFAULT HEADER</span></p></header>`,
          footerHtml: `<footer><p><span>INTRODUCTION DEFAULT FOOTER</span></p></footer>`,
        },
        first: {
          width: '4.25in',
          height: '8.5in',
          marginTop: '0in',
          marginBottom: '0in',
          headerHtml: `<header><p><span>INTRODUCTION FIRST HEADER</span></p></header>`,
        },
        odd: {
          marginLeft: '0in',
          headerHtml: `<header><p><span>INTRODUCTION ODD HEADER</span></p></header>`,
        },
        even: {
          marginRight: '0in',
          headerHtml: `<header><p><span>INTRODUCTION EVEN HEADER</span></p></header>`,
        },
      },
    },
    {
      id: 'body',
      contentHtml: mockContent,
      pageTypes: {
        default: {
          width: '8.5in',
          height: '11in',
          footerHtml: `<header><p><span>BODY DEFAULT FOOTER</span></p></header>`,
        },
      },
    },
  ],
};
