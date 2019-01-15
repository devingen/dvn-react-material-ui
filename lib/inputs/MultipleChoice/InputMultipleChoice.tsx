import { BaseInputProps, MultipleChoice } from 'dvn-react-core';
import Checkbox from 'material-ui/Checkbox';
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
      // component = this.renderSelect(field, value, disabled);
      component = this.renderCheckbox(field, value, disabled);

    } else if (field.inputType === 'tag-cloud') {
      // render tag cloud
      // component = this.renderTagCloud(field, value, disabled);
      component = this.renderCheckbox(field, value, disabled);

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
            'Chip'
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

  // private renderSelect = (field: MultipleChoice, value?: any[], disabled?: boolean) => {
  //
  //   return (
  //     <SelectField
  //       value={value}
  //       id={field.id}
  //       name={field.id}
  //       multiple={true}
  //       autoWidth={true}
  //       onChange={(e, i, v) => this.onSelectChange(v)}
  //       hintText={field.placeholder}
  //     >
  //       {field.options.map((o: any) => {
  //
  //         if (o.group && o.options) {
  //           // render grouped options
  //           return (o.options.map((ogo: any) =>
  //             <MenuItem key={ogo.value} value={ogo.value} disabled={disabled}>
  //               {ogo.label}
  //             </MenuItem>,
  //           ));
  //
  //         } else {
  //           // render simple options
  //           return (
  //             <MenuItem key={o.value} value={o.value} disabled={disabled}>
  //               {o.label}
  //             </MenuItem>
  //           );
  //         }
  //
  //       })}
  //
  //     </SelectField>
  //   );
  // };

  // private renderTagCloud = (field: MultipleChoice, value?: any[], disabled?: boolean) => {
  //
  //   return (
  //     <div>
  //       {(field.options || []).map((o: any) =>
  //         'Chip'
  //       )}
  //     </div>
  //   );
  // };

  private renderCheckbox = (field: MultipleChoice, value?: any[], disabled?: boolean) => {

    return (
      <div>
        {field.options.map((o: MultipleChoice.Option) => {
          return (
            <Checkbox
              key={o.value}
              checked={value && value.indexOf(o.value) > -1}
              label={o.label}
              onClick={() => this.onOptionClick(o.value)}
            />
          );
        })}
      </div>
    );
  };

  // private onSelectChange = (value: any) => {
  //   // tslint:disable
  //   console.log('event.target.value', value);
  //
  //   if (value && value[0] === '') {
  //     value.splice(0, 1);
  //   }
  //
  //   this.props.onChange(value);
  // };
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
