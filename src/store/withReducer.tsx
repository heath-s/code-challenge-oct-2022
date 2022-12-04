import { ComponentProps, FunctionComponent } from 'react';
import { Reducer } from '@reduxjs/toolkit';
import { injectReducer } from '.';

function withReducer(key: string, reducer: Reducer) {
  return (WrappedComponent: FunctionComponent) => {
    injectReducer(key, reducer);

    return (
      // eslint-disable-next-line react/function-component-definition
      (props: ComponentProps<typeof WrappedComponent>) => <WrappedComponent {...props} />
    );
  };
}

export default withReducer;
