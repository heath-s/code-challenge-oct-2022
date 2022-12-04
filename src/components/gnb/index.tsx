import styled from '@emotion/styled';
import ImportButton from 'components/buttons/import';
import { ComponentProps } from 'react';

const Component = styled.div`
  align-items: center;
  background-color: var(--color-white);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 10px 16px;
`;

const Logo = styled.img`
  height: 18.5px;
  margin-right: 12px;
  width: 108px;
`;

type GnbProps = {
  onClickImport?: () => void;
} & Omit<ComponentProps<typeof Component>, 'children'>;

function Gnb({
  onClickImport = () => null,
  ...props
}: GnbProps) {
  return (
    <Component {...props}>
      <Logo src="/assets/images/logo-gnb.png" alt="Brandname placeholder" />
      <ImportButton onClick={onClickImport} />
    </Component>
  );
}

export default Gnb;
