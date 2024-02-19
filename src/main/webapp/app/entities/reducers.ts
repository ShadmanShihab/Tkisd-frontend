import category from 'app/entities/category/category.reducer';
import courses from 'app/entities/courses/courses.reducer';
import orders from 'app/entities/orders/orders.reducer';
import instructor from 'app/entities/instructor/instructor.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  category,
  courses,
  orders,
  instructor,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
