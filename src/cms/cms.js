import CMS from 'netlify-cms-app';

import '../layout/layout.css';
import './previews/preview.css';
import PagePreview from './previews/page';

CMS.registerPreviewTemplate('page', PagePreview);
