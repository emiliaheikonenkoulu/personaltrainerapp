import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Traininglist() {
    const [customersTrainings, setCustomersTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchCustomersTrainings();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
      }
    
      const closeSnackBar = () => {
        setOpen(false);
      }

    const fetchCustomersTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setCustomersTrainings(data, data.customer))
      .catch(err => console.error(err))
  }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
          const deleteUrl = 'https://customerrest.herokuapp.com/api/trainings/' + id
          fetch(deleteUrl, { method: 'DELETE' })
          .then(response => {
            if(response.ok) {
              fetchCustomersTrainings();
              setMsg('Training deleted');
              openSnackBar();
            }
            else {
              alert('Something went wrong in deletion');
            }
          })
          .catch(err => console.error(err))
        }
      }

    const columns = [
        { field: 'date', sortable: true, filter: true, cellRenderer: (params) => {return moment.utc(params.value).format('MM/DD/YYYY HH:mm')}},
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        { field: 'customer.firstname', sortable: true, filter: true },
        { field: 'customer.lastname', sortable: true, filter: true },
        {
          headerName: '',
          field: 'id',
          width: 100,
          cellRendererFramework: params =>
              <IconButton color="secondary" onClick={() => deleteTraining(params.value)}>
                  <DeleteIcon />
              </IconButton> 
      }
    ]

    return(
        <div>
            <div className="ag-theme-material" style={{ height: 600, width: '100%', margin: 'auto' }}>
                <AgGridReact
                rowData={customersTrainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={8}
                floatingFilter={true}
                />
            </div>
                <Snackbar 
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                />
        </div>
    )
}

export default Traininglist;