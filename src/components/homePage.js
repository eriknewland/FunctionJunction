import React, { useState } from 'react';
import NavHeader from './navHeader';
import CodeMirrorHomePage from './codeMirrorHome';

export default function HomePage() {
  const [qeued, setQeued] = useState(false);

  return (
    <>
      {/* <div className="container-fluid p-5">
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Holy guacamole!</strong>
          {' '}
          You should check in on some of those fields below.
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="True">&times;</span>
          </button>
        </div>
      </div> */}
      <NavHeader qeued={qeued} setQeued={setQeued} />
      <CodeMirrorHomePage qeued={qeued} setQeued={setQeued} />
    </>
  );
}
