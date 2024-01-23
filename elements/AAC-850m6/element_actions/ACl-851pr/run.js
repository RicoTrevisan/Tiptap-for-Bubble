function(instance, properties, context) {

    if (!instance.data.editor_is_ready) {
        console.log("tried to run insert_table before editor was ready");
        return
    }


    const rows = properties.rows;
    const columns = properties.columns;
    const with_header_row = properties.with_header_row;

    instance.data.editor.chain().focus().insertTable({ rows: rows, cols: columns, withHeaderRow: with_header_row }).run();


}