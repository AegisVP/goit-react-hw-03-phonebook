import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Box } from 'components/Common/Box.styled';
import { Section } from 'components/Section/Section';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactFormFormik } from 'components/ContactFormFormik/ContactFormFormik';
import { ListOfContacts } from 'components/ListOfContacts/ListOfContacts';
import { FilterForm } from 'components/Filter/Filter';
import { FormikSelect } from 'components/FormikSelect/FormikSelect';

const LS_KEY = 'phonebook_hw_contacts';

export class App extends Component {
  state = {
    contacts: [],
    formikSelected: false,
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(LS_KEY);

    if (!savedContacts) return;
    const parsedContacts = JSON.parse(savedContacts);

    if (parsedContacts.length === 0) return;
    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length === this.state.contacts.length) return;

    localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
  }

  onFormikSelect = ({ target: { checked } }) => this.setState({ formikSelected: checked });

  onAddContact = ({ name, number }) => {
    const trimmedName = name.trim();
    const normalizedName = trimmedName.toLocaleLowerCase();

    if (this.state.contacts.some(({ name }) => name.toLocaleLowerCase() === normalizedName)) {
      window.alert('This name already exists in the list!');
      return;
    }

    const id = nanoid();
    this.setState(({ contacts }) => ({ contacts: [...contacts, { id, name: trimmedName, number }] }));
    return id;
  };

  onDeleteContact = id => {
    if (this.state.contacts.length === 1) this.clearFilterField();
    this.setState({ contacts: this.state.contacts.filter(contact => contact.id !== id) });
  };

  onFilterContacts = ({ currentTarget: { value } }) => {
    this.setState({ filter: value });
  };

  clearFilterField = () => {
    this.setState({ filter: '' });
  };

  render() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizedFilter));

    return (
      <Box display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column">
          <Section>
            <FormikSelect onFormikSelect={this.onFormikSelect} />
          </Section>
          <Section title="Contact info">{this.state.formikSelected ? <ContactFormFormik onSubmit={this.onAddContact} /> : <ContactForm onSubmit={this.onAddContact} />}</Section>
          {this.state.contacts.length > 0 && (
            <Section>
              <FilterForm filterValue={this.state.filter} onClear={this.clearFilterField} onChange={this.onFilterContacts} />
            </Section>
          )}
        </Box>

        {this.state.contacts.length > 0 && (
          <Box display="flex" flexDirection="column">
            <Section title="Contact list" height="100%">
              <ListOfContacts onEditContact={this.onEditContact} onDeleteContact={this.onDeleteContact} contacts={filteredContacts}></ListOfContacts>
            </Section>
          </Box>
        )}
      </Box>
    );
  }
}
