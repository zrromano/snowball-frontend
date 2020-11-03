import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title } from "react-admin";

export default () => (
  <Card>
    <Title title="Not Found" />
    <CardContent>
      <h1>404: Page not found</h1>
      <p>
        Either you typed a URL wrong or you followed a bad link. Oops ¯\_(ツ)_/¯
      </p>
    </CardContent>
  </Card>
);
