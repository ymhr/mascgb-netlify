import CMS from 'netlify-cms-app';

import '../layout/layout.css';
import PagePreview from './previews/page';

CMS.registerPreviewTemplate('page', PagePreview);
