import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Instructor from './instructor';
import InstructorDetail from './instructor-detail';
import InstructorUpdate from './instructor-update';
import InstructorDeleteDialog from './instructor-delete-dialog';

const InstructorRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Instructor />} />
    <Route path="new" element={<InstructorUpdate />} />
    <Route path=":id">
      <Route index element={<InstructorDetail />} />
      <Route path="edit" element={<InstructorUpdate />} />
      <Route path="delete" element={<InstructorDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default InstructorRoutes;
