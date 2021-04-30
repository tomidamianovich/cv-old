import React, { useState } from "react";

const withSectionItemHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => ({ ...props }) => {
  const [visible, setVisibility] = useState(false);
  return (
    <>
      <button onClick={() => setVisibility(!visible)}>
        {!visible ? "Mostrar" : "Ocultar"}
      </button>
      {visible && <WrappedComponent {...(props as P)} />}
    </>
  );
};

export default withSectionItemHOC;
