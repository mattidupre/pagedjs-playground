import { Previewer } from 'pagedjs';
import { type DocumentOptions } from '../entities';
import { registerPageHandler } from './registerPageHandler';
import { createRenderer } from './createPageRenderer';
import { addStyleSheet } from '../utils';

const previewer = new Previewer();

export const renderPreview = async (
  rootElement: HTMLElement,
  documentOptions: DocumentOptions,
) => {
  const { documentHtml, documentCss, pageHandler } =
    createRenderer(documentOptions);

  addStyleSheet(documentCss);

  // TODO: Make sure no two renders are occurring simultaneously.

  const unregister = registerPageHandler(pageHandler);
  await previewer.preview(documentHtml, [{ _: documentCss }], rootElement);
  unregister();
};
