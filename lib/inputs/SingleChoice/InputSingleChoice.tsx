import { BaseInputProps, SingleChoice } from 'dvn-react-core';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import * as React from 'react';
import { colors, metrics } from '../../constants';

export interface IProps extends BaseInputProps<SingleChoice, any> {
}

export class InputSingleChoice extends React.Component<IProps> {

  public render() {
    const { disabled, field, errors, value } = this.props;
    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;

    let component;
    if (field.preview) {
      // find the label of the selected value and show
      const selectedOption = field.options.find(o => o.value === value);
      component = selectedOption ? selectedOption.label : '';
    } else if (field.inputType === 'select') {
      // render text area
      component = this.renderSelect(field, value, disabled);
    } else {
      // render the radio
      component = this.renderRadio(field, value, disabled);
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

  private renderSelect = (field: SingleChoice, value?: string, disabled?: boolean) => {

    return (
      <SelectField
        value={value}
        id={field.id}
        name={field.id}
        autoWidth={true}
        disabled={disabled}
        hintText={field.placeholder}
        onChange={(e, i, v) => this.props.onChange(v)}
      >
        {field.options.map((o: SingleChoice.Option) =>
          <MenuItem
            key={o.value}
            value={o.value}
            primaryText={o.label}
          />,
        )}
      </SelectField>
    );
  };

  private renderRadio = (field: SingleChoice, value?: string, disabled?: boolean) => (

    <RadioButtonGroup
      name={name}
      valueSelected={value}
      style={{ marginTop: '0.2rem' }}
    >
      {field.options.map(o =>
        <RadioButton
          key={o.value}
          value={o.value}
          label={o.label}
          disabled={disabled}
          onClick={() => this.props.onChange(o.value)}
        />,
      )}
    </RadioButtonGroup>
  );
}
