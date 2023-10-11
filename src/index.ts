import { mockDocument } from './helpers/mockDocument';
import { renderPreview } from './lib/renderPreview';

import './preview.scss';

document.addEventListener('DOMContentLoaded', () => {
  renderPreview(document.getElementById('root')!, mockDocument);
});
