import { Checkbox, Chip, FormControlLabel, FormGroup, MenuItem, Select } from '@material-ui/core';
import { BaseInputProps, MultipleChoice } from 'dvn-react-core';
import * as React from 'react';
import { colors, metrics } from '../../constants';

export interface IProps extends BaseInputProps<MultipleChoice, any[]> {
}

export default class InputMultipleChoice extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  public onOptionClick(optionValue: string) {
    const selectedOptions = this.props.value || [];
    if (selectedOptions) {
      if (selectedOptions.indexOf(optionValue) === -1) {
        this.props.onChange([...selectedOptions, optionValue]);
      } else {
        selectedOptions.splice(selectedOptions.indexOf(optionValue), 1);
        this.props.onChange(selectedOptions);
      }
    }
  }

  public render() {
    const { disabled, field, errors, value } = this.props;
    const hasError = errors && errors.length > 0;
    const error = hasError ? errors![0] : undefined;

    let component;
    if (field.preview) {
      // find the label of the selected value and show
      component = this.renderPreview(field, value, disabled);
    } else if (field.inputType === 'select') {
      // render select
      component = this.renderSelect(field, value, disabled);

    } else if (field.inputType === 'tag-cloud') {
      // render tag cloud
      component = this.renderTagCloud(field, value, disabled);

    } else {
      // render checkbox as default
      component = this.renderCheckbox(field, value, disabled);
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

  private renderPreview = (field: MultipleChoice, value?: any[], disabled?: boolean) => {

    if (field.inputType === 'tag-cloud') {
      return (
        <div>
          {getSelectedOptions(field.options, value).map(o =>
            <Chip
              key={o.value}
              color={'secondary'}
              style={{ margin: '2px', color: 'white' }}
              label={o.label}
            />
          )}
        </div>
      );
    }

    return (
      <div>
        {getOptionLabels(field.options, value)}
      </div>
    );
  };

  private renderSelect = (field: MultipleChoice, value?: any[], disabled?: boolean) => {

    return (
      <Select
        multiple={true}
        displayEmpty={true}
        style={{ minWidth: '120px' }}
        value={(value && value.length > 0) ? value : ['']}
        onChange={this.onSelectChange}
        inputProps={{
          id: field.id,
          name: field.id,
        }}
      >

        {field.placeholder &&
        <MenuItem value={''} disabled={true}>
          {field.placeholder}
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

  private renderTagCloud = (field: MultipleChoice, value?: any[], disabled?: boolean) => {

    return (
      <div>
        {(field.options || []).map((o: any) =>
          <Chip
            key={o.value}
            color={value && value.indexOf(o.value) > -1 ? 'secondary' : undefined}
            onClick={() => this.onOptionClick(o.value)}
            style={{ margin: '2px', color: value && value.indexOf(o.value) > -1 ? 'white' : 'inherit' }}
            label={o.label}
            clickable={true}
            variant={value && value.indexOf(o.value) > -1 ? 'default' : 'outlined'}
          />
        )}
      </div>
    );
  };

  private renderCheckbox = (field: MultipleChoice, value?: any[], disabled?: boolean) => {

    return (
      <FormGroup>

        {field.placeholder &&
        <MenuItem value={''} disabled={true}>
          <em>{field.placeholder}</em>
        </MenuItem>
        }

        {field.options.map((o: MultipleChoice.Option) => {
          return (
            <FormControlLabel
              key={o.value}
              disabled={disabled}
              control={
                <Checkbox
                  checked={value && value.indexOf(o.value) > -1}
                  onChange={() => this.onOptionClick(o.value)}
                  value={o.value}
                />
              }
              label={o.label}
            />
          );
        })}
      </FormGroup>
    );
  };

  private onSelectChange = (event: any) => {

    const value = event.target.value;
    if (value && value[0] === '') {
      value.splice(0, 1);
    }

    this.props.onChange(value);
  };
}

/**
 * Returns the options that are in the value.
 * @param options
 * @param value
 */
export function getSelectedOptions(options: MultipleChoice.Option[], value?: any[]): MultipleChoice.Option[] {

  if (!value) {
    return [];
  }

  return options.filter(o => value.indexOf(o.value) > -1);
}

/**
 * Returns the labels of the given options that are joined with comma.
 * @param options
 * @param value
 */
export function getOptionLabels(options: MultipleChoice.Option[], value?: any[]): string {

  if (!value) {
    return '';
  }

  return getSelectedOptions(options, value).map(o => o.label).join(', ');
}
