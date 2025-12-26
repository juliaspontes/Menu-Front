import { FC } from "react";
import Skeleton from "react-loading-skeleton";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

const SkeletonTable: FC<SkeletonTableProps> = ({ rows = 5, columns }) => {
  const renderColumns = () => {
    const cols = [];
    if (!!columns) {
      for (let i = 0; i <= (columns - 1 || 0); i++) {
        cols.push(
          <td key={i}>
            <Skeleton width={100} />
          </td>
        );
      }
    }
    return cols;
  };

  const render = () => {
    const list = [];
    for (let i = 0; i <= rows - 1; i++) {
      list.push(
        <tr key={i}>
          {!columns ? (
            <>
              <td>
                <Skeleton width={200} />
              </td>
              <td>
                <Skeleton width={100} />
              </td>
              <td>
                <Skeleton width={100} />
              </td>
              <td>
                <Skeleton width={150} />
              </td>
              <td>
                <Skeleton width={100} />
              </td>
            </>
          ) : (
            <>{renderColumns()}</>
          )}
        </tr>
      );
    }
    return list;
  };
  return (
    <div className="SkeletonTable" data-testid="SkeletonTable">
      <div className="table-responsive">
        <table className="table">
          <tbody>{render()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonTable;
