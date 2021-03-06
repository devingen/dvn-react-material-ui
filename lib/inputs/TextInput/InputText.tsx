import { BaseInputProps, TextInput } from 'dvn-react-core';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { colors, metrics } from '../../constants';

export interface IProps extends BaseInputProps<TextInput, string> {
}

export class InputText extends React.Component<IProps> {

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
    } else if (field.linesMax > 1 && field.linesMax >= field.lines) {
      // render text area
      component = this.renderTextArea(field, value, disabled);
    } else {
      // render single line text input
      component = this.renderTextInput(field, value, disabled);
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

  private renderTextInput = (field: TextInput, value?: string, disabled?: boolean) => (
    <TextField
      id={field.id}
      type={field.inputType}
      fullWidth={true}
      value={value}
      hintText={field.placeholder}
      disabled={disabled}
      // errorText={this.state.errors.email}
      onChange={(e: any) => this.props.onChange(e.target.value)}
    />
  );

  private renderTextArea = (field: TextInput, value?: string, disabled?: boolean) => (
    <TextField
      id={field.id}
      type={field.inputType}
      fullWidth={true}
      value={value}
      hintText={field.placeholder}
      disabled={disabled}
      // errorText={this.state.errors.email}
      onChange={(e: any) => this.props.onChange(e.target.value)}
      multiLine={true}
      rows={field.lines}
      rowsMax={field.linesMax}
    />
  );
}
