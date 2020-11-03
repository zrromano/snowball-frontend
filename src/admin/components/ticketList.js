import React from "react";
import {
  List,
  Edit,
  Create,
  Filter,
  Datagrid,
  TextInput,
  NumberInput,
  NumberField,
  TextField,
  SimpleForm,
  EditButton,
} from "react-admin";

const TicketFilter = (props) => (
  <Filter {...props}>
    <TextInput source="holderName" />
    <TextInput label="Purchased for" source="charity" />
    <TextInput source="seller" />
  </Filter>
);

export const TicketList = (props) => {
  return (
    <List filters={<TicketFilter />} {...props}>
      <Datagrid>
        <TextField source="holderName" />
        <TextField source="holderNumber" />
        <TextField label="Purchased for" source="charity" />
        <TextField label="Sold by" source="seller" />
        <NumberField label="Winning numbers" source="pair.firstNumber" />
        <NumberField label="" source="pair.secondNumber" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const TicketTitle = ({ record }) => {
  return <span>Ticket #{`${record._id}`}</span>;
};

export const TicketEdit = (props) => (
  <Edit undoable={false} title={<TicketTitle />} {...props}>
    <SimpleForm>
      <TextInput source="holderName" />
      <TextInput source="holderNumber" />
      <TextInput source="holderEmail" />
      <TextInput label="Purchased For" source="charity" />
      <TextInput source="seller" />
    </SimpleForm>
  </Edit>
);

export const TicketCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="holderName" />
      <TextInput source="holderNumber" />
      <TextInput source="holderEmail" />
      <TextInput label="Purchased For" source="charity" />
      <TextInput source="seller" />
      <NumberInput source="quantity" />
    </SimpleForm>
  </Create>
);
