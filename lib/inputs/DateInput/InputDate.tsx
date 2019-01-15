import { BaseInputProps, DateInput } from 'dvn-react-core';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import * as moment from 'moment';
import * as React from 'react';
import { colors, metrics } from '../../constants';

export interface IProps extends BaseInputProps<DateInput, Date> {
}

export class InputDate extends React.Component<IProps> {

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

    if (field.preview) {
      return (
        <div>
          {(field.inputType === 'date' || field.inputType === 'dateTime') &&
          moment(value).format(field.dateFormat)
          }

          <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
            {error}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div style={{ display: 'flex' }}>
          {(field.inputType === 'date' || field.inputType === 'dateTime') &&
          <DatePicker
            autoOk={true}
            fullWidth={true}
            formatDate={(v: Date) => moment(v).format(field.dateFormat)}
            // minDate={minDate}
            // maxDate={maxDate}
            value={value}
            disabled={disabled}
            hintText={field.placeholder}
            // errorText={this.state.errors.date}
            onChange={(event, date) => this.onDateChange(date)}
          />
          }

          {(field.inputType === 'time' || field.inputType === 'dateTime') &&
          <TimePicker
            autoOk={true}
            format="24hr"
            fullWidth={true}
            // minDate={minDate}
            // maxDate={maxDate}
            value={value}
            disabled={disabled}
            hintText={field.inputType === 'dateTime' ? field.timeFormat : field.placeholder}
            // errorText={this.state.errors.date}
            onChange={(event, date) => this.onTimeChange(date)}
          />
          }
        </div>

        <div style={{ color: colors.error, minHeight: metrics.verticalSpaceBetweenInputs }}>
          {error}
        </div>
      </div>
    );
  }

  private onDateChange = (passedValue: Date) => {
    const { value } = this.props;
    const date = new Date(passedValue);

    if (value) {
      date.setHours(value.getHours());
      date.setMinutes(value.getMinutes());
      // date.setSeconds(value.getSeconds());
      date.setMilliseconds(value.getMilliseconds());
    }
    this.props.onChange(date);
  };

  private onTimeChange = (passedValue: Date) => {
    const { value } = this.props;
    const date = new Date(passedValue);

    if (value) {
      date.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
    }
    this.props.onChange(date);
  };
}
