import React, { FC } from 'react';
import './Pagination.css';

interface PaginationProps {}

const Pagination: FC<PaginationProps> = () => (
  <div className="Pagination" data-testid="Pagination">
    Pagination Component
  </div>
);

export default Pagination;
