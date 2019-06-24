import CMS from 'netlify-cms-app';

import '../layout/layout.css';
import './previews/preview.css';
import PagePreview from './previews/page';

CMS.registerPreviewTemplate('page', PagePreview);

CMS.registerEditorComponent({
  id: 'styledImage',
  label: 'styledImage',
  fields: [
    { name: 'styledImage', label: 'Image', widget: 'image' },
    { name: 'classList', label: 'Classes', widget: 'string' },
    { name: 'alt', label: 'Alt', widget: 'string' },
    { name: 'title', label: 'Title', widget: 'string' }
  ],
  pattern: /(<styled-image([\S\s]*)><\/styled-image>)/,
  fromBlock: function(match) {
    return {
      imageString: match[1],
      attrs: match[2]
    };
  },
  toBlock: function(obj) {
    return `<styled-image class="${obj.classList}" src="${obj.styledImage}" alt="${obj.alt}" title="${obj.title}"></styled-image>`;
  },
  toPreview: function(obj) {
    return obj.imageString.replace('styled-image', 'img');
  }
});
