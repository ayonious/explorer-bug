import * as React from 'react';

import { Row } from './styles';
import CustomButton from '../CustomButton';

interface Props {
  handleLeft: any;
  handleRight: any;
  handleGo: any;
}

const JoyPad = (props: Props) => {
  return (
    <div>
      <Row>
        <CustomButton onClick={props.handleGo} title={'Go'} />
      </Row>
      <Row>
        <CustomButton onClick={props.handleLeft} title={'Left'} />
        <CustomButton onClick={props.handleRight} title={'Right'} />
      </Row>
    </div>
  );
};

export default JoyPad;
