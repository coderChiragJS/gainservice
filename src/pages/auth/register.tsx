import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React from 'react';
import styled from 'styled-components';

import Auth from 'components/Auth';
import Layout from 'Layouts';
import Socials from 'components/Auth/Socials';

const Input = styled(InputGroup)`
  margin-bottom: 2rem;
`;

export default function Register() {
  const onCheckbox = () => {
    // v will be true or false
  };
  return (
    <Layout title="Register">
      <Auth title="Create new account">
        <form>
          <Input fullWidth>
            <input type="text" placeholder="Username" />
          </Input>
          <Input fullWidth>
            <input type="email" placeholder="Email Address" />
          </Input>
          <Input fullWidth>
            <input type="password" placeholder="Password" />
          </Input>
          <Input fullWidth>
            <input type="password" placeholder="Confirm Password" />
          </Input>
          <Checkbox checked onChange={onCheckbox}>
            Agree to{' '}
          </Checkbox>
          <Button status="Success" type="button" shape="SemiRound" fullWidth>
            Register
          </Button>
        </form>
        <Socials />
        <p>Already have an account? </p>
      </Auth>
    </Layout>
  );
}
