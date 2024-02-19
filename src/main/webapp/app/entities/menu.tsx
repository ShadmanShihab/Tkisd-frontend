import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/category">
        <Translate contentKey="global.menu.entities.category" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/courses">
        <Translate contentKey="global.menu.entities.courses" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/orders">
        <Translate contentKey="global.menu.entities.orders" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/instructor">
        <Translate contentKey="global.menu.entities.instructor" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
