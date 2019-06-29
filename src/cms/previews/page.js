import React from 'react';
import cl from '../../utils/cloudinary';

export default function PagePreview({ entry, widgetFor }) {
  const data = entry.getIn(['data']).toJS();

  const content = widgetFor('body');

  const url = cl.url(data.headerImage, {
    fetch_format: 'auto',
    width: '800',
    crop: 'fill',
    quality: '50'
  });

  if (data) {
    return (
      <div className="preview">
        <div
          style={{
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover',
            backgroudPositon: 'center',
            height: data.smallHeader ? '40vh' : '95vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div>
            <h1>{data.heading}</h1>
            <p>{data.blurb}</p>
          </div>
        </div>
        <div>{content}</div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
