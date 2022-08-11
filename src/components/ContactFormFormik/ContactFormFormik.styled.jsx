import styled from 'styled-components';
import { Field, ErrorMessage } from 'formik';

export const Label = styled.label`
  background-color: rgba(125, 255, 125, 0.1);
  padding: ${p => p.theme.mp(1)};
  font-weight: bold;
  border: none;
`;

export const InputField = styled(Field)`
  padding: ${p => p.theme.mp(1)};
  border: none;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  outline: none;
`;

export const ErrorText = styled(ErrorMessage)`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: rgb(255, 170, 170);
  text-align: center;
`;

export const SubmitButton = styled.button`
  display: block;
  padding: ${p => p.theme.mp(2, 1)};
  margin: ${p => p.theme.mp(3, 'auto', 2)};
  width: 80%;
  font-weight: bold;

  border: none;
  border-radius: ${p => p.theme.radii.normal};
  background-color: ${p => p.theme.colors.buttonColor};
`;
