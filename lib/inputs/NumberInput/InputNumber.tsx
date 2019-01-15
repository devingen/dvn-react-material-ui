import { BaseInputProps, NumberInput } from 'dvn-react-core';
import TextField from 'material-ui/TextField';
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
      type="number"
      fullWidth={true}
      value={value}
      hintText={field.placeholder}
      disabled={disabled}
      min={field.min}
      max={field.max}
      step={field.step}
      // errorText={this.state.errors.email}
      onChange={(e: any) => this.props.onChange(e.target.value)}
    />
  );
}
