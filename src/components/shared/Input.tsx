import React, { Component, ChangeEvent } from "react";
import styled from "styled-components";

const ComponentWrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2px;
  box-sizing: border-box;
  padding: 1.5rem;
  background-color: white;
  border: 1px solid #a7adb8;
  border-radius: 0.3rem;

  &:focus-within {
    border: 1px solid #625ae8;
  }
`;

const HTMLInput = styled.input`
  flex-grow: 2;
  border: none;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const Label = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Required = styled.span`
  color: red;
`;

const ErrorMessage = styled.span`
  color: red;
  min-height: 27px;
  display: inline-block;
  margin-top: 0.25rem;
`;

interface Props {
  label: string;
  required?: boolean;
  type: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string | boolean;
}

export default class Input extends Component<Props> {
  render() {
    return (
      <ComponentWrapper>
        <Label>
          {this.props.label}{" "}
          {this.props.required ? <Required>*</Required> : null}
        </Label>
        <InputWrapper>
          <HTMLInput
            type={this.props.type}
            placeholder={this.props.placeholder}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </InputWrapper>
        <ErrorMessage>
          {this.props.error ? this.props.error : <>&nbsp;</>}
        </ErrorMessage>
      </ComponentWrapper>
    );
  }
}
