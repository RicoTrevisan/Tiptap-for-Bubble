function(instance, properties, context) {


    const rows = properties.rows;
    const columns = properties.columns;
    const with_header_row = properties.with_header_row;

    instance.data.editor.chain().focus().insertTable({ rows: rows, cols: columns, withHeaderRow: with_header_row }).run();


}