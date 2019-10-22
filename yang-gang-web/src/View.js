import React from 'react';

function View({children, row, style}) {
  return <div style={{display: 'flex', flexDirection: row ? 'row' : 'column', ...style}}>{children}</div>
}

export default View;