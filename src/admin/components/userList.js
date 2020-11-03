import React from "react";
import {
  List,
  Edit,
  Create,
  Datagrid,
  Filter,
  TextInput,
  PasswordInput,
  BooleanInput,
  SelectInput,
  EmailField,
  TextField,
  BooleanField,
  SimpleForm,
  EditButton,
} from "react-admin";

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput source="name" />
    <SelectInput
      title="Authorization Level"
      source="authLevel"
      choices={[
        { id: "master", name: "Master" },
        { id: "admin", name: "Admin" },
        { id: "user", name: "User" },
      ]}
    />
  </Filter>
);

export const UserList = (props) => {
  return (
    <List {...props} filters={<UserFilter />} bulkActionButtons={false}>
      <Datagrid>
        <TextField source="name" />
        <TextField source="phone" />
        <EmailField source="email" />
        <TextField label="Authorization Level" source="authLevel" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const UserTitle = ({ record }) => {
  return <span>{`${record.name}`}</span>;
};

export const UserEdit = (props) => (
  <Edit undoable={false} title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="phone" />
      <TextInput source="email" type="email" />
      <PasswordInput source="password" />
      {props.permissions.role === "master" && (
        <SelectInput
          title="Authorization Level"
          source="authLevel"
          choices={[
            { id: "master", name: "Master" },
            { id: "admin", name: "Admin" },
            { id: "user", name: "User" },
          ]}
        />
      )}
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="name" />
      <TextInput source="phone" />
      <TextInput source="email" type="email" />
      <PasswordInput source="password" />
    </SimpleForm>
  </Create>
);

export default UserList;
