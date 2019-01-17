import * as cn from 'classnames';
import {
  defaultProps,
  equals,
  Form,
  FormProps,
  generateField,
  generateState,
  getFirstError,
  handleExtraButtonClick,
  SubmitCallback
} from 'dvn-react-core';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as React from 'react';

import { colors } from '../constants';
import '../inputs/DateInput';
import '../inputs/MultipleChoice';
import '../inputs/NumberInput';
import '../inputs/RatingStars';
import '../inputs/SectionHeader';
import '../inputs/SingleChoice';
import '../inputs/TextInput';

export class MaterialForm extends Form {

  public static defaultProps: Partial<FormProps> = defaultProps;

  public constructor(props: FormProps) {
    super(props);
    this.state = generateState(props);
  }

  public componentDidUpdate(previousProps: FormProps) {

    if (equals(this.props, previousProps)) {
      // abort if props are not changed
      return;
    }
    this.setState(generateState(this.props));
  }

  public render() {
    const {
      fields, layout, loading, extraButtons, showFieldOrder, submitButtonLabel,
    } = this.props;
    const { errors, values, visibilities } = this.state;

    // retrieve the first error and show at the bottom
    const error = getFirstError(errors);

    // order is used to show the field order numbers if props.showFieldOrder is true
    let order = 0;

    return (
      <form
        className={cn({
          'dvn-form': true,
          [layout as string]: true,
        })}
        onSubmit={(e: any) => super.onFormSubmit(e)}
      >
        {fields.map(field => {

          if (!visibilities[field.id]) {
            // don't render the field if it is not visible
            return null;
          }

          const input = generateField(field, values[field.id], errors[field.id], loading!, this.onFieldChange, this.onFieldBlur);
          if (field.title && field.title !== '') {
            order += 1;
          }

          return (

            <div
              id={field.id}
              key={field.id}
              className={cn({
                'dvn-form-field': true,
                'dvn-row': layout === 'horizontal',
                required: field.required,
              })}>
              <div className={cn({
                'dvn-col-sm-6': layout === 'horizontal',
                'dvn-empty-label': !field.title,
                'dvn-form-label': true,
              })}>

                <label htmlFor={field.id}>
                  <b>
                    {showFieldOrder && `${order}. `}
                    {field.title}
                  </b>

                  {(layout === 'vertical' && field.description && field.description !== '') &&
                  <div className="description">
                    {field.description}
                  </div>
                  }
                </label>
              </div>

              <div className={cn({
                'dvn-col-sm-18': layout === 'horizontal',
                'dvn-input-container': true,
              })}>

                {(layout === 'horizontal' && field.description && field.description !== '') &&
                <div className="dvn-form-label-right">
                  {field.description}
                </div>
                }

                {input}
              </div>
            </div>
          );
        })}

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {error && <span style={{ color: colors.error, marginRight: '1rem' }}>{error}</span>}

          {extraButtons!.map(button =>
            <FlatButton
              secondary={true}
              key={button.label}
              label={button.label}
              disabled={button.loading}
              onClick={() => this.onExtraButtonClick(button.onClick)}
              style={{ marginRight: '1rem' }}
            />
          )}

          {submitButtonLabel &&
          <RaisedButton
            label={submitButtonLabel}
            disabled={loading}
            secondary={true}
            type="submit"
          />
          }
        </div>
      </form>
    );
  }

  private onExtraButtonClick(callback: SubmitCallback) {

    const state = handleExtraButtonClick(this.props, this.state, callback, true);

    if (state) {
      this.setState(state);
    }
  }
}

export default MaterialForm;
