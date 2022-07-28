import * as cn from 'classnames';
import { generateField } from 'dvn-react-core/dist/fields/FieldGenerator';
import Form , {
  defaultProps,
  equals,
  FormProps,
  generateState,
  getFirstError,
  handleExtraButtonClick,
  SubmitCallback,
} from 'dvn-react-core/dist/form/Form';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import { colors } from '../constants';
import '../inputs/DateInput';
import '../inputs/MultipleChoice';
import '../inputs/NumberInput';
import '../inputs/RatingStars';
import '../inputs/SectionHeader';
import '../inputs/SingleChoice';
import '../inputs/TextInput';
import './Form.css';

injectTapEventPlugin();

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
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
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
                      <div dangerouslySetInnerHTML={{ __html: field.description }} />
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
                    <div dangerouslySetInnerHTML={{ __html: field.description }} />
                  </div>
                  }

                  {input}
                </div>
              </div>
            );
          })}

          <div className="dvn-form-footer">
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
              primary={true}
              type="submit"
            />
            }
          </div>
        </form>
      </MuiThemeProvider>
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
