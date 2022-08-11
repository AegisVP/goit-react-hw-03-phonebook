import React from 'react';
import { Box } from 'components/Common/Box.styled';
import { List, ListItem, Name, Number, DeleteButton } from 'components/ListOfContacts/ListOfContacts.styled';
import { PropTypes } from 'prop-types';

export const ListOfContacts = ({ onDeleteContact, contacts }) => {
  return (
    <List>
      {contacts.length > 0
        ? contacts.map(contact => (
            <ListItem key={contact.id}>
              <Box display="flex">
                <Name>{contact.name}</Name>
                <Number className="number">{contact.number}</Number>
              </Box>
              <Box>
                <DeleteButton
                  onClick={() => {
                    onDeleteContact(contact.id);
                  }}
                >
                  ❌
                </DeleteButton>
              </Box>
            </ListItem>
          ))
        : 'No matches found'}
    </List>
  );
};

ListOfContacts.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
