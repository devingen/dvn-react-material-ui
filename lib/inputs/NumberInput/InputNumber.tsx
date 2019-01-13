import { TextField } from '@material-ui/core';
import { BaseInputProps, NumberInput } from 'dvn-react-core';
import * as React from 'react';
import { colors, metrics } from '../../constants';

export interface IProps extends BaseInputProps<NumberInput, number> {
}

export class InputNumber extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  public render() {
    const { disabled, field, errors, value } = this.props;
    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;

    let component;
    if (field.preview) {
      // show raw value
      component = value;
    } else {
      component = this.renderInput(field, value, disabled, errors);
    }

    return (
      <div>
        {component}

        <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }

  private renderInput = (field: NumberInput, value?: number, disabled?: boolean, errors?: any[]) => (
    <TextField
      id={field.id}
      value={value}
      fullWidth={true}
      label={!field.description && field.title}
      disabled={disabled}
      type="number"
      inputProps={{ min: field.min, max: field.max, step: field.step }}
      placeholder={field.placeholder}
      error={errors ? errors[0] : ''}
      onChange={(e: any) => this.props.onChange(e.target.value)}
    />
  );
}
