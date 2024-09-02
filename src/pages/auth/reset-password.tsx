import React from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';

import Layout from 'Layouts';
import Auth from 'components/Auth';

export default function ResetPassword() {
  return (
    <Layout title="Change Password">
      <Auth title="Change Password" subTitle="Please set a new password">
        <form>
          <InputGroup fullWidth>
            <input type="password" placeholder="New Password" />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Confirm Password" />
          </InputGroup>
          <Button status="Success" type="button" shape="SemiRound" fullWidth>
            Change Password
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
