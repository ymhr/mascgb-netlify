import React from 'react';
import styled from 'styled-components';

// const HeaderImage = styled.div`

// `;

export default function PagePreview({ entry, getAsset }) {
  const data = entry.getIn(['data']).toJS();
  console.log(getAsset(data.headerImage));

  console.log('preview Data', data);

  if (data) {
    return (
      <div>
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
        <div>
          <pre>{data.body}</pre>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
