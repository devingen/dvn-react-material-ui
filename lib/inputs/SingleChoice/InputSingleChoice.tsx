import { FormControlLabel, MenuItem, Radio, RadioGroup, Select } from '@material-ui/core';
import { BaseInputProps, SingleChoice } from 'dvn-react-core';
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
      <Select
        displayEmpty={true}
        style={{ minWidth: '120px' }}
        value={value || ''}
        onChange={(e: any) => this.props.onChange(e.target.value)}
        inputProps={{
          id: field.id,
          name: field.id,
        }}
      >

        {field.placeholder &&
        <MenuItem value={''} disabled={disabled}>
          <em>{field.placeholder}</em>
        </MenuItem>
        }

        {field.options.map((o: any) => {

          if (o.group && o.options) {
            // render grouped options
            return (
              <React.Fragment>
                {o.options.map((ogo: any) =>
                  <MenuItem key={ogo.value} value={ogo.value} disabled={disabled}>
                    {ogo.label}
                  </MenuItem>,
                )}
              </React.Fragment>
            );

          } else {
            // render simple options
            return (
              <MenuItem key={o.value} value={o.value} disabled={disabled}>
                {o.label}
              </MenuItem>
            );
          }

        })}

      </Select>
    );
  };

  private renderRadio = (field: SingleChoice, value?: string, disabled?: boolean) => (

    <RadioGroup
      aria-label={field.title}
      name={field.id}
      value={String(value)}
      onChange={(e: any) => this.props.onChange(e.target.value)}
    >
      {(field.options || []).map((o: SingleChoice.Option) =>
        <FormControlLabel
          key={o.value}
          value={String(o.value)}
          disabled={disabled}
          control={<Radio/>}
          label={o.label}
        />
      )}
    </RadioGroup>
  );
}
