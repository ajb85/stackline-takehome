import { useMemo, useState, useCallback, ReactEventHandler } from "react";
import { TableProps } from "./types";
import { findDataAttribute } from "../../util/getDataAttribute";
import {
  RxCaretSort,
  RxCaretUp,
  RxCaretDown,
  RxCaretLeft,
  RxCaretRight,
} from "react-icons/rx";
import { combineClassNames } from "../../util/combineClassNames";

export function Table<RowData extends Record<string, string | number>>(
  props: TableProps<RowData>
) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RowData | null;
    direction: "ascending" | "descending";
  }>({
    key: null,
    direction: "ascending",
  });

  const [pagination, setPagination] = useState(props.pagination.initialState);
  const sortedRows = useMemo(() => {
    const key = sortConfig.key;
    if (!key) {
      return props.rows;
    }

    return [...props.rows].sort((a, b) => {
      let comparison = 0;

      const aValue = a[key];
      const bValue = b[key];
      if (typeof aValue !== typeof bValue) {
        comparison = 0;
      } else {
        comparison = aValue < bValue ? -1 : 1;
      }

      return sortConfig.direction === "descending"
        ? comparison * -1
        : comparison;
    });
  }, [props.rows, sortConfig]);

  const paginatedRows = useMemo(() => {
    const currentIndex = pagination.page * pagination.pageSize;
    return sortedRows.slice(currentIndex, currentIndex + pagination.pageSize);
  }, [sortedRows, pagination]);

  const toggleSort = (e: React.MouseEvent) => {
    const element = e.target as HTMLTableCellElement;
    let direction = "ascending" as typeof sortConfig.direction;

    const key = findDataAttribute(element, "field") as typeof sortConfig.key;
    if (key && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  const maxPages = Math.ceil(props.rows.length / pagination.pageSize);
  const pageForward = useCallback(
    () =>
      setPagination((state) => ({
        ...state,
        page: state.page === maxPages - 1 ? state.page : state.page + 1,
      })),
    [maxPages]
  );

  const pageBack = useCallback(
    () =>
      setPagination((state) => ({
        ...state,
        page: state.page === 0 ? state.page : state.page - 1,
      })),
    []
  );

  const setOptionSize: ReactEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      const { value } = e.target as HTMLSelectElement;
      setPagination({ page: 0, pageSize: Number(value) });
    },
    []
  );

  return (
    <div>
      <table className="w-full text-xs">
        <thead>
          <tr>
            {props.columns.map((column, i) => (
              <th
                className="py-4 first:pl-4 last:pr-4"
                key={column.field.toString()}
                data-field={column.sortable ? column.field : undefined}
                onClick={column.sortable ? toggleSort : undefined}
              >
                <div
                  className={combineClassNames(
                    "flex flex-wrap items-center font-normal text-slate-800 uppercase",
                    i === 0 ? "justify-start" : "justify-center"
                  )}
                >
                  {column.label}
                  {column.sortable && sortConfig.key !== column.field && (
                    <RxCaretSort className="ml-2 cursor-pointer" />
                  )}
                  {column.sortable &&
                    sortConfig.key === column.field &&
                    (sortConfig.direction === "ascending" ? (
                      <RxCaretUp className="ml-2 cursor-pointer" />
                    ) : (
                      <RxCaretDown className="ml-2 cursor-pointer" />
                    ))}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row) => (
            <tr
              key={row.weekEnding}
              className="border-t-[1px] border-x-0 last:border-b-[1px] border-slate-200 text-slate-400"
            >
              {props.columns.map(({ field, formatCell }, i) => (
                <td
                  key={field.toString()}
                  className={combineClassNames(
                    i === 0 ? "text-left" : "text-center",
                    "py-4 first:pl-4 last:pr-4"
                  )}
                >
                  {formatCell ? formatCell(row[field]) : row[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end my-4 px-4">
        {props.pagination.sizeOptions && (
          <div className="flex items-center mr-10">
            <label className="mr-2 text-slate-400">Items Per Page</label>
            <select className="p-2" onChange={setOptionSize}>
              {props.pagination.sizeOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex items-center">
          <RxCaretLeft className="cursor-pointer" onClick={pageBack} />
          <span>
            {pagination.page + 1} of {maxPages}
          </span>
          <RxCaretRight className="cursor-pointer" onClick={pageForward} />
        </div>
      </div>
    </div>
  );
}
