import React from "react";
import {
  List,
  Edit,
  Filter,
  Create,
  Datagrid,
  TextField,
  UrlField,
  ImageField,
  EditButton,
  ImageInput,
  SimpleForm,
  TextInput,
  useGetOne,
  Loading,
} from "react-admin";

const CharityFilter = (props) => (
  <Filter {...props}>
    <TextInput source="name" />
    <TextInput label="Administator" source="charityAdmin" />
  </Filter>
);

export const AdminCharityList = (props) => {
  return (
    <List {...props} filters={<CharityFilter />} bulkActionButtons={false}>
      <Datagrid>
        <TextField source="name" />
        <ImageField source="banner" />
        <UrlField source="website" />
        <TextField source="body" />
        <UrlField label="Checkout Link" source="checkout" />
        <TextField label="Administator" source="charityAdmin" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const CharityTitle = ({ record }) => {
  return <span>{`${record.name}`}</span>;
};

export const CharityEdit = (props) => {
  const { data, loading, error } = useGetOne("charities", props.id);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>ERROR</p>;
  }

  let admin = data.charityAdmin;
  return (
    <Edit undoable={false} title={<CharityTitle />} {...props}>
      {props.permissions.role === "admin" ||
      props.permissions.role === "master" ||
      props.permissions.name === admin ? (
        <SimpleForm>
          <TextInput source="name" />
          <ImageInput source="banner" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
          <TextInput source="website" />
          <TextInput multiline source="body" />
          <TextInput label="checkout link" source="checkout" />
          <TextInput label="Administrator" source="charityAdmin" />
        </SimpleForm>
      ) : (
        <div>
          <h1>You do not have permission to edit this record.</h1>
          <h1>
            You may only edit charity pages for which you are the administrator.
          </h1>
        </div>
      )}
    </Edit>
  );
};

export const CharityCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="name" />
      <ImageInput source="banner" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="website" />
      <TextInput multiline source="body" />
      <TextInput label="checkout link" source="checkout" />
      <TextInput label="Administrator" source="charityAdmin" />
    </SimpleForm>
  </Create>
);
