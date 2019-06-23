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
    { name: 'classList', label: 'Classes', widget: 'string' }
  ],
  pattern: /^(<img class="nlf-styled-image(?:[\s\S]+) \/>)$/,
  fromBlock: function(match) {
    return {
      imageString: match[1]
    };
  },
  toBlock: function(obj) {
    return `<img class="nlf-styled-image ${obj.classList}" src="${obj.styledImage}" />`;
  },
  toPreview: function(obj) {
    return obj.imageString;
  }
});
