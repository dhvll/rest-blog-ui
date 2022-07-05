import React from "react";
import { Dimmer, Image, Loader, Segment } from "semantic-ui-react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>

      <Image src="https://semantic-ui.com/images/wireframe/short-paragraph.png" />
    </Segment>
  );
};
