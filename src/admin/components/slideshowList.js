import React from "react";
import {
  List,
  Edit,
  Filter,
  Create,
  Datagrid,
  TextField,
  ImageField,
  EditButton,
  ImageInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const SlideshowFilter = (props) => (
  <Filter {...props}>
    <TextInput source="description" />
  </Filter>
);

export const SlideshowList = (props) => {
  return (
    <List {...props} filters={<SlideshowFilter />}>
      <Datagrid>
        <TextField source="description" />
        <ImageField source="image" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const SlideshowTitle = ({ record }) => {
  return <span>{`${record.description}`}</span>;
};

export const SlideshowEdit = (props) => {
  return (
    <Edit undoable={false} title={<SlideshowTitle />} {...props}>
      <SimpleForm>
        <TextInput source="description" />
        <ImageInput source="image" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};

export const SlideshowCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="description" />
      <ImageInput source="image" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
