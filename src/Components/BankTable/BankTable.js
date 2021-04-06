import React, { useEffect, useState } from "react";

// MATERIAL UI
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

function BankTable({
  columns,
  allBanks,
  rowsPerPageList,
  currentQuery,
  updateCachedData,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageList[0]);
  const [filteredBanks, setfilteredBanks] = useState(allBanks);

  useEffect(() => {
    let _fileredBanks;
    if (currentQuery !== "") {
      _fileredBanks = allBanks.filter(
        (bank) =>
          bank.bank_name
            .toString()
            .toLowerCase()
            .includes(currentQuery.toString().toLowerCase()) ||
          bank.ifsc
            .toString()
            .toLowerCase()
            .includes(currentQuery.toString().toLowerCase()) ||
          bank.branch
            .toString()
            .toLowerCase()
            .includes(currentQuery.toString().toLowerCase()) ||
          bank.district
            .toString()
            .toLowerCase()
            .includes(currentQuery.toString().toLowerCase()) ||
          bank.city
            .toString()
            .toLowerCase()
            .includes(currentQuery.toString().toLowerCase()) ||
          bank.state
            .toString()
            .toLowerCase()
            .includes(currentQuery.toString().toLowerCase())
      );
    } else {
      _fileredBanks = [...allBanks];
    }
    setfilteredBanks(_fileredBanks);
  }, [currentQuery, allBanks]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBanks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.ifsc}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={row.favourite}
                        onChange={(e) => updateCachedData(e, row.ifsc)}
                      />
                    </TableCell>
                    <TableCell>{row.bank_id}</TableCell>
                    <TableCell
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        (window.location.href = `/bank/${row.city}/${row.ifsc}`)
                      }
                    >
                      {row.bank_name}
                    </TableCell>
                    <TableCell>{row.ifsc}</TableCell>
                    <TableCell align="right">{row.branch}</TableCell>
                    <TableCell align="right">{row.district}</TableCell>
                    <TableCell align="right">{row.city}</TableCell>
                    <TableCell align="right">{row.state}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageList}
        component="div"
        count={filteredBanks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default BankTable;
