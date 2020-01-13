import * as React from 'react';
import { Row } from '../styledcomponents/styles';
import { CustomButton } from './Utils';

interface Props {
  handleLeft: any;
  handleRight: any;
  handleGo: any;
}

interface State {}

export default class JoyPad extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <Row>
          <CustomButton onClick={this.props.handleGo} title={'Go'} />
        </Row>
        <Row>
          <CustomButton onClick={this.props.handleLeft} title={'Left'} />
          <CustomButton onClick={this.props.handleRight} title={'Right'} />
        </Row>
      </div>
    );
  }
}
