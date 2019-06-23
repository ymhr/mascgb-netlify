import React from 'react';
import styled from 'styled-components';

// const HeaderImage = styled.div`

// `;

export default function PagePreview({ entry, widgetFor }) {
  const data = entry.getIn(['data']).toJS();

  const content = widgetFor('body');

  if (data) {
    return (
      <div className="preview">
        <div
          image={data.headerImage}
          style={{
            backgroundImage: `url(https://raw.githubusercontent.com/ymhr/mascgb-netlify/master${data.headerImage})`,
            backgroundSize: 'cover',
            backgroudPositon: 'center',
            height: data.smallHeader ? '40vh' : '100vh',
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
