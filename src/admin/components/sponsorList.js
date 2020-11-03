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
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const SponsorFilter = (props) => (
  <Filter {...props}>
    <TextInput source="name" />
  </Filter>
);

export const SponsorList = (props) => {
  return (
    <List {...props} filters={<SponsorFilter />}>
      <Datagrid>
        <TextField source="name" />
        <ImageField source="logo" />
        <TextField source="priority" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const SponsorTitle = ({ record }) => {
  return <span>{`${record.name}`}</span>;
};

export const SponsorEdit = (props) => {
  return (
    <Edit undoable={false} title={<SponsorTitle />} {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <ImageInput source="logo" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <SelectInput
          title="Sponsor Priority"
          source="priority"
          choices={[
            { id: "special", name: "Special" },
            { id: "prize", name: "Prize" },
            { id: "media", name: "Media" },
            { id: "in-kind", name: "In-Kind" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};

export const SponsorCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="name" />
      <ImageInput source="logo" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <SelectInput
        title="Sponsor Priority"
        source="priority"
        choices={[
          { id: "special", name: "Special" },
          { id: "prize", name: "Prize" },
          { id: "media", name: "Media" },
          { id: "in-kind", name: "In-Kind" },
        ]}
      />
    </SimpleForm>
  </Create>
);
