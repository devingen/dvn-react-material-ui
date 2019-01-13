import { Star } from '@material-ui/icons';
import { BaseInputProps } from 'dvn-react-core';
import * as React from 'react';
import { colors, metrics } from '../../constants';

import { RatingStars } from './index';

const starStyle = {
  height: '2rem',
  width: '2rem',
};

const gold = '#fadb14';
const grey = '#ccc';

export interface IProps extends BaseInputProps<RatingStars, number> {
}

export class InputRatingStars extends React.Component<IProps> {

  public render() {
    const { disabled, field, errors, onChange, value = 0 } = this.props;
    const { starCount } = field;

    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;

    const stars = [];
    for (let i = 0; i < starCount; i += 1) {

      const onClick = () => onChange((i + 1) / starCount);

      if (i < (value * starCount)) {
        stars.push(<Star
          key={i}
          style={{ ...starStyle, color: gold, opacity: disabled ? 0.7 : 1, cursor: disabled ? 'inherit' : 'pointer' }}
          onClick={!disabled ? onClick : undefined}
        />);
      } else if (!disabled) {
        stars.push(<Star
          key={i}
          style={{ ...starStyle, color: grey, opacity: disabled ? 0.7 : 1, cursor: disabled ? 'inherit' : 'pointer' }}
          onClick={!disabled ? onClick : undefined}
        />);
      }
    }

    return (
      <div style={{}}>
        {stars}

        <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }
}
