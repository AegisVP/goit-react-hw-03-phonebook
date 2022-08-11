import React from 'react';
import { PropTypes } from 'prop-types';

export const FormikSelect = ({ formikSelected, onFormikSelect }) => (
  <label>
    Show Formik: &nbsp;
    <input type="checkbox" name="formik" checked={formikSelected} onChange={onFormikSelect} />
  </label>
);

FormikSelect.propTypes = { formikSelected: PropTypes.bool, onFormikSelect: PropTypes.func };
