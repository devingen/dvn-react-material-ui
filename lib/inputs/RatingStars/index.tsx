import { BaseField, InputGenerator, registerField } from 'dvn-react-core';
import * as React from 'react';

import { InputRatingStars } from './InputRatingStars';

export class RatingStars extends BaseField {

  public static type = 'ratingStars';

  public type = 'ratingStars';

  public starCount: number;

  // Renders only the value, not the input field.
  public preview?: boolean;

  constructor(id: string, title: string, description?: string, starCount: number = 5) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.starCount = starCount;
  }

  public showPreview(): RatingStars {
    this.preview = true;
    return this;
  }
}

const render: InputGenerator = (
  field: BaseField,
  value: any,
  errors: any[],
  disabled: boolean,
  onFieldChange: (field: BaseField, value: any) => void,
  onFieldBlur: (field: BaseField) => void,
) => <InputRatingStars
  disabled={disabled}
  errors={errors}
  field={field as RatingStars}
  onChange={(v: any) => onFieldChange(field, v)}
  onBlur={() => onFieldBlur(field)}
  value={value}
/>;

// register 'ratingStars' key for json form generations
registerField('ratingStars', render);
