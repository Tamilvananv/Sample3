$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": {
            "url": "data/objects_root_array.txt",
            "dataSrc": ""
        },
        "columns": [
            { "data": "name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "extn" },
            { "data": "start_date" },
            { "data": "salary" }
        ]
    } );
} );